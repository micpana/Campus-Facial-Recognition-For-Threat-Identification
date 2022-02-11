from datetime import datetime
from mongoengine import Document, EmbeddedDocument
from mongoengine.fields import (
    DateTimeField, EmbeddedDocumentField,
    ListField, ReferenceField, StringField,
    ObjectIdField, IntField, BooleanField, FloatField
)

class User(Document):
    meta = {'collection': 'user'}
    firstname = StringField(required=True) 
    lastname = StringField(required=True)
    email = StringField(required=True) 
    phonenumber = IntField(required=True)
    address = StringField(required=True)
    password = StringField(required=True)
    role = StringField(required=True)
    verified = BooleanField(required=True)

class AccessTokens(Document):
    meta = {'collection': 'accesstokens'}
    user_id = StringField(required=True)
    active = BooleanField(required=True)
    signin_date = StringField(required=True)

class Individuals(Document):
    meta = {'collection': 'individuals'}
    firstname = StringField(required=True)
    lastname = StringField(required=True)
    individual_type = StringField(required=True)
    national_id_number = StringField(required=False)
    registration_number = StringField(required=False)
    degree = StringField(required=False)
    designation = StringField(required=False)
    department = StringField(required=False)
    image = StringField(required=True)
    threat_level = StringField(required=True)

class Cameras(Document):
    meta = {'collection': 'cameras'}
    name = StringField(required=True)
    ip_address = StringField(required=True)
    username = StringField(required=False)
    password = StringField(required=False)