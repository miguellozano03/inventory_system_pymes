from django.contrib import admin
from .models import Category, Product

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'company')
    list_filter = ('company',)
    search_fields = ('name',)
    readonly_fields = ('id',)

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('internal_reference', 'name', 'company', 'category', 'stock', 'sale_price', 'is_active')
    list_filter = ('is_active', 'company', 'category')
    search_fields = ('internal_reference', 'name', 'description')
    readonly_fields = ('id', 'created_at', 'updated_at')