from django.apps import AppConfig
from django.conf import settings

class GeneratorConfig(AppConfig):
    name = 'generator'
    verbose_name='Блок автоматизированных новостей'

    def ready(self):
        if not getattr(settings, "SCHEDULER_AUTOSTART", False):
            return
        if settings.SCHEDULER_AUTOSTART:
            from .tasks import start
            start()