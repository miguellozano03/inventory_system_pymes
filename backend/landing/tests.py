from django.test import TestCase


class TestLandingHome(TestCase):
    def test_returns_200(self):
        response = self.client.get('/')
        self.assertEqual(response.status_code, 200)

    def test_contains_brand_name(self):
        response = self.client.get('/')
        self.assertContains(response, 'Sistema de Gestión de Inventarios')

    def test_contains_manual_button(self):
        response = self.client.get('/')
        self.assertContains(response, 'Manual / Documentación')

    def test_contains_login_cta(self):
        response = self.client.get('/')
        self.assertContains(response, '/login')

    def test_contains_register_cta(self):
        response = self.client.get('/')
        self.assertContains(response, '/register')
