# Mini Project on Data Association

A full-stack web application demonstrating data association concepts using Node.js, Express, MongoDB, and EJS. This project showcases one-to-many relationships between users and posts, implementing a social media-like platform with authentication and CRUD operations.

## Features

### 🔐 User Authentication
- **User Registration**: Create new accounts with secure password hashing using bcrypt
- **User Login**: JWT-based authentication system with secure cookie storage
- **Session Management**: Protected routes using middleware to verify logged-in users
- **Logout Functionality**: Clear authentication tokens and redirect to login

### 📝 Post Management
- **Create Posts**: Users can create text-based posts from their profile
- **View Posts**: Display all posts created by the logged-in user
- **Edit Posts**: Update existing post content with a dedicated edit interface
- **Post Display**: Posts are shown in reverse chronological order (latest first)

### ❤️ Social Interactions
- **Like/Unlike System**: Toggle likes on posts with real-time count updates
- **Like Counter**: Display the number of likes each post has received
- **User-specific Likes**: Track which users liked which posts

### 🔗 Data Association
- **One-to-Many Relationship**: Each user can have multiple posts
- **Many-to-Many Relationship**: Posts can have multiple likes from different users
- **MongoDB Population**: Efficiently fetch related data using Mongoose populate
- **Object References**: Uses MongoDB ObjectId references to link users and posts

### 🎨 User Interface
- **Modern Design**: Clean, dark-themed UI built with Tailwind CSS
- **Responsive Layout**: Adapts to different screen sizes
- **User-friendly Forms**: Intuitive forms for registration, login, and post creation
- **Real-time Feedback**: Display user information and post statistics

## Technologies Used

- **Backend Framework**: Express.js (v4.21.0)
- **Template Engine**: EJS (v3.1.10)
- **Database**: MongoDB with Mongoose ODM (v8.6.3)
- **Authentication**: JSON Web Tokens (jsonwebtoken v9.0.2)
- **Password Hashing**: bcryptjs (v2.4.3)
- **Cookie Management**: cookie-parser (v1.4.6)
- **Styling**: Tailwind CSS (CDN)

## Prerequisites

Before running this project, make sure you have the following installed:

- **Node.js** (v14 or higher)
- **npm** (Node Package Manager)
- **MongoDB** (running locally on port 27017)

## Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/adithya-b-r/Mini-Project-on-Data-Association.git
   cd Mini-Project-on-Data-Association
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Ensure MongoDB is running**
   ```bash
   # Start MongoDB service (if not already running)
   # On macOS/Linux:
   sudo systemctl start mongodb
   # Or:
   mongod
   ```

4. **Start the application**
   ```bash
   node app.js
   ```

5. **Access the application**
   - Open your browser and navigate to `http://localhost:3000`

## Usage

### First Time Setup

1. **Create an Account**
   - Navigate to the home page (`http://localhost:3000`)
   - Fill in the registration form with your details:
     - Name
     - Username
     - Age
     - Email
     - Password
   - Click "Create Account"

2. **Login**
   - If you already have an account, go to `http://localhost:3000/login`
   - Enter your email and password
   - Click "Login"

### Using the Application

1. **Create Posts**
   - After logging in, you'll be redirected to your profile
   - Use the text area to write your post
   - Click "Create New Post" to publish

2. **Like/Unlike Posts**
   - Click the "Like" button on any post to like it
   - Click "Unlike" to remove your like
   - The like count updates automatically

3. **Edit Posts**
   - Click the "Edit" link on any of your posts
   - Modify the content in the text area
   - Click "Update Post" to save changes

4. **Logout**
   - Click the "Logout" button in the top-right corner

## Project Structure

```
Mini-Project-on-Data-Association/
├── app.js                  # Main application file with routes and middleware
├── models/
│   ├── user.js            # User schema and model
│   └── post.js            # Post schema and model
├── views/
│   ├── index.ejs          # Registration page
│   ├── login.ejs          # Login page
│   ├── profile.ejs        # User profile and posts page
│   └── edit.ejs           # Post editing page
├── package.json           # Project dependencies and metadata
├── package-lock.json      # Locked versions of dependencies
└── node_modules/          # Installed dependencies
```

## Database Schema

### User Schema
```javascript
{
  username: String,
  name: String,
  age: Number,
  email: String,
  password: String,  // Hashed with bcrypt
  posts: [ObjectId]  // References to Post documents
}
```

### Post Schema
```javascript
{
  user: ObjectId,     // Reference to User document
  date: Date,         // Default: Date.now
  content: String,
  likes: [ObjectId]   // References to User documents who liked
}
```

## Routes

### GET Routes
- `GET /` - Registration page
- `GET /login` - Login page
- `GET /profile` - User profile page (protected)
- `GET /logout` - Logout and clear session
- `GET /like/:id` - Toggle like on a post (protected)
- `GET /edit/:id` - Edit post page (protected)

### POST Routes
- `POST /register` - Create new user account
- `POST /login` - Authenticate user and create session
- `POST /post` - Create a new post (protected)
- `POST /update/:id` - Update existing post (protected)

## Security Features

- **Password Hashing**: All passwords are hashed using bcrypt with salt rounds before storage
- **JWT Authentication**: Secure token-based authentication system
- **Protected Routes**: Middleware prevents unauthorized access to user-specific pages
- **Cookie-based Sessions**: Tokens stored securely in HTTP cookies

## Database Connection

The application connects to MongoDB at:
```
mongodb://127.0.0.1:27017/miniproject1
```

Make sure MongoDB is running on this port before starting the application.

## License

This project is open source and available for educational purposes.
