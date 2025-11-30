import requests
from generator.models import telegramBot, newsProject
from apscheduler.schedulers.background import BackgroundScheduler
from apscheduler.triggers.cron import CronTrigger
from django_apscheduler.jobstores import DjangoJobStore

scheduler = None  # чтобы не плодить экземпляры

def start():
    global scheduler
    if scheduler is not None:
        return

    scheduler = BackgroundScheduler()
    scheduler.add_jobstore(DjangoJobStore(), "default")

    scheduler.add_job(
        get_subscribers,
        trigger=CronTrigger(hour=2, minute=0),  # каждый день в 02:00
        id="get_subscribers",
        replace_existing=True,
    )

    scheduler.start()

def get_subscribers():
    tg = telegramBot.objects.first()
    if not tg:
        return
    
    bot_token = tg.bot_token  # предполагаю, что у вас хранится токен в модели
    for project in newsProject.objects.all():
        url = f"https://api.telegram.org/bot{bot_token}/getChatMembersCount"
        try:
            resp = requests.get(url, params={"chat_id": project.teg}, timeout=10)
            data = resp.json()
            if data.get("ok"):
                project.follower = data["result"]
                project.save()
            else:
                print(f"Ошибка получения {project.teg}: {data}")
        except Exception as e:
            print(f"Request error for {project.teg}: {e}")
