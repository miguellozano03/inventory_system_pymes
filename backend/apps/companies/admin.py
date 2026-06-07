from django.contrib import admin
from .models import Company

@admin.register(Company)
class CompanyAdmin(admin.ModelAdmin):
    list_display = ('name', 'nit', 'email', 'phone', 'created_at')
    search_fields = ('name', 'nit', 'email')
    readonly_fields = ('id', 'created_at', 'updated_at')