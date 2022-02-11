from mongoengine import connect
from models import User, Cameras
from datetime import datetime
from encrypt import encrypt_password, check_encrypted_password


# connect('facial-and-human-behaviour-recognition', host='mongomock://localhost', alias='default')
connect('facial-and-human-behaviour-recognition', host='localhost', port=27017, alias='default')

def init_db():
    users = User.objects.all()
    cameras = Cameras.objects.all()