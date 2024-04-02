from django.contrib import admin
from .models import Sample

# Register your models here.
class SampleAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'file', 'user')
    
    
admin.site.register(Sample, SampleAdmin)
