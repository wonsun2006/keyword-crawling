from django.urls import path
from .views import CrawlView

urlpatterns = [
    path('', CrawlView.as_view()),
]