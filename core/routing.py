from channels.auth import AuthMiddlewareStack
from channels.routing import ProtocolTypeRouter, URLRouter

import chat_app.ws_urls

application = ProtocolTypeRouter({
    'websocket': AuthMiddlewareStack(
        URLRouter(
            chat_app.ws_urls.websocket_urlpatterns
        )
    )
})

from django.urls import path
from chat_app.consumers import ChatConsumer

websocket_urlpatterns = [
    path('ws/chat/<str:room_name>/', ChatConsumer.as_asgi()),
]

