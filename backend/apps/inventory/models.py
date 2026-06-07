import uuid
from django.db import models

class Category(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    company = models.ForeignKey('companies.Company', on_delete=models.CASCADE, related_name='categories')
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True, null=True)

    class Meta:
        db_table = 'categories'
        verbose_name_plural = 'Categories'
        unique_together = ('company', 'name')

    def __str__(self):
        return f"{self.name} ({self.company.name})"


class Supplier(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    company = models.ForeignKey('companies.Company', on_delete=models.CASCADE, related_name='suppliers')
    name = models.CharField(max_length=255)
    contact_name = models.CharField(max_length=255, blank=True, null=True)
    email = models.EmailField(blank=True, null=True)
    phone = models.CharField(max_length=50, blank=True, null=True)
    address = models.TextField(blank=True, null=True)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'suppliers'

    def __str__(self):
        return self.name


class Product(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    company = models.ForeignKey('companies.Company', on_delete=models.CASCADE, related_name='products')
    category = models.ForeignKey(Category, on_delete=models.PROTECT, related_name='products')
    supplier = models.ForeignKey(Supplier, on_delete=models.SET_NULL, null=True, blank=True, related_name='products')
    
    internal_reference = models.CharField(max_length=100)
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    
    stock = models.IntegerField(default=0)
    cost_price = models.DecimalField(max_digits=12, decimal_places=2)
    sale_price = models.DecimalField(max_digits=12, decimal_places=2)
    
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'products'
        constraints = [
            models.UniqueConstraint(
                fields=['company', 'internal_reference'], 
                name='unique_company_internal_reference'
            )
        ]

    def __str__(self):
        return f"[{self.internal_reference}] {self.name}"