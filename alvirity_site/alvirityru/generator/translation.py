from modeltranslation.translator import register, TranslationOptions
from generator.models import *

@register(abilityNews)
class abilityNewsTranslationOptions(TranslationOptions):
    fields = ('name','desc',) 


@register(whyWork)
class whyWorktranslate(TranslationOptions):
    fields = ('name','desc',) 

@register(benefit)
class benefittranslat(TranslationOptions):
    fields = ('name','desc',) 

@register(newsProject)
class newsProjecttranslat(TranslationOptions):
    fields = ('name','desc',) 

    