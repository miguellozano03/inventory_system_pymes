from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import Role, User

@admin.register(Role)
class RoleAdmin(admin.ModelAdmin):
    list_display = ('id', 'name')
    search_fields = ('name',)

@admin.register(User)
class UserAdmin(BaseUserAdmin):
    list_display = ('email', 'first_name', 'last_name', 'company', 'role', 'is_active', 'is_staff')
    list_filter = ('is_active', 'is_staff', 'role', 'company')
    search_fields = ('email', 'first_name', 'last_name', 'identification')
    ordering = ('email',)

    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        ('Información Personal', {'fields': ('first_name', 'last_name', 'identification')}),
        ('Permisos y Nexos', {'fields': ('company', 'role', 'is_active', 'is_staff', 'is_superuser')}),
        ('Fechas Importantes', {'fields': ('last_login', 'created_at', 'updated_at')}),
    )
    
    readonly_fields = ('id', 'last_login', 'created_at', 'updated_at')