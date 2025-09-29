# Student Auth Portal

## Overview
The Student Auth Portal is a web application designed for students, faculty, and administrators to manage authentication and access to various resources. The application utilizes Firebase for authentication and provides a user-friendly interface for logging in and signing up.

## Features
- **Student Login**: Students can log in to access their dashboard and resources.
- **Faculty Login**: Faculty members can log in to manage their courses and student interactions.
- **Admin Login and Signup**: Administrators can log in to manage users and oversee the application.
- **Responsive Design**: The application is designed to be responsive and user-friendly on various devices.
- **Social Media Authentication**: Users can log in using their social media accounts (e.g., Google, Facebook).

## Project Structure
```
student-auth-portal
├── pages
│   ├── _app.jsx
│   ├── index.jsx
│   ├── login.jsx
│   ├── register.jsx
│   ├── student
│   │   └── login.jsx
│   ├── faculty
│   │   └── login.jsx
│   └── admin
│       ├── login.jsx
│       └── signup.jsx
├── components
│   ├── AuthForm.jsx
│   ├── AdminAuthForm.jsx
│   ├── SocialAuthButtons.jsx
│   └── Layout.jsx
├── lib
│   └── firebase.js
├── styles
│   └── globals.css
├── .env
├── package.json
├── next.config.js
└── README.md
```

## Installation
1. Clone the repository:
   ```
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```
   cd student-auth-portal
   ```
3. Install the dependencies:
   ```
   npm install
   ```
4. Set up your Firebase project and add the configuration to the `.env` file.

## Usage
- Start the development server:
  ```
  npm run dev
  ```
- Open your browser and navigate to `http://localhost:3000` to access the application.

## Contributing
Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License
This project is licensed under the MIT License. See the LICENSE file for more details.