from django.db import models
from django.contrib.auth.models import User

class Sample(models.Model):
    name = models.CharField(max_length=255)
    file = models.FileField(upload_to='uploads/')
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
