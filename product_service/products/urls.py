from django.urls import path
from .views import ProductListView, ProductDetailView, ProductCategoryView

urlpatterns = [
    path('products/', ProductListView.as_view(), name='product_list'),
    path('products/<str:product_id>/', ProductDetailView.as_view(), name='product_detail'),
    path('products/categories/', ProductCategoryView.as_view(), name='product_categories'),
]