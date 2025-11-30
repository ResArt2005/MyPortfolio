from django.http import HttpResponse
from django.shortcuts import get_object_or_404
from django.shortcuts import redirect
from django.template import loader, Template, Context
from django.core.paginator import Paginator
from django.template.context_processors import csrf
from .models import *
from site_settings.models import *
from telega.views import *
from telega.models import *
from django.http import JsonResponse
from django.db.models import Q
from generator.models import *

def default_context(request):
    """ Default template context. """
    csrf_token = dict(csrf(request))
    menu_top = list(TextPage.objects.filter(menushow=True))
    settings = Settings.objects.last()
    context_object = {"c": csrf_token,
                      'header_additional': settings.header_additional,
                      'favicon': settings.favicon,
                      'ver':settings.ver,
                      'metrics_yandex': settings.metrics_yandex,
                      'metrics_google': settings.metrics_google,
                      'phone': settings.phone,
                      'address': settings.address,
                      'robots': settings.robots,
                      'og_url': request.get_full_path(),
                      'year': datetime.datetime.now().year,
                      "menu_top": menu_top}
    return context_object

def sitemap_xml(request):
    template = loader.get_template('sitemap_xml.html')

    host = 'https://{}/'.format(request.get_host())

    context = {
        'host': host,
        'pages_index': TextPage.objects.get(alias='index'),
        'pages': TextPage.objects.exclude(alias='index').all(),
        'post': Post.objects.all(),
        'project':Project.objects.all(),
        'uslugi':ServicesPoint.objects.all()
    }

    return HttpResponse(template.render(context), content_type='application/xhtml+xml')

def render_textpage(request, alias, object, custom=None, check_services= None):
    default_context_d = default_context(request)
    host = request.get_host()
        
    if host.endswith('.ru'):
        d = 'https://alvirity.com' + request.path
    elif host.endswith('.com'):
        d = 'https://alvirity.ru'+ request.path
    else:
        d = 'https://alvirity.com'+ request.path
    # Caution: If there's no specified object, it returns 404
    textpage_data = get_object_or_404(object, alias=alias)
    textpage_context = {"data": textpage_data, "alias": alias, 'lang': d, 'name_lang':request.LANGUAGE_CODE  }
    if object==TextPage and textpage_data.generator.all().count()>0:
        custom = 'generator'
        textpage_context['ability'] = abilityNews.objects.all()
        textpage_context['whyWork'] = whyWork.objects.all()
        textpage_context['benefit'] = benefit.objects.all()
        textpage_context['project'] = newsProject.objects.all()
    if textpage_data.canonical:
        canonical = textpage_data.canonical
    else:
        canonical = '{}{}'.format(request.get_host(), request.path)
    canonical_obj = {'canonical': canonical}
    context = dict(default_context_d, **canonical_obj)
    context = dict(context, **textpage_context)
    try:
        if custom:
            template = loader.get_template("{}.html".format(custom))
        else:
            if check_services and textpage_data.is_service:
                canonical_obj = {
                    'servicesp': ServicesPoint.objects.filter(templates__id=textpage_data.id),
                    'pr': Project.objects.filter(usulugi__templates__id=textpage_data.id).distinct(),
                    "FAQ":ServicesPointFAQList.objects.filter(usluga__id=textpage_data.id)
                }
                context = dict(context, **canonical_obj)
                if textpage_data.hash_type == 1:
                    template = loader.get_template("services.html")
                elif textpage_data.hash_type == 2:
                    template = loader.get_template("services2.html")
            else:
                template = loader.get_template("{}.html".format(alias))
        return context, template
    except Exception:
        template = loader.get_template("default.html")
        return context, template

def page_404(request, exception=None):
    return redirect('/404.html')
'''----------------------------------------------------'''
def service_page1(request):
    textpage_data, template = render_textpage(request, "service_page1", TextPage)
    return HttpResponse(
        template.render({
            **textpage_data,
            'pr': Project.objects.all(),
            'ss': 'service_page1'
        }))
def service_page2(request):
    textpage_data, template = render_textpage(request, "service_page2", TextPage)
    return HttpResponse(
        template.render({
            **textpage_data,
            'pr': Project.objects.all(),
            'ss': 'service_page2'
        }))
""" -------------------------------------------------- """
def order(request):
  textpage_data, template = render_textpage(request, "order", TextPage)
  return HttpResponse(
        template.render({
            **textpage_data,
            'ss': 'order'
        }))

