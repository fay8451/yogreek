from django.urls import path
from .views import OrderListView, OrderDetailView, OrderStatusView, UserOrdersView

urlpatterns = [
    path('orders/', OrderListView.as_view(), name='order_list'),
    path('orders/<str:order_id>/', OrderDetailView.as_view(), name='order_detail'),
    path('orders/<str:order_id>/status/', OrderStatusView.as_view(), name='order_status'),
    path('orders/user/me/', UserOrdersView.as_view(), name='user_orders'),
]