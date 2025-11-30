from django.conf.urls import url, include
from django.contrib import admin
from django.urls import path, re_path
from django.conf.urls import handler404, handler500
from . import views
from django.contrib.sitemaps.views import sitemap

app_name = 'main'

handler404 = views.page_404



urlpatterns = [
    url(r'contacts/', views.contacts, name='contacts'),
    url(r'team/', views.team, name='team'),
    url(r'order/', views.order, name='order'),
    url(r'politic/', views.politic, name='politic'),
    url(r'^$', views.index, name='index'),
    url(r'avr/', views.avr, name='avr'),
    path('uslugi/<alias>/', views.uslugi2, name='uslugi2'),
    url(r'uslugi/', views.uslugi, name='uslugi'),
    path('proekty/<alias>/', views.proekt, name='proekt'),
    url(r'proekty/', views.proekty, name='proektys'),
    url(r'send-home-form/', views.sendHomeForm, name='sendHomeForm'),
    url(r'send-form/', views.sendForm, name='sendForm'),
    url(r'send-studio-form/', views.sendStudioForm, name='sendStudioForm'),
    url(r'index/', views.index_home, name='index'),
    url(r'studio/', views.studio, name='studio'),
    path('blog/<alias>/', views.post, name='post'),
    path('blog/', views.blog, name='blog'),
    url(r'^sitemap.xml$', views.sitemap_xml, name='sitemap_xml'),
    path('robots.txt', views.robots),
    path('<alias>/', views.textpage, name='post'),
    url(r'service_page1/', views.service_page1, name='service_page1'),
    url(r'service_page2/', views.service_page2, name='service_page2'),
]
