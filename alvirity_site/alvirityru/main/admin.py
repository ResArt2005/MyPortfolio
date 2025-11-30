from django.contrib import admin
from main.models import *
from modeltranslation.admin import TranslationAdmin, TranslationStackedInline
page_fields = [(u"Настройки страницы", {
    "fields": ["menutitle", "canonical", "alias", "menushow", "menuposition", "sitemap"]
}),
    (u"Open Graph", {
        "fields": [
            "og_title", "og_description", "og_type_pb_time",
            "og_type_author"
        ]
    }),
    (u"SEO информация", {
        "fields": [
            "seo_h1",
            "seo_title",
            "seo_description",
            "seo_keywords",
            "content",
        ]
    })]
page_list = ("menushow", "sitemap")

@admin.register(Settings)
class SettingsAdmin(admin.ModelAdmin):
    fieldsets = [("Основные", {"fields": ["phone", "address", "header_additional", "metrics_google", "metrics_yandex", 'politic_ru', 'politic_en']})]

@admin.register(Team)
class TeamAdmin(TranslationAdmin):
    fieldsets = [("Основные", {"fields": ["sort_t", "photo", "photo_hover", "fio", "who", "desc", "link_tg", "link_vk", "link_web"]})]
    list_display = ["fio", "sort_t"]
    list_editable = ('sort_t',)

class ServicesPointInline(TranslationStackedInline):
    model = ServicesPoint
    extra = 0
    fieldsets = (
        ('Основное', {
            'fields': (
                ('name', 'price', 'templates', 'sort_t'),
                ('advantagestext', 'slidertext', 'title_plan', 'alias'),
                ('images', 'imagesm', 'menutitle', 'menuposition'),
                'short_text',
                'content',
            )
        }),
        ('SEO', {
            'fields': (
                ('seo_h1', 'seo_title', 'seo_keywords', 'seo_description'),
                ('canonical', 'og_title', 'og_type', 'og_type_pb_time'),
                ('og_description', 'og_type_author'),
            )
        }),
        ('Настройки', {
            'fields': (
                ('menushow', 'sitemap',),
            )
        }),
    )
    classes = ('collapse',)

class TextpageFAQAdmin(admin.TabularInline):
    model = ServicesPointFAQList
    extra = 0
    fieldsets = [("Основные", {"fields": ["name_ru", "name_en", 'desc_ru', 'desc_en',  'sort_t',]})]

@admin.register(TextPage)
class TextPageAdmin(TranslationAdmin):
    fieldsets = [("Основные", {"fields": ["name", "short_text", 'sort_t', 'hash_type', 'img_page', 'img_back', "is_service", "img_path"]})] + page_fields
    list_display = ["name", "is_service", "sort_t"]
    list_editable = ("is_service", 'sort_t',)
    inlines = [
        ServicesPointInline,
        TextpageFAQAdmin
    ]


@admin.register(Post)
class Post(TranslationAdmin):
    fieldsets = [("Основные", {"fields": ["name", "images", 'short_desc']})] + page_fields
    list_display = ["name"]

    def get_prepopulated_fields(self, request, obj=None):
        return {"alias": ("name_ru",)}

@admin.register(Partner)
class Partner(TranslationAdmin):
    fieldsets = [("Основные", {"fields": ["images", "link", "name", "sort_t"]})]
    list_display = ["link", "name", "sort_t"]
    list_editable = ('name', 'sort_t')

class ProjectSliderInline(admin.TabularInline):
    model = ProjectSlider
    extra = 0

class ProjectFAQAdmin(admin.TabularInline):
    model = ProjectFAQ
    extra = 0
    fieldsets = [("Основные", {"fields": ["name_ru", "name_en", 'desc_ru', 'desc_en',  'sort_t',]})]


@admin.register(Project)
class Project(TranslationAdmin):
    fieldsets = [("Основные", {"fields": ["name", "sort_t", "templates", "link", "osp", "images", "video_link", 'short_desc', 'usulugi']})] + page_fields
    list_display = ["name_ru", "sort_t"]
    list_editable = ('sort_t', )
    inlines = [
        ProjectSliderInline,
        ProjectFAQAdmin
    ]

    def get_prepopulated_fields(self, request, obj=None):
        return {"alias": ("name_ru",)}


@admin.register(Robots)
class RobotsAdmin(admin.ModelAdmin):
    fieldsets = [
        ('Содержимое', {
            'fields': ['content']
        }),
    ]


class ServicesAdvantagesInline(admin.TabularInline):
    model = ServicesAdvantages
    extra = 0
    fieldsets = [("Основные", {"fields": ["name_ru", "name_en", 'short_text_ru', 'short_text_en', 'sort_t',]})]


class ServicesSlide(admin.TabularInline):
    model = ServicesPointSlide
    extra = 0
    fieldsets = [("Основные", {"fields": ["name_ru", "name_en", 'desc_ru', 'desc_en', 'images', 'sort_t',]})]


class ServicesFAQ(admin.TabularInline):
    model = ServicesPointFAQ
    extra = 0
    fieldsets = [("Основные", {"fields": ["name_ru", "name_en", 'desc_ru', 'desc_en',  'sort_t',]})]


    

class ServicesPlan(admin.TabularInline):
    model = ServicesPointPlan
    extra = 0
    fieldsets = [("Основные", {"fields": ["name_ru", "name_en", 'desc_ru', 'desc_en','sort_t',]})]

class ServicesTarif(admin.TabularInline):
    model = ServicesPointTarif
    extra = 0
    fieldsets = [("Основные", {"fields": ["name_ru", "name_en", 'desc_ru', 'desc_en', 'short_text_ru', 'short_text_en','sort_t', 'price_ru', 'price_en']})]

@admin.register(ServicesPoint)
class Services(TranslationAdmin):
    fieldsets = [("Основные", {"fields": ["templates","name", "images", 'imagesm', 'short_text', 'price', 'sort_t','advantagestext', 'slidertext', 'title_plan']})] + page_fields
    list_display = ["name"]
    inlines = [
        ServicesAdvantagesInline,
        ServicesSlide,
        ServicesFAQ,
        ServicesPlan, 
        ServicesTarif
    ]


@admin.register(TemplateItemsSeo)
class TemplateItemsSeo(TranslationAdmin):
    fieldsets = [("Основные", {
        "fields": ["title", "description", "type"]})]
    list_display = ["title", "type"]