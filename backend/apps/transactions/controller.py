import uuid

from ninja_extra import api_controller, route
from ninja_jwt.authentication import JWTAuth

from .schemas import TransactionIn, TransactionOut
from .service import TransactionService


@api_controller("/transactions", auth=JWTAuth(), tags=["Inventory - Transactions"])
class TransactionController:

    @route.get("", response=list[TransactionOut])
    def list_transactions(self, request):
        return TransactionService.list(request.user.company)

    @route.get("/{transaction_id}", response=TransactionOut)
    def get_transaction(self, request, transaction_id: uuid.UUID):
        return TransactionService.get(request.user.company, transaction_id)

    @route.post("", response={201: TransactionOut})
    def create_transaction(self, request, payload: TransactionIn):
        trx = TransactionService.create(
            company=request.user.company,
            user=request.user,
            payload=payload,
        )

        return 201, trx

    @route.delete("/{transaction_id}", response={204: None})
    def delete_transaction(self, request, transaction_id: uuid.UUID):
        TransactionService.delete(
            company=request.user.company,
            transaction_id=transaction_id,
        )

        return 204, None