from django.contrib import admin
from django.forms import BaseInlineFormSet
from .models import Transaction, TransactionDetail


class TransactionDetailReadonlyInline(admin.TabularInline):
    """Muestra los detalles existentes como solo lectura"""
    model = TransactionDetail
    extra = 0
    can_delete = False
    fields = ('product', 'product_name', 'quantity', 'unit_price', 'subtotal')
    readonly_fields = ('product', 'product_name', 'quantity', 'unit_price', 'subtotal')
    verbose_name = "Detalle existente"
    verbose_name_plural = "Detalles existentes"

    def has_add_permission(self, request, obj=None):
        return False


class TransactionDetailFormSet(BaseInlineFormSet):
    def save_new(self, form, commit=True):
        obj = super().save_new(form, commit=False)
        obj.product_name = obj.product.name
        
        # Precio según tipo de transacción
        if self.instance.type == Transaction.OUT:
            obj.unit_price = obj.product.sale_price
        else:
            obj.unit_price = obj.product.cost_price
            
        obj.subtotal = obj.quantity * obj.unit_price
        if commit:
            obj.save()
        return obj


class TransactionDetailAddInline(admin.TabularInline):
    model = TransactionDetail
    formset = TransactionDetailFormSet  # ← aquí se conecta
    extra = 1
    fields = ('product', 'quantity')
    verbose_name = "Nuevo detalle"
    verbose_name_plural = "Agregar nuevos detalles"

    def get_queryset(self, request):
        return super().get_queryset(request).none()


@admin.register(Transaction)
class TransactionAdmin(admin.ModelAdmin):
    list_display = ('id', 'type', 'company', 'user', 'total', 'created_at')
    list_filter = ('type', 'company', 'created_at')
    search_fields = ('id', 'user__email', 'customer__name', 'supplier__name')
    readonly_fields = ('id', 'total', 'created_at')

    inlines = [TransactionDetailReadonlyInline, TransactionDetailAddInline]