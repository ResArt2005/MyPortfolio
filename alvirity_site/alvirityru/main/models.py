from __future__ import unicode_literals

import datetime

from django.contrib.auth.models import User
from django.db import models
from django.urls import reverse, reverse_lazy
from pytils.translit import slugify
from ckeditor.fields import RichTextField
from site_settings.models import *




class Page(models.Model):
    class Meta:
        abstract = True

    alias = models.SlugField(max_length=200, verbose_name=u"Url", null=True, blank=True)
    menushow = models.BooleanField(
        default=True, verbose_name=u"Показывать в меню")
    sitemap = models.BooleanField(
        default=True, verbose_name=u"Показывать в карте сайта")
    og_title = models.CharField(
        max_length=200, verbose_name="OG Title", null=True, blank=True)
    og_description = models.TextField(
        max_length=2000, verbose_name="OG Description", null=True, blank=True)
    og_type = models.CharField(
        max_length=200, verbose_name="OG Type", null=True, blank=True)
    og_type_pb_time = models.DateTimeField(
        default=datetime.datetime.now(), verbose_name=u"Время публикации")
    og_type_author = models.CharField(
        max_length=200, verbose_name="OG author", null=True, blank=True)
    seo_h1 = models.CharField(
        max_length=200, verbose_name="H1", null=True, blank=True)
    seo_title = models.CharField(
        max_length=200, verbose_name="Title", null=True, blank=True)
    seo_description = models.CharField(
        max_length=500, verbose_name="Description", null=True, blank=True)
    seo_keywords = models.CharField(
        max_length=500, verbose_name="Keywords", null=True, blank=True)
    menutitle = models.CharField(
        max_length=200, verbose_name=u"Название в меню", null=True, blank=True)
    content = RichTextField(verbose_name=u"Статья", null=True, blank=True)
    menuposition = models.IntegerField(
        verbose_name=u"Позиция в меню", null=True, blank=True)
    lastmod = models.DateTimeField('date_published', auto_now=True)
    canonical = models.CharField(max_length=500, verbose_name=u"canonical", default='', null=True, blank=True)

class Settings(models.Model):
    class Meta:
        verbose_name = "Настройка сайта"
        verbose_name_plural = "Настройки сайта"

    favicon = models.FileField(verbose_name=u"Фавикон", null=True, blank=True)
    metrics_yandex = models.CharField(
        max_length=100, verbose_name='Счетчик Яндекс', null=True, blank=True)
    phone = models.CharField(
        max_length=100, verbose_name='Телефон', null=True, blank=True)
    address = models.CharField(
        max_length=100, verbose_name='Адрес', null=True, blank=True)
    metrics_google = models.CharField(
        max_length=100, verbose_name='Счетчик Google', null=True, blank=True)
    robots = models.TextField(
        verbose_name="Robots.txt", max_length=3000, blank=True)
    header_additional = models.TextField(
        verbose_name="Дополнения в <header>", max_length=10000, blank=True)
    
    politic = RichTextField(
        verbose_name="Политика конфиденциальности", max_length=30000, blank=True)
    ver = models.CharField(verbose_name='Версия сайта', max_length=16, null=True, default=0)

class Team(models.Model):
    class Meta:
        verbose_name = "Команда"
        verbose_name_plural = "Команда"
        ordering = ['sort_t']

    photo = models.FileField(verbose_name='Фото', default='', null=True, blank=True)
    photo_hover = models.FileField(verbose_name='Фото при наведении', default='', null=True, blank=True)
    fio = models.CharField(
        max_length=100, verbose_name='ФИО', null=True, blank=True)
    who = models.CharField(
        max_length=100, verbose_name='Должность', null=True, blank=True)
    link_tg = models.CharField(
        max_length=100, verbose_name='Ссылка на соц сеть vk', null=True, blank=True)
    link_vk = models.CharField(
        max_length=100, verbose_name='Ссылка на соц сеть tg', null=True, blank=True)
    link_web = models.CharField(
        max_length=100, verbose_name='Ссылка на соц сеть web', null=True, blank=True)
    desc = RichTextField(
        verbose_name="Описание", max_length=3000, blank=True)
    sort_t = models.IntegerField(
        verbose_name=u"Позиция", null=True, blank=True)

    def __str__(self):
        return self.fio


DISPLAY_TYPES_TEMPLATE = [
    (1, '1 Шаблон'),
    (2, '2 Шаблон')
]

