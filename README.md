### **📘 Book Management API (Node.js & MongoDB)**
A simple RESTful API for managing books and user authentication. This project is built with **Node.js**, **Express**, and **MongoDB**.

---

## **📌 Features**
- 📚 **Books API**:  
  - Get all books  
  - Get a single book  
  - Add a new book  
  - Update book details  
  - Delete a book  
- 👤 **User Authentication**:  
  - User Sign Up  
  - User Login  
  - User Logout  
- 🔐 **Secure API**: Uses **JWT authentication** and **hashed passwords**.  
- 🗄️ **Database**: MongoDB with **Mongoose ORM**.

---

## **🛠 Tech Stack**
- **Backend**: Node.js, Express.js  
- **Database**: MongoDB, Mongoose  
- **Authentication**: JWT (JSON Web Token), bcrypt for password hashing  
- **Middleware**: Express JSON parser, cookie-parser  
- **Environment Variables**: dotenv  

---

## **🚀 Getting Started**
### **1️⃣ Clone the Repository**
```bash[
git clone https://github.com/your-username/book-management-api.git
```

### **2️⃣ Install Dependencies**
```bash
npm install
```

### **3️⃣ Setup Environment Variables**
Create a `.env` file in the root directory and add the following:
```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

### **4️⃣ Start the Server**
```bash
npm run start  # Starts server with nodemon (auto-restarts on changes)
```

---

## **📌 API Endpoints**
### **🔑 Authentication Routes**
| Method | Endpoint        | Description         | Access |
|--------|---------------|---------------------|--------|
| POST   | `/api/user/signup` | Register a new user | Public |
| POST   | `/api/user/login`  | User login | Public |
| POST   | `/api/user/logout` | User logout (clears session) | Authenticated |

### **📚 Books Routes**
| Method | Endpoint        | Description | Access |
|--------|---------------|-------------|--------|
| GET    | `/api/books` | Get all books | Authenticated |
| GET    | `/api/books/:id` | Get a book by ID | Authenticated |
| POST   | `/api/books` | Add a new book | Authenticated |
| PUT    | `/api/books/:id` | Update a book by ID | Authenticated |
| DELETE | `/api/books/:id` | Delete a book by ID | Authenticated |

---

## **🔐 Authentication & Security**
- **JWT-based authentication** for user sessions.  
- **Password hashing** using bcrypt.  
- **Protected routes** for book management (only logged-in users can modify books).  

---

## **📜 License**
This project is for practice purposes. Feel free to modify and use it as needed. 😊  
