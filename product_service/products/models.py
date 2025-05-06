from django.db import models

# Create your models here.
from mongoengine import Document, StringField, FloatField, ListField, BooleanField, DateTimeField, IntField
import datetime
import uuid

class Product(Document):
    product_id = StringField(primary_key=True, default=lambda: str(uuid.uuid4()))
    name = StringField(required=True)
    description = StringField(required=True)
    price = FloatField(required=True)
    weight = StringField(required=True)
    image = StringField(required=True)
    category = StringField(required=True)
    features = ListField(StringField())
    in_stock = BooleanField(default=True)
    stock_quantity = IntField(default=100)
    created_at = DateTimeField(default=datetime.datetime.now)
    updated_at = DateTimeField(default=datetime.datetime.now)
    
    meta = {
        'collection': 'products',
        'indexes': [
            'name',
            'category'
        ]
    }
    
    def __str__(self):
        return self.name