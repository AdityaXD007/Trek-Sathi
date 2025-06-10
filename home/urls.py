from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('popular-treks/', views.popularTreks, name='popularTreks'),
    path('treks/', views.trekDetails, name='treks'),
    path('about/', views.about, name='about'),
    path('contact/', views.contact, name='contact'),
    path('login/', views.login_view, name='login'),
    path('signup/',views.signup_view, name='signup'),
    path('logout/', views.logout_view, name='logout'),
    path('dashboard/', views.dashboard_view, name='dashboard'),
    path('forgot-password/', views.password_reset_request, name='password_reset'),
    path('forgot-password/otp/', views.password_reset_otp, name='password_reset_otp'),
    path('forgot-password/confirm/', views.password_reset_confirm, name='password_reset_confirm'),

]
