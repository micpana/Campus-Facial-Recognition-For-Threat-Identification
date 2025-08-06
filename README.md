# Facial and Human Behaviour Recognition System

This project is a comprehensive system designed for **facial recognition** and **human behavior analysis**, leveraging **real-time video feeds from IP cameras**. The backend is built with **Flask** and **MongoEngine** for data persistence, while facial recognition capabilities are powered by the `face_recognition` library. The system also integrates with **Telegram** for real-time alerts on detected threats.

> ⚠️ **Note:** The behavior analysis component is currently under development and **not yet implemented**.

---

## 🌟 Features

- **User Authentication**  
  Secure signup and sign-in with password encryption.

- **Access Token Management**  
  Generates and manages access tokens for authenticated user sessions.

- **Individual Management**  
  Add, view, and manage individuals, including their facial images and threat levels.

- **Camera Management**  
  Register and manage IP cameras by providing their names, IP addresses, usernames, and passwords.

- **Real-time Facial Recognition**  
  Continuously processes video streams from registered cameras to identify known individuals.

- **Threat Level Detection**  
  Identifies individuals based on their registered threat level.

- **Telegram Notifications**  
  Sends instant alerts to a configured Telegram chat when a high-threat individual is detected.

- **Media Serving**  
  Serves static media files (e.g., individual images).

---

## 🛠️ Technologies Used

### 🔹 Backend (`backend/` folder)

- **Python 3.7.3**
- **Flask** – Micro web framework
- **MongoEngine** – ODM for MongoDB
- **MongoDB Community Edition** – NoSQL database
- **face_recognition** – Facial recognition
- **OpenCV (`cv2`)** – Video stream processing
- **NumPy** – Numerical operations
- **Passlib** – Secure password hashing
- **Requests** – For Telegram API communication
- **Werkzeug** – WSGI utility library
- **Pandas** – Data manipulation (minimally used)
- **Waitress** – Production WSGI server (optional)

### 🔹 Frontend (`client/` folder)

- **Node.js** (with npm)  
  A Node.js-based frontend is assumed (e.g., React, Angular, or Vue), typically served from `http://localhost:3000`.

---

## 🚀 Getting Started

### ✅ Prerequisites

Ensure the following are installed:

- **Python 3.7.3** (add to system path during installation)
- **Node.js** (includes npm)
- **MongoDB Community Edition**
- **MongoDB Compass** (GUI)
- **Git**
- **VS Code** (or your preferred code editor)

---

### 📦 Installation

#### 1. Clone the Repository

```bash
git clone <repository_url>
cd <project_root_folder>
```

#### 2. Install Backend Dependencies

```bash
cd backend
pip install -r requirements.txt
```

> ℹ️ Ensure a working internet connection and proper Python setup.

#### 3. Install Frontend Dependencies (if applicable)

```bash
cd client
npm install
```

---

### ▶️ Running the Application

#### 1. Start MongoDB

Ensure MongoDB server is running (via Services or `mongod` in terminal).

#### 2. Start Backend Server

```bash
cd backend
python app.py
```

Runs at `http://localhost:5000`.

#### 3. Start Facial Recognition Process

```bash
cd backend
python facial_recognition.py
```

Monitors registered cameras and performs facial recognition.

#### 4. Start Telegram Updates Listener

```bash
cd backend
python telegram_updates.py
```

Handles incoming Telegram bot messages (e.g., user account linking).

#### 5. Start Frontend Server (if applicable)

```bash
cd client
npm start
```

Opens at `http://localhost:3000` or `http://localhost:3001`.

> Make sure the backend is running before using frontend features.

---

## ⚙️ Configuration

### MongoDB Connection

Located in `backend/database.py`:

```python
connect('facial-and-human-behaviour-recognition', host='localhost', port=27017, alias='default')
```

Modify `host` and `port` as needed.

### Telegram Bot Token

Located in `backend/telegram_messages.py`:

```python
token = 'YOUR_TELEGRAM_BOT_TOKEN_HERE'
```

Replace with your actual token from [BotFather](https://t.me/botfather) on Telegram.

### Frontend URL (for CORS)

Located in `backend/app.py`:

```python
frontend_url = 'http://localhost:3000'
```

Change if your frontend is hosted elsewhere.

---

## 📂 Project Structure

```
facial-behavior-recognition/
│
├── backend/
│   ├── app.py                  # Main Flask app
│   ├── database.py             # MongoDB connection
│   ├── encrypt.py              # Password hashing functions
│   ├── facial_recognition.py   # Core real-time recognition logic
│   ├── models.py               # MongoEngine models
│   ├── requirements.txt        # Python dependencies
│   ├── telegram_messages.py    # Telegram messaging functions
│   ├── telegram_updates.py     # Telegram bot update listener
│   └── images/                 # Facial images (optional directory)
│
├── client/                     # Frontend code (assumed React/Vue/Angular)
```

---

## 🤝 Contributing

Contributions are welcome!  
Feel free to **fork the repository**, make your changes, and **submit a pull request**.

---

## 📄 License

This project is licensed under the **MIT License**.
