from decimal import Decimal

from django.db import transaction
from django.shortcuts import get_object_or_404

from ninja.errors import HttpError

from apps.customers.models import Customer
from apps.inventory.models import Product, Supplier

from .models import Transaction, TransactionDetail


class TransactionService:

    @classmethod
    def list(cls, company):
        return (
            Transaction.objects
            .filter(company=company)
            .prefetch_related("details")
            .order_by("-created_at")
        )

    @classmethod
    def get(cls, company, transaction_id):
        return get_object_or_404(
            Transaction.objects.prefetch_related("details"),
            id=transaction_id,
            company=company,
        )

    @classmethod
    @transaction.atomic
    def create(cls, company, user, payload):

        customer = cls._get_customer(company, payload.customer_id)
        supplier = cls._get_supplier(company, payload.supplier_id)

        cls._validate_transaction(payload.type, customer, supplier)

        trx = Transaction.objects.create(
            company=company,
            user=user,
            customer=customer,
            supplier=supplier,
            type=payload.type,
            total=Decimal("0.00"),
        )

        total = Decimal("0.00")

        for item in payload.details:
            product = cls._get_product(company, item.product_id)

            subtotal = cls._create_detail(
                trx=trx,
                product=product,
                quantity=item.quantity,
                transaction_type=payload.type,
            )

            total += subtotal

        trx.total = total
        trx.save()

        return trx

    @classmethod
    @transaction.atomic
    def delete(cls, company, transaction_id):

        trx = cls.get(company, transaction_id)

        for detail in trx.details.all():

            product = detail.product

            if trx.type == Transaction.OUT:
                product.stock += detail.quantity

            else:
                if product.stock < detail.quantity:
                    raise HttpError(400, f"No se puede eliminar la transacción porque {product.name} quedaría con stock negativo.")

                product.stock -= detail.quantity

            product.save()

        trx.delete()

    @classmethod
    def _create_detail(cls, trx, product, quantity, transaction_type):

        if quantity <= 0:
            raise HttpError(400, f"Cantidad inválida para {product.name}")

        if transaction_type == Transaction.OUT:

            if product.stock < quantity:
                raise HttpError(400, f"Stock insuficiente para {product.name}")

            product.stock -= quantity
            unit_price = product.sale_price

        else:
            product.stock += quantity
            unit_price = product.cost_price

        product.save()

        subtotal = unit_price * quantity

        TransactionDetail.objects.create(
            transaction=trx,
            product=product,
            product_name=product.name,
            quantity=quantity,
            unit_price=unit_price,
            subtotal=subtotal,
        )

        return subtotal

    @classmethod
    def _validate_transaction(cls, transaction_type, customer, supplier):

        if transaction_type == Transaction.OUT and not customer:
            raise HttpError(
                400,
                "Las ventas requieren un cliente."
            )

        if transaction_type == Transaction.IN and not supplier:
            raise HttpError(
                400,
                "Las compras requieren un proveedor."
            )

    @classmethod
    def _get_customer(cls, company, customer_id):

        if not customer_id:
            return None

        return get_object_or_404(
            Customer,
            id=customer_id,
            company=company,
        )

    @classmethod
    def _get_supplier(cls, company, supplier_id):

        if not supplier_id:
            return None

        return get_object_or_404(
            Supplier,
            id=supplier_id,
            company=company,
        )

    @classmethod
    def _get_product(cls, company, product_id):
        return get_object_or_404(
            Product,
            id=product_id,
            company=company,
        )