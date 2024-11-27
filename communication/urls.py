from django.urls import path
from . import views

app_name = 'communication'

urlpatterns = [
    path('video-call/', views.video_call, name='video_call'),
    path('chat/', views.chat, name='chat'),
]
