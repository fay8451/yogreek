from django.db import models

# Create your models here.
from mongoengine import Document, StringField, EmailField, BooleanField, DateTimeField
import datetime
import uuid

class User(Document):
    user_id = StringField(primary_key=True, default=lambda: str(uuid.uuid4()))
    username = StringField(required=True, unique=True)
    email = EmailField(required=True, unique=True)
    password = StringField(required=True)
    first_name = StringField(max_length=50)
    last_name = StringField(max_length=50)
    is_active = BooleanField(default=True)
    is_staff = BooleanField(default=False)
    is_admin = BooleanField(default=False)
    date_joined = DateTimeField(default=datetime.datetime.now)
    
    meta = {
        'collection': 'users',
        'indexes': [
            'username',
            'email'
        ]
    }
    
    def __str__(self):
        return self.username