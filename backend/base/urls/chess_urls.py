from django.urls import path
from base.views import chess_views as views


urlpatterns = [
    path('', views.getRoutes, name='routes'),
    path('scrape/', views.scrape_defense, name='scrape-defense'),
    path('save-result/', views.save_result, name='save-result'),
    path('saved-results/', views.get_saved_results, name='saved-results'),
    
]

