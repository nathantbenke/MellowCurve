from django.shortcuts import render
from django.contrib.auth import authenticate, login
from django.contrib.auth.models import User
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse, HttpResponseBadRequest
from django.db import IntegrityError
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import viewsets, permissions
from .models import Sample
from .serializers import SampleSerializer
import json
import os

class SampleView(viewsets.ModelViewSet):
    serializer_class = SampleSerializer
    queryset = Sample.objects.all()
    permission_classes = [IsAuthenticated]
        
    def get_queryset(self):
        """
        Filters the queryset to only show samples of the authenticated user.
        """
        if self.request.user.is_authenticated:
            return Sample.objects.filter(user_id=self.request.user)
        return Sample.objects.none()
        

@csrf_exempt
def login_view(request):
    """
    Logs in the user with the provided credentials.
    """
    if request.method == 'POST':
        data = json.loads(request.body)
        username = data.get('username')
        password = data.get('password')
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return JsonResponse({'success': True})
        else:
            return JsonResponse({'success': False, 'message': 'Invalid username or password'})
    else:
        return HttpResponseBadRequest('Invalid request method')
        
@csrf_exempt
def create_user_view(request):
    """
    Creates a new user with the provided credentials.
    """
    if request.method == 'POST':
        data = json.loads(request.body)
        username = data.get('username')
        password = data.get('password')
        try:
            user = User.objects.create_user(username=username, password=password)
            return JsonResponse({'success': True})
        except IntegrityError:
            return JsonResponse({'success': False, 'message': 'User with that username already exists'})
    else:
        return HttpResponseBadRequest('Invalid request method')

@csrf_exempt
def add_sample_view(request):
    """
    Adds a new sample to the database with the provided data.
    """
    if request.method == 'POST':
        try:
            user = request.user
            name = request.POST['name']
            file = request.FILES['file']
            sample = Sample.objects.create(
                user=user,
                name=name,
                file=file
            )
            return JsonResponse({'success': True, 'sample': sample.id})
        except Exception as e:
            print(e)
            return JsonResponse({'success': False})

@csrf_exempt
def delete_sample_view(request, sample_id):
    """
    Deletes the sample with the provided ID if it belongs to the authenticated user.
    """
    try:
        sample = Sample.objects.get(id=sample_id)
        if sample.user == request.user:
            sample.delete()
            os.remove(sample.file.path)
            return JsonResponse({'success': True})
        else:
            return JsonResponse({'success': False, 'message': 'You do not have permission to delete this sample.'})
    except Sample.DoesNotExist:
        return JsonResponse({'success': False, 'message': 'Sample not found.'})
    except Exception as e:
        print(e)
        return JsonResponse({'success': False})
