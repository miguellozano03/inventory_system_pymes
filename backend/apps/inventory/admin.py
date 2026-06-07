from django.contrib import admin
from .models import Category, Supplier, Product

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'company')
    list_filter = ('company',)
    search_fields = ('name',)
    readonly_fields = ('id',)

@admin.register(Supplier)
class SupplierAdmin(admin.ModelAdmin):
    list_display = ('name', 'company', 'contact_name', 'email', 'phone')
    list_filter = ('company',)
    search_fields = ('name', 'contact_name', 'email')
    readonly_fields = ('id', 'created_at', 'updated_at')

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('internal_reference', 'name', 'company', 'category', 'stock', 'sale_price', 'is_active')
    list_filter = ('is_active', 'company', 'category')
    search_fields = ('internal_reference', 'name', 'description')
    readonly_fields = ('id', 'created_at', 'updated_at')