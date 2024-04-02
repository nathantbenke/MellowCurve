"""backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from django.conf.urls.static import static
from django.conf import settings
from rest_framework import routers
from rest_framework.authtoken.views import obtain_auth_token
from mellowcurve_backend import views


router = routers.DefaultRouter()
router.register(r'samples', views.SampleView, 'sample')

# /samples/ - returns a list of all the Sample items. CREATE and READ operations can be performed here.
# /samples/file_name - returns a single Sample item using the file_name primary key. UPDATE and DELETE operations can be performed here.

# file_name as primary key is temporary and shouldn't matter too much

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('accounts/login/', views.login_view, name='login'),
    path('create-user/', views.create_user_view, name='create-user'),
    path('add-sample/', views.add_sample_view, name='add_sample'),
    path('delete-sample/<int:sample_id>/', views.delete_sample_view, name='delete_sample'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
