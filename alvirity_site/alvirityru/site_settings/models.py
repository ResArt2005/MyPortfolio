from __future__ import unicode_literals

import datetime

from django.contrib.auth.models import User
from django.db import models
from django.urls import reverse, reverse_lazy
from pytils.translit import slugify
from ckeditor.fields import RichTextField


class SiteType(models.Model):
    class Meta:
        verbose_name = "Тип сайта"
        verbose_name_plural = "Тип сайта"

    name = models.CharField(
        max_length=100, verbose_name='Название типа сайта', null=True, blank=True)

    def __str__(self):
        return self.name

