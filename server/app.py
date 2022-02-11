from flask import Flask, request, send_file
from flask_cors import CORS, cross_origin
from datetime import datetime
from flask import jsonify
import requests
import json
from werkzeug.utils import secure_filename
from database import init_db
from models import User, AccessTokens, Individuals, Cameras
#
from encrypt import encrypt_password, check_encrypted_password
from pathlib import Path
#
import pandas as pandas
from pandas import read_csv
from pandas import read_excel

app = Flask(__name__)
app.debug = True

# Cross Origin Stuff
app.config['CORS_HEADERS'] = 'Content-Type'
app.config['CORS_HEADERS'] = 'Access-Control-Allow-Origin'
# app.config['CORS_RESOURCES'] = {r"/*": {"origins": "*"}}
cors = CORS(app)

# frontend links
frontend_url = 'http://localhost:3000' # development server

root = Path('.')

#USER FUNCTIONS ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
@app.route('/signup', methods=['POST'])
def signup():
    firstname = request.form['firstname']
    lastname = request.form['lastname']
    email = request.form['email']
    phonenumber = request.form['phonenumber']
    address = request.form['address']
    password = request.form['password']
    password = encrypt_password(password)

    existing_users_with_same_email = User.objects.filter(email = email)
    existing_users_with_same_phonenumber = User.objects.filter(phonenumber = phonenumber)
    if len(existing_users_with_same_email) != 0:
        return 'Email already registered'
    elif len(existing_users_with_same_phonenumber) != 0:
        return 'Phone number already registered'
    else:
        auto_admin_emails = [
            ''
            ]
        role = 'user'
        if email in auto_admin_emails:
            role = 'admin'

        user = User(
            firstname = firstname,
            lastname = lastname,
            email = email,
            phonenumber = phonenumber,
            address = address,
            password = password,
            role = role,
            verified = True
        )
        user.save()

        return 'Signup successful'

@app.route('/signin', methods=['POST'])
def signin():
    email = request.form['email']
    password = request.form['password']

    user_verified = User.objects.filter(email = email, verified=True)
    user_not_verified = User.objects.filter(email = email, verified=False)
    
    if len(user_verified) != 0:
        user_encrypted_password = user_verified[0].password
        is_password_entered_true = check_encrypted_password(password, user_encrypted_password)

        if is_password_entered_true == True:
            user_id = user_verified[0].id

            token = AccessTokens(
                user_id = str(user_id),
                active = True,
                signin_date = str(datetime.now())
            )
            token_details = token.save()
            access_token = token_details.id

            return_object = {
                'status': 'successful',
                'id': str(access_token)
            }
            return jsonify(return_object)
        else:
            return_object = {
                'status': 'failed'
            }
            return jsonify(return_object)
    else:
        if len(user_not_verified) != 0:
            user_encrypted_password = user_not_verified[0].password
            is_password_entered_true = check_encrypted_password(password, user_encrypted_password)

            if is_password_entered_true == True:
                return_object = {
                    'status': 'not verified'
                }
                return jsonify(return_object)
            else:
                return_object = {
                    'status': 'failed'
                }
                return jsonify(return_object)
        else:
            return_object = {
                'status': 'failed'
            }
            return jsonify(return_object)

@app.route('/deactivateAccessToken/<token>', methods=['GET'])
def deactivateAccessToken(token):
    try:
        AccessTokens.objects(id=token).update(active = False)
        return 'Token deactivated'
    except:
        return 'Invalid token'

@app.route('/getUserDetailsByAccessToken/<access_token>', methods=['GET'])
def getUserByAccessToken(access_token):
    try:
        user_id = AccessTokens.objects.filter(id=access_token, active = True)[0].user_id
        user_data = User.objects.filter(id=user_id)[0]
        return user_data.to_json()
    except:
        return 'Not authorized'

    return 'Unknown'


# funcs ************************************************************************************************************
@app.route('/addIndividual', methods=['POST'])
def addIndividual():
    user_id = ''
    
    try:
        user_access_token = request.form['user_access_token']
        user_id = AccessTokens.objects.filter(id = user_access_token, active = True)[0].user_id
    except:
        return 'Not authorized'

    # get image
    image = request.files['image']
    image_filename = str(datetime.now()).replace('-', '')
    image_filename = image_filename.replace(':', '')
    image_filename = image_filename.replace('.', '')
    image_filename = image_filename.replace(' ', '-')
    image_filename = secure_filename(image_filename + '-' + image.filename)
    image_path = root / 'images' / image_filename
    image.save(image_filename)

    details = Individuals(
        firstname = request.form['firstname'],
        lastname = request.form['lastname'],
        individual_type = request.form['individual_type'],
        national_id_number = request.form['national_id_number'],
        degree = request.form['degree'],
        designation = request.form['designation'],
        department = request.form['department'],
        image = image_filename,
        threat_level = request.form['threat_level']
    )
    details.save()

    return 'Successful'

@app.route('/individuals', methods=['POST'])
def individuals():
    user_id = ''
    
    try:
        user_access_token = request.form['user_access_token']
        user_id = AccessTokens.objects.filter(id = user_access_token, active = True)[0].user_id
    except:
        return 'Not authorized'

    individuals = Individuals.objects.all()

    return individuals.to_json()

@app.route('/individual', methods=['POST'])
def individual():
    user_id = ''
    
    try:
        user_access_token = request.form['user_access_token']
        user_id = AccessTokens.objects.filter(id = user_access_token, active = True)[0].user_id
    except:
        return 'Not authorized'

    individual = Individual.objects.filter(id = request.form['individual_id'])

    return individuals.to_json()

@app.route('/media/<filename>', methods=['GET', 'POST'])
def media(filename):
    filepath = filename
    
    return send_file(filepath, as_attachment=True)

@app.route('/addCamera', methods=['POST'])
def addCamera():
    user_id = ''
    
    try:
        user_access_token = request.form['user_access_token']
        user_id = AccessTokens.objects.filter(id = user_access_token, active = True)[0].user_id
    except:
        return 'Not authorized'

    details = Cameras(
        name = request.form['name'],
        ip_address = request.form['ip_address'],
        username = request.form['username'],
        password = request.form['password']
    )

    details.save()

    return 'Successful'

@app.route('/cameras', methods=['POST'])
def cameras():
    user_id = ''
    
    try:
        user_access_token = request.form['user_access_token']
        user_id = AccessTokens.objects.filter(id = user_access_token, active = True)[0].user_id
    except:
        return 'Not authorized'

    cameras = Cameras.objects.all()

    return cameras.to_json()

if __name__ == '__main__':
    init_db()
    app.run(host='0.0.0.0')
    # from waitress import serve
    # serve(app, host='0.0.0.0') # use waitress