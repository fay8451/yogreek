from django.contrib import admin
from .models import Product, Order, ProductOrder, Payment, Shipping

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'price', 'stock', 'category', 'created_at', 'updated_at')
    search_fields = ('name', 'category')
    list_filter = ('category',)

@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ('id', 'customer_id', 'total_price', 'order_status', 'created_at')
    search_fields = ('customer_id', 'order_status')
    list_filter = ('order_status',)

@admin.register(ProductOrder)
class ProductOrderAdmin(admin.ModelAdmin):
    list_display = ('id', 'order', 'product', 'quantity', 'unit_price')
    search_fields = ('order__id', 'product__name')

@admin.register(Payment)
class PaymentAdmin(admin.ModelAdmin):
    list_display = ('id', 'customer_id', 'order', 'payment_method', 'paid_at', 'payment_status')
    search_fields = ('customer_id', 'order__id', 'payment_status')
    list_filter = ('payment_status',)

@admin.register(Shipping)
class ShippingAdmin(admin.ModelAdmin):
    list_display = ('id', 'order', 'shipping_method', 'shipped_at', 'shipping_status')
    search_fields = ('order__id', 'shipping_status')
    list_filter = ('shipping_status',)
