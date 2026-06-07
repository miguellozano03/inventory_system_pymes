from django.contrib import admin
from .models import Customer

@admin.register(Customer)
class CustomerAdmin(admin.ModelAdmin):
    list_display = ('name', 'identification', 'company', 'email', 'phone', 'created_at')
    list_filter = ('company',)
    search_fields = ('name', 'identification', 'email')
    readonly_fields = ('id', 'created_at', 'updated_at')