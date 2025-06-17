from django.contrib import admin
from .models import Trek

# Register your models here.
@admin.register(Trek)
class TrekAdmin(admin.ModelAdmin):
    list_display = ('name', 'region', 'difficulty', 'price', 'is_featured')
    list_filter = ('region', 'difficulty', 'is_featured')
    prepopulated_fields = {'slug': ('name',)}
    search_fields = ('name', 'region')