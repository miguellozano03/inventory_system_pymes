import pytest
from decimal import Decimal
from django.test import Client
from ninja_jwt.tokens import RefreshToken

from apps.accounts.models import User
from apps.companies.models import Company
from apps.contacts.models import Supplier
from apps.inventory.models import Category, Product


@pytest.fixture
def setup_data(db):
    company_a = Company.objects.create(name="Company A", nit="900000001", email="a@test.com", phone="300000001")
    company_b = Company.objects.create(name="Company B", nit="900000002", email="b@test.com", phone="300000002")

    user = User.objects.create_user(
        email="user@test.com",
        password="Password123!",
        first_name="Test",
        last_name="User",
        identification="123",
        company=company_a,
        role=User.Role.ADMIN,
    )

    category_a = Category.objects.create(company=company_a, name="Category A")
    category_b = Category.objects.create(company=company_b, name="Category B")

    supplier_a = Supplier.objects.create(company=company_a, name="Supplier A")
    supplier_b = Supplier.objects.create(company=company_b, name="Supplier B")

    product = Product.objects.create(
        company=company_a,
        category=category_a,
        supplier=supplier_a,
        internal_reference="PROD-001",
        name="Product A",
        stock=10,
        cost_price=Decimal("100.00"),
        sale_price=Decimal("150.00"),
    )

    client = Client()
    token = RefreshToken.for_user(user).access_token
    client.defaults["HTTP_AUTHORIZATION"] = f"Bearer {token}"

    return {
        "client": client,
        "company_a": company_a,
        "company_b": company_b,
        "category_a": category_a,
        "category_b": category_b,
        "supplier_a": supplier_a,
        "supplier_b": supplier_b,
        "product": product,
    }


@pytest.mark.django_db
class TestCategories:

    def test_list_only_company_categories(self, setup_data):
        data = setup_data
        response = data["client"].get("/api/inventory/categories")

        assert response.status_code == 200
        assert len(response.json()) == 1
        assert response.json()[0]["id"] == str(data["category_a"].id)

    def test_create_category(self, setup_data):
        response = setup_data["client"].post(
            "/api/inventory/categories",
            data={"name": "New Category"},
            content_type="application/json",
        )

        assert response.status_code == 201
        assert Category.objects.filter(
            company=setup_data["company_a"],
            name="New Category",
        ).exists()

    def test_cannot_access_other_company_category(self, setup_data):
        response = setup_data["client"].get(
            f"/api/inventory/categories/{setup_data['category_b'].id}"
        )

        assert response.status_code == 404

    def test_update_category(self, setup_data):
        category = setup_data["category_a"]

        response = setup_data["client"].patch(
            f"/api/inventory/categories/{category.id}",
            data={"name": "Updated"},
            content_type="application/json",
        )

        assert response.status_code == 200

        category.refresh_from_db()
        assert category.name == "Updated"


@pytest.mark.django_db
class TestProducts:

    def test_list_only_company_products(self, setup_data):
        response = setup_data["client"].get("/api/inventory/products")

        assert response.status_code == 200
        assert len(response.json()) == 1
        assert response.json()[0]["id"] == str(setup_data["product"].id)

    def test_create_product(self, setup_data):
        data = setup_data

        response = data["client"].post(
            "/api/inventory/products",
            data={
                "category_id": str(data["category_a"].id),
                "supplier_id": str(data["supplier_a"].id),
                "internal_reference": "PROD-002",
                "name": "Product B",
                "stock": 5,
                "cost_price": "50.00",
                "sale_price": "80.00",
            },
            content_type="application/json",
        )

        assert response.status_code == 201
        assert Product.objects.filter(
            company=data["company_a"],
            internal_reference="PROD-002",
        ).exists()

    def test_cannot_use_other_company_category(self, setup_data):
        data = setup_data

        response = data["client"].post(
            "/api/inventory/products",
            data={
                "category_id": str(data["category_b"].id),
                "internal_reference": "HACK",
                "name": "Invalid",
                "cost_price": "10.00",
                "sale_price": "20.00",
            },
            content_type="application/json",
        )

        assert response.status_code == 404

    def test_cannot_use_other_company_supplier(self, setup_data):
        data = setup_data

        response = data["client"].post(
            "/api/inventory/products",
            data={
                "category_id": str(data["category_a"].id),
                "supplier_id": str(data["supplier_b"].id),
                "internal_reference": "HACK",
                "name": "Invalid",
                "cost_price": "10.00",
                "sale_price": "20.00",
            },
            content_type="application/json",
        )

        assert response.status_code == 404

    def test_cannot_access_other_company_product(self, setup_data):
        data = setup_data

        other_product = Product.objects.create(
            company=data["company_b"],
            category=data["category_b"],
            internal_reference="OTHER-001",
            name="Other Product",
            stock=10,
            cost_price=Decimal("10.00"),
            sale_price=Decimal("20.00"),
        )

        response = data["client"].get(
            f"/api/inventory/products/{other_product.id}"
        )

        assert response.status_code == 404

    def test_update_product(self, setup_data):
        data = setup_data
        product = data["product"]

        response = data["client"].patch(
            f"/api/inventory/products/{product.id}",
            data={"name": "Updated Product", "stock": 50},
            content_type="application/json",
        )

        assert response.status_code == 200

        product.refresh_from_db()
        assert product.name == "Updated Product"
        assert product.stock == 50

    def test_delete_product(self, setup_data):
        data = setup_data
        product = data["product"]

        response = data["client"].delete(
            f"/api/inventory/products/{product.id}"
        )

        assert response.status_code == 204
        assert not Product.objects.filter(id=product.id).exists()