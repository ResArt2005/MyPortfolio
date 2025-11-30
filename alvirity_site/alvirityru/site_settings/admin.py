from django.contrib import admin
from site_settings.models import *
from modeltranslation.admin import TranslationAdmin

@admin.register(SiteType)
class SiteTypeAdmin(TranslationAdmin):
    fieldsets = [("Основные", {"fields": ["name"]})]
