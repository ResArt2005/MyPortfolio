from modeltranslation.translator import register, TranslationOptions
from main.models import *

@register(SiteType)
class SiteTypetranslat(TranslationOptions):
    fields = ('name',) 