from django.db import models
from django.contrib.auth.models import User

class Message(models.Model):
    sender = models.ForeignKey(User, on_delete=models.CASCADE, related_name='sent_messages')
    recipient = models.ForeignKey(User, on_delete=models.CASCADE, related_name='received_messages')
    content = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)

class Call(models.Model):
    caller = models.ForeignKey(User, on_delete=models.CASCADE, related_name='made_calls')
    receiver = models.ForeignKey(User, on_delete=models.CASCADE, related_name='received_calls')
    call_type = models.CharField(max_length=10, choices=[('audio', 'Audio'), ('video', 'Video')])
    started_at = models.DateTimeField(auto_now_add=True)
    ended_at = models.DateTimeField(null=True, blank=True)
