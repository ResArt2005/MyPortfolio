from modeltranslation.translator import register, TranslationOptions
from main.models import *

@register(Partner)
class MyModelTranslationOptions(TranslationOptions):
    fields = ('name',) 


@register(Project)
class projecttranslate(TranslationOptions):
    fields = ('name','short_desc', 'content', 'seo_h1' ,'seo_title', 'seo_description', 'og_title', 'og_description',) 

@register(Post)
class posttranslat(TranslationOptions):
    fields = ('name','short_desc','content','seo_h1' ,'seo_title', 'seo_description', 'og_title', 'og_description',) 

@register(ServicesAdvantages)
class servtranslat(TranslationOptions):
    fields = ('name','short_text') 


@register(Settings)
class SettingsTranslateqwe(TranslationOptions):
    fields = ('politic',) 


@register(ServicesPointSlide)
class servtslideranslat(TranslationOptions):
    fields = ('name','desc') 

@register(ServicesPointFAQ)
class servFAQtranslat(TranslationOptions):
    fields = ('name','desc') 

@register(ProjectFAQ)
class servFAQtranslat(TranslationOptions):
    fields = ('name','desc') 

@register(ServicesPointFAQList)
class servFAQtranslat(TranslationOptions):
    fields = ('name','desc') 
    

@register(ServicesPointPlan)
class servtplantranslat(TranslationOptions):
    fields = ('name','desc') 

@register(ServicesPointTarif)
class servttariftranslat(TranslationOptions):
    fields = ('name','desc', 'price', 'short_text') 

@register(ServicesPoint)
class ServicesPointtranslat(TranslationOptions):
    fields = ('name','short_text', 'advantagestext', 'title_plan','content', 'seo_h1' ,'seo_title', 'seo_description', 'og_title', 'og_description', 'price', 'slidertext') 

@register(Team)
class TeamPointtranslat(TranslationOptions):
    fields = ('fio','who','desc',) 

@register(TextPage)
class TextPagetranslat(TranslationOptions):
    fields = ('name', 'short_text','content', 'seo_h1' ,'seo_title', 'seo_description', 'og_title', 'og_description') 

@register(TemplateItemsSeo)
class TemplateItemsSeotranslate(TranslationOptions):
    fields = ('title', 'description',) 


    