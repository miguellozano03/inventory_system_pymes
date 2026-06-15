import uuid
from typing import List

from django.db import IntegrityError
from django.shortcuts import get_object_or_404
from ninja_extra import api_controller, route
from ninja_jwt.authentication import JWTAuth
from ninja.errors import HttpError

from .models import Category, Supplier, Product
from .schemas import (
    CategoryIn, CategoryOut, CategoryUpdate,
    SupplierIn, SupplierOut, SupplierUpdate,
    ProductIn, ProductOut, ProductUpdate,
)

@api_controller("/inventory", auth=JWTAuth(), tags=["Inventory - Categories"])
class CategoryController:
    
    @route.get("/categories", response=List[CategoryOut])
    def list_categories(self, request):
        return list(Category.objects.filter(company=request.user.company))

    @route.post("/categories", response={201: CategoryOut})
    def create_category(self, request, payload: CategoryIn):
        try:
            category = Category.objects.create(
                company=request.user.company,
                **payload.dict(),
            )
        except IntegrityError:
            raise HttpError(409, f"Ya existe una categoría llamada '{payload.name}' en tu empresa.")
        return 201, category

    @route.get("/categories/{category_id}", response=CategoryOut)
    def get_category(self, request, category_id: uuid.UUID):
        return get_object_or_404(Category, id=category_id, company=request.user.company)

    @route.patch("/categories/{category_id}", response=CategoryOut)
    def update_category(self, request, category_id: uuid.UUID, payload: CategoryUpdate):
        category = get_object_or_404(Category, id=category_id, company=request.user.company)

        data = payload.dict(exclude_unset=True)
        if not data:
            raise HttpError(400, "No se enviaron campos para actualizar.")

        for field, value in data.items():
            setattr(category, field, value)

        try:
            category.save()
        except IntegrityError:
            raise HttpError(409, f"Ya existe una categoría llamada '{payload.name}' en tu empresa.")

        return category

    @route.delete("/categories/{category_id}", response={204: None})
    def delete_category(self, request, category_id: uuid.UUID):
        category = get_object_or_404(Category, id=category_id, company=request.user.company)
        try:
            category.delete()
        except IntegrityError:
            raise HttpError(409, "No se puede eliminar: hay productos asociados a esta categoría.")
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

@api_controller("/inventory", auth=JWTAuth(), tags=["Inventory - Products"])
class ProductController:
    
    @route.get("/products", response=List[ProductOut])
    def list_products(self, request):
        return list(
            Product.objects.filter(company=request.user.company)
            .select_related("category", "supplier")
        )

    @route.post("/products", response={201: ProductOut})
    def create_product(self, request, payload: ProductIn):
        company = request.user.company

        category = get_object_or_404(Category, id=payload.category_id, company=company)
        supplier = (
            get_object_or_404(Supplier, id=payload.supplier_id, company=company)
            if payload.supplier_id
            else None
        )

        data = payload.dict(exclude={"category_id", "supplier_id"})

        try:
            product = Product.objects.create(
                company=company,
                category=category,
                supplier=supplier,
                **data,
            )
        except IntegrityError:
            raise HttpError(409, f"Ya existe un producto con la referencia '{payload.internal_reference}'.")

        return 201, product

    @route.get("/products/{product_id}", response=ProductOut)
    def get_product(self, request, product_id: uuid.UUID):
        return get_object_or_404(
            Product.objects.select_related("category", "supplier"),
            id=product_id,
            company=request.user.company,
        )

    @route.patch("/products/{product_id}", response=ProductOut)
    def update_product(self, request, product_id: uuid.UUID, payload: ProductUpdate):
        company = request.user.company
        product = get_object_or_404(
            Product.objects.select_related("category", "supplier"),
            id=product_id,
            company=company,
        )

        data = payload.dict(exclude_unset=True)
        if not data:
            raise HttpError(400, "No se enviaron campos para actualizar.")

        if "category_id" in data:
            product.category = get_object_or_404(Category, id=data.pop("category_id"), company=company)

        if "supplier_id" in data:
            sid = data.pop("supplier_id")
            product.supplier = get_object_or_404(Supplier, id=sid, company=company) if sid else None

        for field, value in data.items():
            setattr(product, field, value)

        try:
            product.save()
        except IntegrityError:
            raise HttpError(409, f"Ya existe un producto con la referencia '{payload.internal_reference}'.")

        return product

    @route.delete("/products/{product_id}", response={204: None})
    def delete_product(self, request, product_id: uuid.UUID):
        product = get_object_or_404(Product, id=product_id, company=request.user.company)
        product.delete()
        return 204, None