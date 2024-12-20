# urls.py
from django.urls import path
from .views import UserSignUpAPIView, UserSignInAPIView, UserProfileAPIView

urlpatterns = [
    path('auth/signup/', UserSignUpAPIView.as_view(), name='user-signup'),
    path('auth/signin/', UserSignInAPIView.as_view(), name='user-signin'),
    path('auth/profile/', UserProfileAPIView.as_view(), name='user-profile'),
]
