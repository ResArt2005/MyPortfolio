from django.db import models
from main.models import TextPage
import os
# Create your models here.


class pageTelegramNews(models.Model):
    class Meta:
        verbose_name = u"Страница генератора новостей"
        verbose_name_plural = u"Страница генератора новостей"

    page = models.ForeignKey(TextPage, null=True, on_delete=models.SET_NULL, verbose_name='Страница', related_name='generator')

class abilityNews(models.Model):
    class Meta:
        verbose_name = u"Возможности бота"
        verbose_name_plural = u"Возможности бота"
        ordering = ['sort_t']
    name = models.CharField(max_length=64, null=True, verbose_name='Заголовок')
    desc = models.CharField(max_length=256, null=True, verbose_name='Описание')
    sort_t = models.IntegerField(verbose_name=u"Позиция", null=True, blank=True)
    bg = models.CharField(max_length=256, null=True, verbose_name='Цвет фона при наведении')
    image = models.FileField(verbose_name=u"Картинка", null=True, blank=True)

    def __str__(self):
        return self.name
    
    def save(self, *args, **kwargs):

        try:
            old_file = abilityNews.objects.get(pk=self.pk).image
        except abilityNews.DoesNotExist:
            old_file = None

        super().save(*args, **kwargs)

        if old_file and old_file != self.image:
            if os.path.isfile(old_file.path):
                os.remove(old_file.path)

class whyWork(models.Model):
    class Meta:
        verbose_name = u"Как это работает"
        verbose_name_plural = u"Как это работает"
        ordering = ['sort_t']
    name = models.CharField(max_length=64, null=True, verbose_name='Заголовок')
    desc = models.CharField(max_length=256, null=True, verbose_name='Описание')
    sort_t = models.IntegerField(verbose_name=u"Позиция", null=True, blank=True)
    image = models.FileField(verbose_name=u"Картинка", null=True, blank=True)

    def __str__(self):
        return self.name
    
    def save(self, *args, **kwargs):

        try:
            old_file = abilityNews.objects.get(pk=self.pk).image
        except abilityNews.DoesNotExist:
            old_file = None

        super().save(*args, **kwargs)

        if old_file and old_file != self.image:
            if os.path.isfile(old_file.path):
                os.remove(old_file.path)

class benefit(models.Model):
    class Meta:
        verbose_name = u"Преимущества использования"
        verbose_name_plural = u"Преимущества использования"
        ordering = ['sort_t']
    name = models.CharField(max_length=64, null=True, verbose_name='Заголовок')
    desc = models.CharField(max_length=256, null=True, verbose_name='Описание')
    sort_t = models.IntegerField(verbose_name=u"Позиция", null=True, blank=True)
    image = models.FileField(verbose_name=u"Картинка", null=True, blank=True)

    def __str__(self):
        return self.name
    
    def save(self, *args, **kwargs):

        try:
            old_file = abilityNews.objects.get(pk=self.pk).image
        except abilityNews.DoesNotExist:
            old_file = None

        super().save(*args, **kwargs)

        if old_file and old_file != self.image:
            if os.path.isfile(old_file.path):
                os.remove(old_file.path)


class telegramBot(models.Model):
    class Meta:
        verbose_name = u"Телеграм бот"
        verbose_name_plural = u"Телеграм бот"
    bot_token = models.CharField(verbose_name='Бот токен', null=True, max_length=128)

class newsProject(models.Model):
    class Meta:
        verbose_name = u"Реализованные проекты"
        verbose_name_plural = u"Реализованные проекты"
        ordering = ['sort_t']
    name = models.CharField(max_length=64, null=True, verbose_name='Заголовок')
    desc = models.CharField(max_length=256, null=True, verbose_name='Описание')
    sort_t = models.IntegerField(verbose_name=u"Позиция", null=True, blank=True)
    image = models.FileField(verbose_name=u"Картинка", null=True, blank=True)
    href = models.CharField(max_length=256, null=True, verbose_name='Ссылка')
    teg = models.CharField(max_length=256, null=True, verbose_name='тег (@)')
    posts = models.CharField(max_length=256, null=True, verbose_name='Посты')
    follower = models.CharField(max_length=256, null=True, verbose_name='Подписчики')

    def __str__(self):
        return self.name
    
    def save(self, *args, **kwargs):

        try:
            old_file = abilityNews.objects.get(pk=self.pk).image
        except abilityNews.DoesNotExist:
            old_file = None

        super().save(*args, **kwargs)

        if old_file and old_file != self.image:
            if os.path.isfile(old_file.path):
                os.remove(old_file.path)