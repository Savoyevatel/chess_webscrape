from django.db import models
from django.contrib.auth.models import User


class Defense(models.Model):
    name = models.CharField(max_length=100, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name


class Result(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='results', null=True, blank=True)
    defense = models.CharField(max_length=200, default='Default Defense')
    heading = models.CharField(max_length=200)
    moves = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.defense} - {self.heading}"