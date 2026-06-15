import uuid
from typing import List

from django.db import IntegrityError
from django.shortcuts import get_object_or_404
from ninja_extra import api_controller, route
from ninja_jwt.authentication import JWTAuth
from ninja.errors import HttpError

from .models import Customer, Supplier
from .schemas import CustomerIn, CustomerOut, CustomerUpdate, SupplierIn, SupplierOut, SupplierUpdate


@api_controller("/contacts/customers", auth=JWTAuth(), tags=["Inventory - Customers"])
class CustomerController:

    @route.get("", response=List[CustomerOut])
    def list_customers(self, request):
        return list(Customer.objects.filter(company=request.user.company))

    @route.post("", response={201: CustomerOut})
    def create_customer(self, request, payload: CustomerIn):
        try:
            customer = Customer.objects.create(
                company=request.user.company,
                **payload.dict(),
            )
        except IntegrityError:
            raise HttpError(409, f"Ya existe un cliente con la identificación '{payload.identification}'.")
        return 201, customer

    @route.get("/{customer_id}", response=CustomerOut)
    def get_customer(self, request, customer_id: uuid.UUID):
        return get_object_or_404(Customer, id=customer_id, company=request.user.company)

    @route.patch("/{customer_id}", response=CustomerOut)
    def update_customer(self, request, customer_id: uuid.UUID, payload: CustomerUpdate):
        customer = get_object_or_404(Customer, id=customer_id, company=request.user.company)

        data = payload.dict(exclude_unset=True)
        if not data:
            raise HttpError(400, "No se enviaron campos para actualizar.")

        for field, value in data.items():
            setattr(customer, field, value)

        try:
            customer.save()
        except IntegrityError:
            raise HttpError(409, f"Ya existe un cliente con la identificación '{payload.identification}'.")

        return customer

    @route.delete("/{customer_id}", response={204: None})
    def delete_customer(self, request, customer_id: uuid.UUID):
        customer = get_object_or_404(Customer, id=customer_id, company=request.user.company)
        customer.delete()
        return 204, None
    
@api_controller("/contacts", auth=JWTAuth(), tags=["Inventory - Suppliers"])
class SupplierController:
    
    @route.get("/suppliers", response=List[SupplierOut])
    def list_suppliers(self, request):
        return list(Supplier.objects.filter(company=request.user.company))

    @route.post("/suppliers", response={201: SupplierOut})
    def create_supplier(self, request, payload: SupplierIn):
        supplier = Supplier.objects.create(
            company=request.user.company,
            **payload.dict(),
        )
        return 201, supplier

    @route.get("/suppliers/{supplier_id}", response=SupplierOut)
    def get_supplier(self, request, supplier_id: uuid.UUID):
        return get_object_or_404(Supplier, id=supplier_id, company=request.user.company)

    @route.patch("/suppliers/{supplier_id}", response=SupplierOut)
    def update_supplier(self, request, supplier_id: uuid.UUID, payload: SupplierUpdate):
        supplier = get_object_or_404(Supplier, id=supplier_id, company=request.user.company)

        data = payload.dict(exclude_unset=True)
        if not data:
            raise HttpError(400, "No se enviaron campos para actualizar.")

        for field, value in data.items():
            setattr(supplier, field, value)

        supplier.save()
        return supplier

    @route.delete("/suppliers/{supplier_id}", response={204: None})
    def delete_supplier(self, request, supplier_id: uuid.UUID):
        supplier = get_object_or_404(Supplier, id=supplier_id, company=request.user.company)
        supplier.delete()
        return 204, None
