from django.shortcuts import render

# Create your views here.
def video_call(request):
    return render(request, 'communication/video_call.html')

def chat(request):
    return render(request, 'communication/chat.html')

