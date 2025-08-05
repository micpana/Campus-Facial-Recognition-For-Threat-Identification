Facial and Human Behaviour Recognition System

This project is a comprehensive system designed for facial recognition and human behavior analysis, leveraging real-time video feeds from IP cameras. The backend is built with Flask and MongoEngine for data persistence, while the facial recognition capabilities are powered by the face_recognition library. The system also integrates with Telegram for real-time alerts on detected threats.

Note: The behavior analysis component of this system is currently under development and not yet implemented.
🌟 Features

    User Authentication: Secure signup and sign-in with password encryption.

    Access Token Management: Generates and manages access tokens for authenticated user sessions.

    Individual Management: Add, view, and manage individuals, including their facial images and threat levels.

    Camera Management: Register and manage IP cameras by providing their names, IP addresses, usernames, and passwords.

    Real-time Facial Recognition: Continuously processes video streams from registered cameras to identify known individuals.

    Threat Level Detection: Identifies individuals based on their registered threat level.

    Telegram Notifications: Sends instant alerts to a configured Telegram chat when a high-threat individual is detected.

    Media Serving: Serves static media files (e.g., individual images).

🛠️ Technologies Used
Backend (located in the backend folder)

    Python 3.7.3: The core programming language.

    Flask: A micro web framework for Python, used for building the API.

    MongoEngine: An Object-Document Mapper (ODM) for working with MongoDB.

    MongoDB Community: A NoSQL database for storing application data.

    face_recognition: A powerful Python library for face recognition tasks.

    OpenCV (cv2): Used for video stream processing.

    NumPy: Essential for numerical operations, especially with image data.

    Passlib: For secure password hashing and verification.

    Requests: For making HTTP requests (e.g., to the Telegram API).

    Werkzeug: A comprehensive WSGI utility library for Python.

    Pandas: For data manipulation and analysis (though its direct use in the provided app.py is minimal, it's listed in requirements.txt).

    Waitress: A production-quality pure-Python WSGI server (optional, for deployment).

Frontend (located in the client folder)

    Node.js: Includes npm, required for frontend dependencies.

    It's assumed a Node.js based frontend (likely React, Angular, or Vue) is part of this project, running on localhost:3000.

🚀 Getting Started
Prerequisites

Ensure you have the following tools installed on your machine:

    Python 3.7.3: During installation, make sure the "Add to path variables" checkbox is ticked.

    Node.js: Includes npm, required for frontend dependencies.

    MongoDB Community: The database server.

    MongoDB Compass: A GUI for MongoDB, useful for managing your database.

    Git: For version control.

    VS Code: A recommended code editor.

Installation
1. Clone the Repository

git clone <repository_url>
cd <project_root_folder>

2. Install Backend Dependencies

Navigate to the backend folder in your terminal and run the following command to install the Python dependencies:

cd backend
pip install -r requirements.txt

Note: This process requires a working internet connection and a proper Python installation.
3. Install Frontend Dependencies (if applicable)

If your project includes a frontend, navigate to the client folder in your terminal and install its dependencies:

cd client
npm install

Note: This process requires a working internet connection and Node.js installed.
Running the Application
1. Start MongoDB

Ensure your MongoDB Community server is running. You can typically start it from your system's services or by running mongod in your terminal.
2. Start the Backend Server

From the backend folder, run the app.py file:

cd backend
python app.py

The backend server will typically run on http://0.0.0.0:5000 (or localhost:5000).

Note: This will only work if the backend's dependencies and MongoDB were installed successfully.
3. Start the Facial Recognition Process

In a separate terminal, from the backend folder, run the facial_recognition.py script:

cd backend
python facial_recognition.py

This script will continuously monitor the registered cameras and perform facial recognition.
4. Start the Telegram Updates Listener

In another separate terminal, from the backend folder, run the telegram_updates.py script:

cd backend
python telegram_updates.py

This script will listen for incoming messages on your configured Telegram bot and process them (e.g., linking user accounts).
5. Start the Frontend Server (if applicable)

If your project includes a frontend, navigate to the client folder in your terminal and start the development server:

cd client
npm start

When the server is up and running, you should be able to access it in your browser, usually at http://localhost:3000 or http://localhost:3001 if port 3000 is taken.

Note: This will only work if the frontend's dependencies were installed successfully. Ensure the backend server is running to use the frontend functions.
⚙️ Configuration
Database Connection

The MongoDB connection is configured in backend/database.py:

connect('facial-and-human-behaviour-recognition', host='localhost', port=27017, alias='default')

You can modify host and port if your MongoDB instance is running elsewhere.
Telegram Bot Token

The Telegram bot token is configured in backend/telegram_messages.py:

token = 'YOUR_TELEGRAM_BOT_TOKEN_HERE' # Replace with your actual token

Replace '1788963824:AAHM2vdZCpLQ5mqEmLXHj22jovo7SM1Vukg' with your actual Telegram bot token. You can obtain a bot token by talking to BotFather on Telegram.
Frontend URL

The frontend URL is specified in backend/app.py for CORS configuration:

frontend_url = 'http://localhost:3000' # development server

Adjust this if your frontend is hosted on a different URL or port.
📂 Project Structure

    backend/: Contains all backend Python code.

        app.py: The main Flask application, defining API routes for user management, individual management, camera management, and media serving.

        database.py: Handles the MongoDB connection and database initialization.

        encrypt.py: Provides functions for password encryption and verification using passlib.

        facial_recognition.py: Contains the core logic for real-time facial recognition using face_recognition and OpenCV, processing camera feeds and sending alerts.

        models.py: Defines the MongoDB document schemas for User, AccessTokens, Individuals, and Cameras using MongoEngine.

        requirements.txt: Lists all Python dependencies required for the backend.

        telegram_messages.py: Contains functions for sending messages and getting updates from the Telegram Bot API.

        telegram_updates.py: A script that continuously checks for new messages from the Telegram bot and processes them, primarily for linking user accounts.

        images/: (Implicit) A directory where individual facial images are stored.

    client/: (Assumed) Contains all frontend code.

🤝 Contributing

Contributions are welcome! Please feel free to fork the repository, make your changes, and submit a pull request.
📄 License

This project is licensed under the MIT License.