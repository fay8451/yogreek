from rest_framework import serializers
from .models import Product

class ProductSerializer(serializers.Serializer):
    product_id = serializers.CharField(read_only=True)
    name = serializers.CharField(required=True)
    description = serializers.CharField(required=True)
    price = serializers.FloatField(required=True)
    weight = serializers.CharField(required=True)
    image = serializers.CharField(required=True)
    category = serializers.CharField(required=True)
    features = serializers.ListField(child=serializers.CharField(), required=False)
    in_stock = serializers.BooleanField(default=True)
    stock_quantity = serializers.IntegerField(default=100)
    created_at = serializers.DateTimeField(read_only=True)
    updated_at = serializers.DateTimeField(read_only=True)
    
    def create(self, validated_data):
        product = Product(
            name=validated_data.get('name'),
            description=validated_data.get('description'),
            price=validated_data.get('price'),
            weight=validated_data.get('weight'),
            image=validated_data.get('image'),
            category=validated_data.get('category'),
            features=validated_data.get('features', []),
            in_stock=validated_data.get('in_stock', True),
            stock_quantity=validated_data.get('stock_quantity', 100)
        )
        product.save()
        return product
    
    def update(self, instance, validated_data):
        instance.name = validated_data.get('name', instance.name)
        instance.description = validated_data.get('description', instance.description)
        instance.price = validated_data.get('price', instance.price)
        instance.weight = validated_data.get('weight', instance.weight)
        instance.image = validated_data.get('image', instance.image)
        instance.category = validated_data.get('category', instance.category)
        instance.features = validated_data.get('features', instance.features)
        instance.in_stock = validated_data.get('in_stock', instance.in_stock)
        instance.stock_quantity = validated_data.get('stock_quantity', instance.stock_quantity)
        instance.updated_at = datetime.datetime.now()
        instance.save()
        return instance

class ProductListSerializer(serializers.Serializer):
    products = ProductSerializer(many=True)