class TextPage(Page):
    class Meta:
        verbose_name = u"Текстовая страница"
        verbose_name_plural = u"Страницы"
        ordering = ['sort_t']

    name = models.CharField(max_length=200, verbose_name=u"Название")
    short_text = RichTextField(verbose_name=u"Текст в услуги после заголовка", null=True, blank=True)
    is_service = models.BooleanField(verbose_name="Услуга?", default=False)
    img_page = models.ImageField(verbose_name='Изображение для главной страницы', default='', null=True, blank=True)
    img_back = models.ImageField(verbose_name='Изображение для страницы услуг', default='', null=True, blank=True)
    img_path = models.ImageField(verbose_name='Изображение для yandex turbo', default='', null=True, blank=True)
    sort_t = models.IntegerField(verbose_name=u"Позиция", default='0', null=True, blank=True)
    hash_type = models.PositiveIntegerField('Тип шаблона', default=1, choices=DISPLAY_TYPES_TEMPLATE)

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        if not self.alias:
            self.alias = slugify(self.name)
        super(TextPage, self).save(*args, **kwargs)

    def get_absolute_url(self):
        if self.alias == "index":
            return reverse('main:index', kwargs={})
        else:
            postfix = 'servicepage' if self.is_service else 'textpage'
            return reverse("main:{}".format(postfix), kwargs={'alias': self.alias})
        
class ServicesPointFAQList(models.Model):
    class Meta:
        verbose_name = u"FAQ "
        verbose_name_plural = u"FAQ"
        ordering = ['sort_t']

    usluga = models.ForeignKey(TextPage, verbose_name='Услуга', null=True, blank=True, on_delete=models.CASCADE)  
    name = models.CharField(max_length=200, verbose_name=u"Название", null=True)
    desc = RichTextField(verbose_name='Описание', null=True)
    sort_t = models.IntegerField(verbose_name=u"Позиция", default='0', null=True, blank=True)


class ServicesPoint(Page):
    class Meta:
        verbose_name = u"Услуги"
        verbose_name_plural = u"Услуги"
        ordering = ['sort_t']

    images = models.FileField(upload_to='projectimages/', verbose_name=u"Картинка", null=True, blank=True)
    imagesm = models.FileField(upload_to='projectimages/', verbose_name=u"Картинка mobile", null=True, blank=True)
    name = models.CharField(max_length=200, verbose_name=u"Название", null=True, blank=True)
    short_text = RichTextField(verbose_name=u"Текст", null=True, blank=True)
    price = models.CharField(max_length=200, verbose_name=u"Цена", null=True, blank=True)
    templates = models.ForeignKey(TextPage, verbose_name='Проект', null=True, blank=True, on_delete=models.CASCADE)
    sort_t = models.IntegerField(verbose_name=u"Позиция", default='0', null=True, blank=True)
    advantagestext = models.CharField(max_length=200,verbose_name=u'Заголовок преимуществ', null=True, blank=True)
    slidertext = models.CharField(max_length=200,verbose_name=u'Заголовок слайдера', null=True, blank=True)
    title_plan = models.CharField(max_length=200,verbose_name=u'Заголовок плана', null=True, blank=True)

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        if not self.alias:
            self.alias = slugify(self.name)
        super(ServicesPoint, self).save(*args, **kwargs)


class ServicesPointFAQ(models.Model):
    class Meta:
        verbose_name = u"FAQ "
        verbose_name_plural = u"FAQ"
        ordering = ['sort_t']

    usluga = models.ForeignKey(ServicesPoint, verbose_name='Услуга', null=True, blank=True, on_delete=models.CASCADE)  
    name = models.CharField(max_length=200, verbose_name=u"Название", null=True)
    desc = RichTextField(verbose_name='Описание', null=True)
    sort_t = models.IntegerField(verbose_name=u"Позиция", default='0', null=True, blank=True)

class ServicesPointSlide(models.Model):
    class Meta:
        verbose_name = u"Слайдер услуг"
        verbose_name_plural = u"Слайдер услуг"
        ordering = ['sort_t']

    usluga = models.ForeignKey(ServicesPoint, verbose_name='Услуга', null=True, blank=True, on_delete=models.CASCADE)  
    name = models.CharField(max_length=200, verbose_name=u"Название", null=True)
    images = models.FileField(upload_to='projectimages/', verbose_name=u"Картинка")
    desc = models.TextField(verbose_name='Описание', null=True)
    sort_t = models.IntegerField(verbose_name=u"Позиция", default='0', null=True, blank=True)

class ServicesPointPlan(models.Model):
    class Meta:
        verbose_name = u"План разработки"
        verbose_name_plural = u"План разработки"
        ordering = ['sort_t']

    usluga = models.ForeignKey(ServicesPoint, verbose_name='Услуга', null=True, blank=True, on_delete=models.CASCADE)  
    name = models.CharField(max_length=200, verbose_name=u"Название", null=True)
    desc = models.TextField(verbose_name='Описание', null=True)
    sort_t = models.IntegerField(verbose_name=u"Позиция", default='0', null=True, blank=True)

class ServicesPointTarif(models.Model):
    class Meta:
        verbose_name = u"Тариф"
        verbose_name_plural = u"Тариф"
        ordering = ['sort_t']

    usluga = models.ForeignKey(ServicesPoint, verbose_name='Услуга', null=True, blank=True, on_delete=models.CASCADE)  
    name = models.CharField(max_length=200, verbose_name=u"Название", null=True)
    desc = models.TextField(verbose_name='Описание', null=True)
    price = models.CharField(max_length=200, verbose_name=u"Цена", null=True)
    sort_t = models.IntegerField(verbose_name=u"Позиция", default='0', null=True)
    short_text = RichTextField(verbose_name=u"Текст", null=True, blank=True)