def team(request):
  textpage_data, template = render_textpage(request, "team", TextPage)
  return HttpResponse(
        template.render({
            **textpage_data,
            'ts': Team.objects.all(),
            'ss': 'team'
        }))

def contacts(request):
  textpage_data, template = render_textpage(request, "contacts", TextPage)
  return HttpResponse(
        template.render({
            **textpage_data,
            'ss': 'contacts'
        }))
'''----------------------------------------------------'''
def index(request):
    textpage_data, template = render_textpage(request, "index", TextPage)
    return HttpResponse(
        template.render({
            **textpage_data,
            'ts': Team.objects.all(),
            'pr': Project.objects.all(),
            'part': Partner.objects.all(),
            'services': TextPage.objects.filter(is_service=True)[:6],
            'ss': 'index'
        }))

def textpage(request, alias):
    textpage_data, template = render_textpage(request, alias, TextPage, False,True)
    return HttpResponse(
        template.render({
            **textpage_data,
            'ss': alias
        }))

def uslugi(request):
    textpage_data, template = render_textpage(request, "uslugi", TextPage)
    return HttpResponse(
        template.render({
            **textpage_data,
            'ts': Team.objects.all(),
            'services': TextPage.objects.filter(is_service=True),
            'ss': 'uslugi'
        }))

def proekty(request):
    textpage_data, template = render_textpage(request, "proekty", TextPage)
    type_filter = list()
    projects = Project.objects.all().order_by('-id')
    type_s = None
    search_pr = None
    checkboxgoogle = None
    if request.POST.get('checkboxgoogle'):
        projects = projects.filter(osp=True)
        checkboxgoogle = True
    if request.POST.get('search-pr') and not request.POST.get('search-pr') == '':
        search_pr = request.POST.get('search-pr')
        projects = projects.filter(Q(name__icontains=search_pr) | Q(content__icontains=search_pr))
    if request.POST.get('type_s'):
        type_s = list()
        for ts in request.POST.getlist('type_s'):
            type_s.append(int(ts))
        projects = projects.filter(templates__in=type_s)
        pid = list()
        for ps in projects:
            if not ps.id in pid:
                pid.append(ps.id)
        projects = Project.objects.filter(pk__in=pid)
    return HttpResponse(
        template.render({
            **textpage_data,
            'pr': projects,
            'ss': 'proekty',
            'checkboxgoogle': checkboxgoogle,
            'type_s': type_s,
            'search_pr': search_pr,
            'dtr': SiteType.objects.filter(
                    Q(project__isnull=False)
                ).distinct()
        }))



def studio(request):
    textpage_data, template = render_textpage(request, "studio", TextPage)
    template = loader.get_template("studio/index.html")
    return HttpResponse(
        template.render({
            **textpage_data,
            'ts': Team.objects.all(),
            'ss': 'studio'
        }))

def avr(request):
    textpage_data, template = render_textpage(request, "avr", TextPage)
    template = loader.get_template("avr/index.html")
    return HttpResponse(
        template.render({
            **textpage_data,
            'ts': Team.objects.all(),
            'ss': 'avr'
        }))

def politic(request):
    q = Settings.objects.first()
    result = {'status':'ok', "result":q.politic}
    return JsonResponse(result)

def sendForm(request):
    result = {'status': 'error'}
    try:
        text = '_________________________________________________\n' \
               '{nameform} (Обратная связь). \n ' \
               '🙎 ‍Имя: {name}\n 📞 Номер телефона: {phone}\n 📧 Email: {email}\n Сообщение: {message}\n_________________________________________________'.format(
            phone=request.POST['phone'],
            nameform = request.POST['nameform'],
            name=request.POST['name'],
            email=request.POST['email'],
            message=request.POST['message']
        )
        result = send_message(text, 'main')
    except:
        pass
    return JsonResponse(result)

def sendHomeForm(request):
    result = {'status': 'error'}
    try:
        text = '_________________________________________________\n' \
               'Главная (Обратная связь). \n ' \
               '🙎 ‍Имя: {name}\n 📞 Номер телефона: {phone}\n 📧 Email: {email}\n Сообщение: {message}\n_________________________________________________'.format(
            phone=request.POST['phone'],
            name=request.POST['name'],
            email=request.POST['email'],
            message=request.POST['message']
        )
        result = send_message(text, 'main')
    except:
        pass
    return JsonResponse(result)

