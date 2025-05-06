from mongoengine import Document, StringField, FloatField, ListField, EmbeddedDocument, EmbeddedDocumentField, DateTimeField
import datetime
import uuid

class OrderItem(EmbeddedDocument):
    product_id = StringField(required=True)
    name = StringField(required=True)
    price = FloatField(required=True)
    quantity = FloatField(required=True)
    image = StringField()
    weight = StringField()
    
    def __str__(self):
        return f"{self.name} x {self.quantity}"

class Order(Document):
    order_id = StringField(primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id = StringField(required=True)
    items = ListField(EmbeddedDocumentField(OrderItem))
    total_price = FloatField(required=True)
    shipping_method = StringField(required=True)
    shipping_cost = FloatField(required=True)
    payment_method = StringField(required=True)
    status = StringField(required=True, default='pending')  # pending, processing, shipped, delivered, cancelled
    shipping_address = StringField(required=True)
    city = StringField(required=True)
    postal_code = StringField(required=True)
    phone = StringField(required=True)
    email = StringField(required=True)
    created_at = DateTimeField(default=datetime.datetime.now)
    updated_at = DateTimeField(default=datetime.datetime.now)
    
    meta = {
        'collection': 'orders',
        'indexes': [
            'user_id',
            'status',
            'created_at'
        ]
    }
    
    def __str__(self):
        return f"Order {self.order_id} - {self.status}"