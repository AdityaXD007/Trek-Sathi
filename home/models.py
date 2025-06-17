from django.db import models

# Create your models here.


class Trek(models.Model):
    DIFFICULTY_CHOICES = [
        ('easy', 'Easy'),
        ('moderate', 'Moderate'),
        ('challenging', 'Challenging'),
    ]
    
    name = models.CharField(max_length=200)
    slug = models.SlugField(max_length=200, unique=True, blank=True)
    short_description = models.TextField()
    description = models.TextField()
    duration = models.PositiveIntegerField(help_text="Duration in days")
    max_elevation = models.CharField(max_length=50)
    region = models.CharField(max_length=100)
    difficulty = models.CharField(max_length=20, choices=DIFFICULTY_CHOICES)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    featured_image = models.ImageField(upload_to='treks/')
    is_featured = models.BooleanField(default=False)
    featured_badge_text = models.CharField(max_length=50, blank=True)
    
    highlights = models.TextField(
        help_text="Enter each highlight on a new line",
        blank=True
    )
    def get_highlights_list(self):
        """Convert highlights text to a proper list"""
        return [hl.strip() for hl in self.highlights.split('\n') if hl.strip()]
    
    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)
        
    
    def __str__(self):
        return self.name