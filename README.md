# VRV Security Backend Assignment

Hii everyone 😊,
I made this repository as a response to an assignment by **VRV Security** for the position of **Backend Intern**. This project is built using **Express.js**, **MongoDB** and aims to provide a secure, robust, and scalable backend solution for managing user authentication, role-based authorization, and password management.

---

## ➡️ Project Overview
This project consists of a backend API that handles various user operations such as **registering**, **logging in**, **logout** and **managing passwords.** The system implements role-based access control, ensuring that **users with different roles (like admin, moderator, or user)** can access only the data they're authorized to view. **JWT tokens** are used for user authentication, providing secure access to routes.

The application integrates **MongoDB** for data storage and utilizes **Express.js** as the web framework. Key security features include password hashing with **bcryptjs**, secure **JWT authentication**, and the use of **Helmet** for securing HTTP headers.

## ➡️ Getting Started

Follow these steps to get the server up and running on your local system:

### 1. Clone the Repository
Clone the repository using Git:

```bash
git clone https://github.com/janhvi-pandey/VRV-Security-Backend-Assignment.git
```

### 2. Navigate to the Project Directory
Move into the project folder:

```bash
cd VRV-Security-Backend-Assignment/
```

### 3. Install Dependencies
Install the necessary dependencies:

```bash
npm install express mongoose dotenv jsonwebtoken bcryptjs nodemon cors helmet
```

### 4. Set Up MongoDB

- If you're using MongoDB Atlas (cloud-based), use the following format to add your MongoDB URI in .env file:

    ```bash
    MONGO_URI='your-mongodb-uri'
    ```

- If you're using a local MongoDB setup, you can use:

    ```bash
    MONGO_URI='mongodb://localhost:27017/your-database-name'
    ```

### 5. Set Up Environment Variables
Create a .env file in the root directory and include the following:

```bash
SECRET_KEY=your-secret-key
```
> **Note:** Replace your-secret-key with a strong secret key of your choice.

### 6. Start the Server
Finally, run the server using **Nodemon**:

```bash
nodemon index.js
```

You should see this message in the console:

```
Server is running on 3000
MongoDB Connection Successful 😊
```

This means the server is up and ready to go! 👍

---

## ➡️ Testing the API Endpoints

You can test the API endpoints using tools like Postman, Thunder Client (VS Code Extension), or cURL.
I have used Thunder Client for testing.

### Authentication: Register, Login and Logout

#### 1. Register

- **Endpoint**: `/auth/register`
- **Method**: POST
- **Request Body**:

```json
{
  "name": "Janhvi Pandey",
  "email": "shivipandey993@gmail.com",
  "password": "shivi23",
  "role": "admin"  // Valid Roles (admin, moderator and user)
}
```
> **Note**: All fields are required, and the **role** must be one of `admin`, `moderator`, or `user`.

#### 2. Login

- **Endpoint**: `/auth/login`
- **Method**: POST
- **Request Body**:

```json
{
  "email": "your-email@example.com",
  "password": "your-password"
}
```

> **Note**: All fields are required.

Once you successfully register or login, you will receive a **JWT token**. This token contains user information, including their role.

#### 3. Logout

- **Endpoint**: `/auth/logout`
- **Method**: POST
- **Request Header**:

```json
{
  "token": "your-jwt-token-here"
}

```
> The logout endpoint ensures that the user is logged out, and their session is terminated.

---

###  Get User Details Based on Role

- **Endpoint**: `/getdetails/:role-details`
- **Method**: GET
- **Request Header**:

```json
{
  "token": "your-jwt-token-here"
}

```
>Replace :role with the role of the user (admin, moderator, user). This route returns details of the user if their role matches the requested role in the URL.

---

### Change User Password

- **Endpoint**: `/passchange/change-password`
- **Method**: POST
- **Request Header**:

```json
{
  "token": "your-jwt-token-here"
}

```
- **Request Body**:

```json
{
  "oldPassword": "old-password",
  "newPassword": "new-password"
}
```

>This route allows users to change their password. You must include the token (JWT) in the header for authentication, and the old and new passwords must be provided in the body.

---

## ➡️ Contact Information

If you encounter any issues or need further clarification, feel free to contact me at:

- Email: [shivipandey993@gmail.com](mailto:shivipandey993@gmail.com)
- Phone: +91 6307976482

---

### ➡️ Thank You

Thank you for checking out my project! I hope this guide helps you to successfully run the backend and interact with the API. If you have any questions or need further assistance, feel free to reach out. Your feedback and suggestions are always appreciated.