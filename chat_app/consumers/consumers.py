from channels.generic.websocket import AsyncWebsocketConsumer
import json

class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.room_name = self.scope['url_route']['kwargs']['room_name']
        self.room_group_name = f'chat_{self.room_name}'

        # Rejoindre le groupe
        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )
        await self.accept()

    async def disconnect(self, close_code):
        # Quitter le groupe
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )

    # Recevoir un message de WebSocket
    async def receive(self, text_data):
        data = json.loads(text_data)
        message = data['message']

        # Envoyer le message au groupe
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'chat_message',
                'message': message
            }
        )

    # Recevoir un message du groupe
    async def chat_message(self, event):
        message = event['message']

        # Envoyer le message à WebSocket
        await self.send(text_data=json.dumps({
            'message': message
        }))