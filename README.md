Realtime Chat App Tutorial - React.js & Socket.io (Initial Progress)
This README outlines the setup and core concepts covered in the tutorial's initial phase for building a realtime chat application.

 Technologies Used
Frontend (Initial Setup)
React.js
Vite
Tailwind CSS
Daisy UI
Backend
Node.js
Express.js
MongoDB
Mongoose
Socket.io
dotenv (for environment variables)
jsonwebtoken (for authentication)
bcrypt.js (for password hashing)
nodemon (for development restarts)
🛠️ Project Structure & Setup
The project is divided into frontend (React app) and backend (Node.js/Express API) folders.

Backend Setup Summary:
Node.js project initialization.
Installation of various dependencies (Express, Mongoose, JWT, Bcrypt, etc.) and development tools like Nodemon.
Configuration for ES module syntax in package.json.
Setup of environment variables in a .env file (MongoDB URI, Port, JWT Secret).
Organized folder structure for controllers, routes, models, and utilities.
Database connection established using Mongoose.
Express middleware added to parse JSON request bodies.

 
 Authentication Flow
The initial authentication focuses on user signup:

User Model: A schema is defined for users, including email, full name, password, and profile picture.
Signup Process:
An endpoint handles user signup requests.
Input fields are validated (e.g., password length).
It checks if the email is already registered.
Passwords are securely hashed using bcrypt.js before saving.
A JSON Web Token (JWT) is generated for the new user.
This JWT is sent back to the client in an HTTP-only cookie, providing secure authentication.
Testing: Postman is used to test the signup endpoint and verify user creation and cookie generation.
