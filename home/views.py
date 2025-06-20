from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout
from django.contrib import messages
from django.contrib.auth.models import User
from django.contrib.auth.decorators import login_required
from django.core.mail import send_mail
import random
from django.conf import settings
from django.shortcuts import render, get_object_or_404
from .models import Trek
from django.db.models import Q
from django.http import JsonResponse 


# Create your views here.
def home(request):
    return render(request, 'home/index.html')

def about(request):
    return render(request, 'home/about.html')

def contact(request):
    return render(request, 'home/contact.html')

def popularTreks(request):
     # Get exactly 3 featured treks (or all if less than 3 exist)
    featured = Trek.objects.filter(is_featured=True).order_by('-id')[:3]  # Using ID for ordering
    
    # Calculate how many regular treks we need to reach 6 total
    remaining = 6 - len(featured)
    regular = Trek.objects.filter(is_featured=False).order_by('id')[:remaining]
    
    # Combine both querysets
    all_treks = list(featured) + list(regular)
    
    context = {'treks': all_treks}
    return render(request, 'home/popularTreks.html', context)

def trek_detail(request, id):
    trek = get_object_or_404(Trek, id=id)
    highlights = trek.highlights.split('\n') if trek.highlights else []

    context = {
        'trek': trek,
        'highlights': highlights,
    }
    return render(request, 'home/trek_detail.html', context)



def trek(request):
    # Get all treks initially
    treks = Trek.objects.all()
    
    # Get filter parameters from request
    difficulty = request.GET.get('difficulty')
    duration = request.GET.get('duration')
    region = request.GET.get('region')
    search_query = request.GET.get('search')
    
    # Apply filters
    if difficulty:
        treks = treks.filter(difficulty=difficulty)
    if region:
        treks = treks.filter(region__icontains=region)
    if search_query:
        treks = treks.filter(
            Q(name__icontains=search_query) |
            Q(description__icontains=search_query) |
            Q(highlights__icontains=search_query)
        )
    
    # Duration filtering
    if duration == 'short':
        treks = treks.filter(duration__lte=7)
    elif duration == 'medium':
        treks = treks.filter(duration__gt=7, duration__lte=14)
    elif duration == 'long':
        treks = treks.filter(duration__gt=14)
    
    context = {
        'treks': treks,
        'current_difficulty': difficulty or '',
        'current_duration': duration or '',
        'current_region': region or '',
        'search_query': search_query or '',
    }
    return render(request, 'home/treks.html', context)


def search_treks(request):
    query = request.GET.get('q', '').strip().lower()
    
    if query:
        treks = Trek.objects.filter(
            Q(name__icontains=query) |
            Q(region__icontains=query) |
            Q(short_description__icontains=query)
        )[:10]  # Limit to 10 results for performance
    else:
        treks = Trek.objects.none()
    
    results = [{
        'id': trek.id,
        'name': trek.name,
        'image_url': trek.featured_image.url,
        'short_description': trek.short_description,
        'url': trek.get_absolute_url()
    } for trek in treks]
    
    return JsonResponse({'treks': results})

def login_view(request):
    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']
        user = authenticate(request, username=username, password=password)
        if user:
            login(request, user)
            next_url = request.POST.get('next') or 'home'
            return redirect(next_url)
        else:
            messages.error(request, 'Invalid username or password')
    
    # Handle GET request
    next_url = request.GET.get('next', '')
    return render(request, 'home/login.html', {'next': next_url})

def signup_view(request):
    if request.method == 'POST':
        username = request.POST['username']
        email = request.POST['email']
        password1 = request.POST['password1']
        password2 = request.POST['password2']

        if password1 != password2:
            messages.error(request, 'Passwords do not match')
        elif User.objects.filter(username=username).exists():
            messages.error(request, 'Username already exists')
        elif User.objects.filter(email=email).exists():
            messages.error(request, 'Email already registered')
        else:
            user = User.objects.create_user(username=username, email=email, password=password1)
            user.is_staff = True  # ✅ Make user appear in the admin panel (only for dev/testing)
            user.save()
            login(request, user)
            return redirect('home')  # Redirect to homepage

    return render(request, 'home/signup.html')
def logout_view(request):
    logout(request)  # logs out on both GET and POST
    return redirect('home')


@login_required
def dashboard_view(request):
    return render(request, 'home/dashboard.html')



def password_reset_request(request):
    if request.method == "POST":
        email = request.POST['email']
        try:
            user = User.objects.get(email=email)
            otp = str(random.randint(100000, 999999))  # 6-digit OTP
            request.session['reset_email'] = email
            request.session['otp'] = otp
            
            send_mail(
                'Your OTP for Password Reset',
                f'Your OTP is: {otp}',
                settings.EMAIL_HOST_USER,
                [email],
                fail_silently=False
            )
            return redirect('password_reset_otp')
        except User.DoesNotExist:
            return render(request, 'reset_password/password_reset.html', {'error': 'User not found'})
    return render(request, 'reset_password/password_reset.html')

def password_reset_otp(request):
    if request.method == "POST":
        if request.POST['otp'] == request.session.get('otp'):
            return redirect('password_reset_confirm')
        return render(request, 'reset_password/password_reset_otp.html', {'error': 'Invalid OTP'})
    return render(request, 'reset_password/password_reset_otp.html')

def password_reset_confirm(request):
    if request.method == "POST":
        password = request.POST['password']
        email = request.session.get('reset_email')
        try:
            user = User.objects.get(email=email)
            user.set_password(password)
            user.save()
            request.session.flush()
            return render(request, 'reset_password/password_reset_complete.html')
        except:
            return redirect('password_reset')
    return render(request, 'reset_password/password_reset_confirm.html')