class ServicesAdvantages(models.Model):
    class Meta:
        verbose_name = u"Преимущества"
        verbose_name_plural = u"Преимущества"
        ordering = ['sort_t']

    
    name = models.CharField(max_length=200, verbose_name=u"Название", null=True, blank=True)
    services = models.ForeignKey(ServicesPoint, verbose_name='Проект', null=True, blank=True, on_delete=models.CASCADE)
    short_text = RichTextField(verbose_name=u"Текст", null=True, blank=True)
    sort_t = models.IntegerField(verbose_name=u"Позиция", default='0', null=True, blank=True)


temp_type = [
    (1, 'Категория'),
    (2, 'Товар')
]


class Robots(models.Model):
    class Meta:
        verbose_name = u"Robots"
        verbose_name_plural = u"Robots"

    content = models.TextField(verbose_name=u"Содержимое")

    def __str__(self):
        return self.content

class Post(Page): 
    class Meta: 
        verbose_name = u"Пост"
        verbose_name_plural = u"Посты"
        ordering = ['-og_type_pb_time']

    name = models.CharField(max_length=200, verbose_name=u"Название")
    images = models.ImageField(verbose_name=u"Картинки", null=True, blank=True)
    short_desc = RichTextField(verbose_name=u"Краткое описание", null=True, blank=True)

    def save(self, *args, **kwargs):
        if not self.alias:
            self.alias = slugify(self.name)
        super(Post, self).save(*args, **kwargs)

    def __str__(self):
        return self.name

class Project(Page):
    class Meta:
        verbose_name = u"Проекты"
        verbose_name_plural = u"Проекты"
        ordering = ['sort_t']

    name = models.CharField(max_length=200, verbose_name=u"Название")
    link = models.CharField(max_length=200, null=True, blank=True, verbose_name=u"Ссылка")
    templates = models.ManyToManyField(SiteType, blank=True, null=True, verbose_name='Какой тип сайта?')
    images = models.FileField(verbose_name=u"Картинки", null=True, blank=True)
    short_desc = RichTextField(verbose_name=u"Краткое описание", null=True, blank=True)
    video_link = models.CharField(max_length=500, null=True, blank=True, verbose_name=u"Ссылка на видео")
    osp = models.BooleanField(default=True, verbose_name=u"Основной проект")
    usulugi = models.ManyToManyField(ServicesPoint, blank=True, null=True, verbose_name='Какая услуга?')
    sort_t = models.IntegerField(
        verbose_name=u"Позиция", null=True, blank=True)

    def save(self, *args, **kwargs):
        if not self.alias:
            self.alias = slugify(self.name)
        super(Project, self).save(*args, **kwargs)

    def __str__(self):
        return self.name
    
class ProjectFAQ(models.Model):
    class Meta:
        verbose_name = u"FAQ проектов "
        verbose_name_plural = u"FAQ проектов"
        ordering = ['sort_t']

    templates = models.ForeignKey(Project, verbose_name='Проект', null=True, blank=True, on_delete=models.CASCADE)
    name = models.CharField(max_length=200, verbose_name=u"Название", null=True)
    desc = RichTextField(verbose_name='Описание', null=True)
    sort_t = models.IntegerField(verbose_name=u"Позиция", default='0', null=True, blank=True)

class ProjectSlider(models.Model):
    class Meta:
        verbose_name = u"Картинки"
        verbose_name_plural = u"Картинки"

    images = models.FileField(upload_to='projectimages/', verbose_name=u"Картинки", null=True, blank=True)
    templates = models.ForeignKey(Project, verbose_name='Проект', null=True, blank=True, on_delete=models.CASCADE)

class Partner(models.Model):
    class Meta:
        verbose_name = u"Партнеры"
        verbose_name_plural = u"Партнеры"
        ordering = ['sort_t']

    images = models.FileField(verbose_name=u"Картинки", null=True, blank=True)
    link = models.CharField(max_length=200, null=True, blank=True, verbose_name=u"Ссылка")
    name = models.CharField(max_length=200, null=True, blank=True, verbose_name=u"Название")
    sort_t = models.IntegerField(
        verbose_name=u"Позиция", null=True, blank=True)

    def __str__(self):
        return self.link

DISPLAY_ITEM = (
    (1, 'Услуги'),
    (2, 'Новость'),
    (3, 'Проекты'),
)

class TemplateItemsSeo(models.Model):
    class Meta:
        verbose_name = u"Шаблоны для сео"
        verbose_name_plural = u"Шаблоны для сео"

    title = models.CharField(max_length=200, verbose_name=u"Заголовок")
    type = models.PositiveIntegerField('Для каких страниц', default=1, choices=DISPLAY_ITEM)
    description = models.CharField(
        max_length=500, verbose_name="Meta Description", null=True, blank=True)
