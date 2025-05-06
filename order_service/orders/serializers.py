from rest_framework import serializers
from .models import Order, OrderItem
import datetime

class OrderItemSerializer(serializers.Serializer):
    product_id = serializers.CharField(required=True)
    name = serializers.CharField(required=True)
    price = serializers.FloatField(required=True)
    quantity = serializers.FloatField(required=True)
    image = serializers.CharField(required=False, allow_blank=True)
    weight = serializers.CharField(required=False, allow_blank=True)

class OrderSerializer(serializers.Serializer):
    order_id = serializers.CharField(read_only=True)
    user_id = serializers.CharField(required=True)
    items = OrderItemSerializer(many=True, required=True)
    total_price = serializers.FloatField(required=True)
    shipping_method = serializers.CharField(required=True)
    shipping_cost = serializers.FloatField(required=True)
    payment_method = serializers.CharField(required=True)
    status = serializers.CharField(required=False, default='pending')
    shipping_address = serializers.CharField(required=True)
    city = serializers.CharField(required=True)
    postal_code = serializers.CharField(required=True)
    phone = serializers.CharField(required=True)
    email = serializers.CharField(required=True)
    created_at = serializers.DateTimeField(read_only=True)
    updated_at = serializers.DateTimeField(read_only=True)
    
    def create(self, validated_data):
        items_data = validated_data.pop('items')
        order_items = []
        
        for item_data in items_data:
            order_item = OrderItem(
                product_id=item_data.get('product_id'),
                name=item_data.get('name'),
                price=item_data.get('price'),
                quantity=item_data.get('quantity'),
                image=item_data.get('image', ''),
                weight=item_data.get('weight', '')
            )
            order_items.append(order_item)
        
        order = Order(
            user_id=validated_data.get('user_id'),
            items=order_items,
            total_price=validated_data.get('total_price'),
            shipping_method=validated_data.get('shipping_method'),
            shipping_cost=validated_data.get('shipping_cost'),
            payment_method=validated_data.get('payment_method'),
            status=validated_data.get('status', 'pending'),
            shipping_address=validated_data.get('shipping_address'),
            city=validated_data.get('city'),
            postal_code=validated_data.get('postal_code'),
            phone=validated_data.get('phone'),
            email=validated_data.get('email')
        )
        order.save()
        return order
    
    def update(self, instance, validated_data):
        instance.status = validated_data.get('status', instance.status)
        instance.updated_at = datetime.datetime.now()
        instance.save()
        return instance

class OrderListSerializer(serializers.Serializer):
    orders = OrderSerializer(many=True)