def sendStudioForm(request):
    result = {'status': 'error'}
    try:
        text = '_________________________________________________\n' \
               'Студия (Бесплатная консультация). \n ' \
               '🙎 ‍Имя: {name}\n 📞 Номер телефона: {phone}\n 📧 Email: {email}\n _________________________________________________'.format(
            phone=request.POST['phone'],
            name=request.POST['name'],
            email=request.POST['email'],
        )
        result = send_message(text, 'main')
    except:
        pass
    return JsonResponse(result)

def index_home(request):
    return redirect('/')

def robots(request):
    template = loader.get_template('robots.txt')
    context = Robots.objects.last()
    data = {'context': context.content}
    return HttpResponse(template.render(data), content_type="text/plain")

def blog(request):
    textpage_data, template = render_textpage(request, "blog", TextPage)
    items = Post.objects.all()
    limit_item = 20
    paginator = Paginator(items, limit_item)
    page_number = request.GET.get('page')
    page_obj = paginator.get_page(page_number)
    return HttpResponse(
        template.render({
            **textpage_data,
            'blog': True,
            'post': page_obj,
            'page_obj': page_obj
        }))

def post(request, alias):
    textpage_data, template = render_textpage(request, alias, Post, "post")
    title_dop = Template(TemplateItemsSeo.objects.filter(type=2).first().title).render(Context(
        {'name': textpage_data['data'].name, 'h1': textpage_data['data'].seo_h1}))
    desc_dop = Template(TemplateItemsSeo.objects.filter(type=2).first().description).render(Context(
        {'name': textpage_data['data'].name, 'h1': textpage_data['data'].seo_h1}))
    return HttpResponse(
        template.render({
            **textpage_data,
            'url': 'blog',
            'templated_title': title_dop,
            'templated_description': desc_dop,
            'post': True
        }))

def proekt(request, alias):
    textpage_data, template = render_textpage(request, alias, Project, "proekt")
    title_dop = Template(TemplateItemsSeo.objects.filter(type=3).first().title).render(Context(
        {'name': textpage_data['data'].name, 'h1': textpage_data['data'].seo_h1}))
    desc_dop = Template(TemplateItemsSeo.objects.filter(type=3).first().description).render(Context(
        {'name': textpage_data['data'].name, 'h1': textpage_data['data'].seo_h1}))
    return HttpResponse(
        template.render({
            **textpage_data,
            'url': 'proekty',
            'templated_title': title_dop,
            'templated_description': desc_dop,
            'images': ProjectSlider.objects.filter(templates__alias=alias),
            'FAQ': ProjectFAQ.objects.filter(templates__alias=alias),
            'project': True
        }))

def uslugi2(request, alias):
    textpage_data, template = render_textpage(request, alias, ServicesPoint, "Servicepage")
    title_dop = Template(TemplateItemsSeo.objects.filter(type=1).first().title).render(Context(
        {'name': textpage_data['data'].name, 'h1': textpage_data['data'].seo_h1 }))
    desc_dop = Template(TemplateItemsSeo.objects.filter(type=1).first().description).render(Context(
        {'name':textpage_data['data'].name, 'h1': textpage_data['data'].seo_h1}))
    textpage_data['data'].name
    if request.POST:
        try:
            text = '_________________________________________________\n' \
                '{page}. \n ' \
                '🙎 ‍Имя: {name}\n 📞 Номер телефона: {phone}\n 📧 Email: {email}\n _________________________________________________'.format(
                page = textpage_data['data'].name,
                phone=request.POST['phone'],
                name=request.POST['name'],
                email=request.POST['email'],
            )
            result = send_message(text, 'main')
        except:
            pass
    return HttpResponse(
        template.render({
            **textpage_data,
            'url': 'uslugi',
            'templated_title': title_dop,
            'templated_description': desc_dop,
            'adv': ServicesAdvantages.objects.filter(services__alias=alias),
            'slid': ServicesPointSlide.objects.filter(usluga__alias=alias),
            'FAQ':ServicesPointFAQ.objects.filter(usluga__alias=alias),
            'plan': ServicesPointPlan.objects.filter(usluga__alias=alias),
            'tarif': ServicesPointTarif.objects.filter(usluga__alias=alias),
            'pr':  Project.objects.filter(usulugi=textpage_data['data']),
            'team': Team.objects.all(),
        }))