import uuid

import pytest
from django.db.models import ProtectedError

from apps.accounts.models import User
from apps.companies.models import Company


@pytest.mark.django_db
class TestCompanyModel:

    def test_create_company(self):
        company = Company.objects.create(
            name="Acme Corp",
            nit="900123456-1",
            email="acme@test.com",
            phone="3001234567",
        )

        assert company.id is not None
        assert isinstance(company.id, uuid.UUID)
        assert company.name == "Acme Corp"
        assert company.nit == "900123456-1"

    def test_nit_must_be_unique(self):
        Company.objects.create(
            name="Company A",
            nit="900123456-1",
            email="a@test.com",
            phone="3000000000",
        )

        with pytest.raises(Exception):
            Company.objects.create(
                name="Company B",
                nit="900123456-1",
                email="b@test.com",
                phone="3000000001",
            )

    def test_str_returns_company_name(self):
        company = Company.objects.create(
            name="Acme Corp",
            nit="900123456-1",
            email="acme@test.com",
            phone="3001234567",
        )

        assert str(company) == "Acme Corp"

    def test_company_can_have_multiple_users(self):
        company = Company.objects.create(
            name="Acme Corp",
            nit="900123456-1",
            email="acme@test.com",
            phone="3001234567",
        )

        user1 = User.objects.create_user(
            email="user1@test.com",
            password="Password123!",
            first_name="User",
            last_name="One",
            identification="111",
            company=company,
        )

        user2 = User.objects.create_user(
            email="user2@test.com",
            password="Password123!",
            first_name="User",
            last_name="Two",
            identification="222",
            company=company,
        )

        assert company.users.count() == 2
        assert user1 in company.users.all()
        assert user2 in company.users.all()

    def test_company_deletion_is_protected_when_users_exist(self):
        company = Company.objects.create(
            name="Acme Corp",
            nit="900123456-1",
            email="acme@test.com",
            phone="3001234567",
        )

        User.objects.create_user(
            email="user@test.com",
            password="Password123!",
            first_name="Test",
            last_name="User",
            identification="123",
            company=company,
        )

        with pytest.raises(ProtectedError):
            company.delete()

        assert Company.objects.filter(id=company.id).exists()