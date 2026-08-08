import pytest
from ninja.testing import TestClient
from ninja_jwt.tokens import RefreshToken

from core.api import api
from apps.accounts.models import User
from apps.accounts.service import UserService
from apps.companies.models import Company


@pytest.fixture
def company(db):
    return Company.objects.create(
        name="Test Company",
        nit="900123456-1",
        email="company@test.com",
        phone="3001234567",
    )


@pytest.fixture
def user(db, company):
    return User.objects.create_user(
        email="user@test.com",
        password="Password123!",
        first_name="Test",
        last_name="User",
        identification="123456789",
        company=company,
        role=User.Role.ADMIN,
    )


@pytest.fixture
def client():
    return TestClient(api)


@pytest.mark.django_db
class TestUserManager:

    def test_create_user_requires_email(self):
        with pytest.raises(ValueError, match="El email es obligatorio"):
            User.objects.create_user(
                email="",
                password="password",
            )

    def test_create_user_normalizes_email(self):
        user = User.objects.create_user(
            email="Test@EMAIL.COM",
            password="Password123!",
            first_name="Test",
            last_name="User",
            identification="123",
        )

        assert user.email == "Test@email.com"

    def test_create_user_hashes_password(self):
        user = User.objects.create_user(
            email="test@test.com",
            password="Password123!",
            first_name="Test",
            last_name="User",
            identification="123",
        )

        assert user.password != "Password123!"
        assert user.check_password("Password123!")

    def test_create_superuser(self):
        user = User.objects.create_superuser(
            email="admin@test.com",
            password="Password123!",
            first_name="Admin",
            last_name="User",
            identification="123",
        )

        assert user.is_staff is True
        assert user.is_superuser is True
        assert user.company is None
        assert user.role == User.Role.ADMIN

    def test_create_superuser_requires_is_staff(self):
        with pytest.raises(
            ValueError,
            match="Superuser debe tener is_staff=True.",
        ):
            User.objects.create_superuser(
                email="admin@test.com",
                password="Password123!",
                first_name="Admin",
                last_name="User",
                identification="123",
                is_staff=False,
            )

    def test_create_superuser_requires_is_superuser(self):
        with pytest.raises(
            ValueError,
            match="Superuser debe tener is_superuser=True.",
        ):
            User.objects.create_superuser(
                email="admin@test.com",
                password="Password123!",
                first_name="Admin",
                last_name="User",
                identification="123",
                is_superuser=False,
            )


@pytest.mark.django_db
class TestUserService:

    def test_get_me_returns_user(self, user):
        result = UserService.get_me(user.id)

        assert result.id == user.id
        assert result.email == user.email

    def test_get_me_raises_for_nonexistent_user(self):
        import uuid

        with pytest.raises(User.DoesNotExist):
            UserService.get_me(uuid.uuid4())

    def test_register_creates_company_and_admin_user(self):
        data = {
            "email": "admin@test.com",
            "password": "Password123!",
            "first_name": "Admin",
            "last_name": "Test",
            "identification": "123456",
            "company_name": "Acme",
            "company_nit": "900999999-1",
            "company_email": "acme@test.com",
            "company_phone": "3009999999",
        }

        user = UserService.register(data)

        assert user.email == data["email"]
        assert user.role == User.Role.ADMIN
        assert user.company is not None
        assert user.company.name == "Acme"

        assert Company.objects.filter(
            nit=data["company_nit"]
        ).exists()

    def test_register_rejects_duplicate_company_nit(self):
        Company.objects.create(
            name="Existing Company",
            nit="900123456-1",
            email="existing@test.com",
            phone="3000000000",
        )

        data = {
            "email": "admin@test.com",
            "password": "Password123!",
            "first_name": "Admin",
            "last_name": "Test",
            "identification": "123456",
            "company_name": "New Company",
            "company_nit": "900123456-1",
            "company_email": "new@test.com",
            "company_phone": "3009999999",
        }

        with pytest.raises(
            ValueError,
            match="El NIT de la compañía ya existe",
        ):
            UserService.register(data)

        assert not User.objects.filter(
            email=data["email"]
        ).exists()


@pytest.mark.django_db
class TestAccountEndpoints:

    def test_register(self, client):
        payload = {
            "email": "admin@test.com",
            "password": "Password123!",
            "first_name": "Admin",
            "last_name": "Test",
            "identification": "123456",
            "company_name": "Acme",
            "company_nit": "900999999-1",
            "company_email": "acme@test.com",
            "company_phone": "3009999999",
        }

        response = client.post(
            "/accounts/register",
            json=payload,
        )

        assert response.status_code == 200
        assert response.json()["email"] == payload["email"]

    def test_me_requires_authentication(self, client):
        response = client.get("/accounts/me")

        assert response.status_code == 401

    def test_me_returns_authenticated_user(self, client, user):
        refresh = RefreshToken.for_user(user)
        access_token = str(refresh.access_token)

        response = client.get(
            "/accounts/me",
            headers={
                "Authorization": f"Bearer {access_token}",
            },
        )

        assert response.status_code == 200
        assert response.json()["email"] == user.email
        assert response.json()["first_name"] == user.first_name

