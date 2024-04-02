from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Sample

class SampleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sample
        fields = ('id', 'name', 'file', 'user')

