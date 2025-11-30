
from django.conf import settings
from django.utils import translation
from django.utils.deprecation import MiddlewareMixin
from django.middleware.locale import LocaleMiddleware

class DomainLocaleMiddleware(LocaleMiddleware):
    def process_request(self, request):
        host = request.get_host()
        
        if host.endswith('.ru'):
            language = 'ru'
        elif host.endswith('.com'):
            language = 'en'
        else:
            language = settings.LANGUAGE_CODE  

        translation.activate(language)
        request.LANGUAGE_CODE = language
