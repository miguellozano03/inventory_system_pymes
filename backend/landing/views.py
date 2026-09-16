from django.shortcuts import render
from django.conf import settings


def home(request):
    context = {
        'login_url': settings.LANDING_LOGIN_URL,
        'register_url': settings.LANDING_REGISTER_URL,
        'docs_url': settings.LANDING_DOCS_URL,
    }
    return render(request, 'landing/home.html', context)
