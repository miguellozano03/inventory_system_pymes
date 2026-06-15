from django.contrib import admin
from .models import Customer, Supplier

@admin.register(Customer)
class CustomerAdmin(admin.ModelAdmin):
    list_display = ('name', 'identification', 'company', 'email', 'phone', 'created_at')
    list_filter = ('company',)
    search_fields = ('name', 'identification', 'email')
    readonly_fields = ('id', 'created_at', 'updated_at')
    
@admin.register(Supplier)
class SupplierAdmin(admin.ModelAdmin):
    list_display = ('name', 'company', 'contact_name', 'email', 'phone')
    list_filter = ('company',)
    search_fields = ('name', 'contact_name', 'email')
    readonly_fields = ('id', 'created_at', 'updated_at')
