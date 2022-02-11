import face_recognition
from database import init_db
from models import User, AccessTokens, Individuals, Cameras
import cv2
import numpy as np

init_db()

# # find faces in the picture
# def find_faces(image_location):
#     image = face_recognition.load_image_file(image_location)
#     face_locations = face_recognition.face_locations(image)

#     return face_locations

# # get outlines and locations of eyes, nose, mouth and chin
# def outline_facial_features(image_location):
#     image = face_recognition.load_image_file(image_location)
#     features = face_recognition.face_landmarks(image)

#     return features

# # identifying faces in the picture
# def recognise_faces(known_image_location, unknown_image_location):
#     known_image = face_recognition.load_image_file(known_image_location)
#     unknown_image = face_recognition.load_image_file(unknown_image_location)

#     known_encoding = face_recognition.face_encodings(known_image)[0]
#     unknown_encoding = face_recognition.face_encodings(unknown_image)[0]

#     results = face_recognition.compare_faces([known_encoding], unknown_encoding)

#     return results

process_this_frame = True
while True:
    cameras = Cameras.objects.all()
    print('Running')
    for item in cameras:
        print('Cam found')
        camera_name = item.name
        ip_address = item.ip_address
        username = item.username
        password = item.password

        http_link = item.ip_address + '/videofeed?username='+item.username+'&password='+item.password
        video_capture = cv2.VideoCapture(http_link)

        # Create arrays of known face encodings and their names
        known_face_encodings = []
        known_face_names = []
        known_face_ids = []

        individuals = Individuals.objects.all()
        if len(individuals) == 0:
            process_this_frame = False
        for ind in individuals:
            print('Individual Found')
            # Load a picture and recognize it.
            ind_image = face_recognition.load_image_file(ind.image)
            ind_face_encoding = face_recognition.face_encodings(ind_image)[0]

            # name
            ind_name = ind.firstname + ' ' + ind.lastname
            # id
            ind_id = str(ind.id)

            # add
            known_face_encodings.append(ind_face_encoding)
            known_face_names.append(ind_name)
            known_face_ids.append(ind_id)
        # Grab a single frame of video
        ret, frame = video_capture.read()

        # Resize frame of video to 1/4 size for faster face recognition processing
        small_frame = cv2.resize(frame, (0, 0), fx=0.25, fy=0.25)

        # Convert the image from BGR color (which OpenCV uses) to RGB color (which face_recognition uses)
        rgb_small_frame = small_frame[:, :, ::-1]
        
        if process_this_frame:
            # Find all the faces and face encodings in the current frame of video
            face_locations = face_recognition.face_locations(rgb_small_frame)
            face_encodings = face_recognition.face_encodings(rgb_small_frame, face_locations)

            face_names = []
            face_ids = []
            for face_encoding in face_encodings:
                # See if the face is a match for the known face(s)
                matches = face_recognition.compare_faces(known_face_encodings, face_encoding)
                name = "Unknown"
                id = 'Unknown'

                # # If a match was found in known_face_encodings, just use the first one.
                # if True in matches:
                #     first_match_index = matches.index(True)
                #     name = known_face_names[first_match_index]

                # Or instead, use the known face with the smallest distance to the new face
                face_distances = face_recognition.face_distance(known_face_encodings, face_encoding)
                best_match_index = np.argmin(face_distances)
                if matches[best_match_index]:
                    name = known_face_names[best_match_index]
                    id = known_face_ids[best_match_index]

                face_names.append(name)
                face_ids.append(id)

    
            for face_id in face_ids:
                match = None
                threat_level = None
                try:
                    match = Individuals.objects.filter(id=str(face_id))[0]
                    threat_level = match.threat_level
                    print([face_names])
                    print('Match found ', match.firstname, match.lastname)
                except:
                    threat_level = 'None'
                    print([face_names])

                if threat_level != 'None':
                    # send alerts
                    from telegram_messages import get_updates, send_message
                    message = """
                        Possible {} threat detected at camera {}.\nFacial features matching {}
                    """.format(threat_level, camera_name, match.firstname + match.lastname)
                    send_message(631851919, message)
        # process_this_frame = not process_this_frame