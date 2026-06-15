import uuid
from django.db import models

class Transaction(models.Model):
    IN = 'IN'
    OUT = 'OUT'
    TRANSACTION_TYPES = [
        (IN, 'Entrada / Compra'),
        (OUT, 'Salida / Venta'),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    company = models.ForeignKey('companies.Company', on_delete=models.CASCADE, related_name='transactions')
    user = models.ForeignKey('accounts.User', on_delete=models.PROTECT, related_name='transactions')
    
    customer = models.ForeignKey('contacts.Customer', on_delete=models.SET_NULL, null=True, blank=True, related_name='transactions')
    supplier = models.ForeignKey('contacts.Supplier', on_delete=models.SET_NULL, null=True, blank=True, related_name='transactions')
    
    type = models.CharField(max_length=3, choices=TRANSACTION_TYPES)
    total = models.DecimalField(max_digits=12, decimal_places=2, default=0.00)
    
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'transactions'

    def __str__(self):
        return f"{self.type} - {self.id} (${self.total})"


class TransactionDetail(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    transaction = models.ForeignKey(Transaction, on_delete=models.CASCADE, related_name='details')
    product = models.ForeignKey('inventory.Product', on_delete=models.PROTECT, related_name='transaction_details')
    
    product_name = models.CharField(max_length=255)
    quantity = models.IntegerField()
    unit_price = models.DecimalField(max_digits=12, decimal_places=2)
    subtotal = models.DecimalField(max_digits=12, decimal_places=2)

    class Meta:
        db_table = 'transaction_details'

    def __str__(self):
        return f"{self.quantity}x {self.product_name} (Subtotal: {self.subtotal})"