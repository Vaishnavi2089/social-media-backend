# 🚀 Social Media Backend API

A production-ready **RESTful Backend API** for a modern social media platform built with **Node.js**, **Express.js**, and **MongoDB**. This backend provides secure authentication, media management, user interactions, analytics, and scalable API architecture following industry best practices.

Designed with a modular architecture, JWT authentication, MongoDB Aggregation Pipelines, Cloudinary integration, and centralized error handling, making it suitable for real-world applications.

---

## 🌟 Features

### 🔐 Authentication & Authorization
- User Registration
- User Login
- Secure Logout
- JWT Authentication
- Refresh Token Rotation
- Password Hashing using bcrypt
- Change Password
- Refresh Access Token
- HTTP-only Cookie Authentication

### 👤 User Management
- Get Current User
- Update Account Details
- Update Avatar
- Update Cover Image
- User Channel Profile
- Watch History
- User Dashboard

### 🎥 Video Management
- Upload Videos
- Update Video Details
- Delete Videos
- Publish / Unpublish Videos
- Fetch Single Video
- Fetch All Videos
- Video Search
- Pagination
- Sorting
- Filtering

### ❤️ Likes
- Like / Unlike Videos
- Like / Unlike Tweets
- Like / Unlike Comments
- Get Liked Videos

### 💬 Comments
- Add Comment
- Update Comment
- Delete Comment
- Get Video Comments
- Pagination Support

### 📝 Tweets
- Create Tweet
- Update Tweet
- Delete Tweet
- Fetch User Tweets

### 📂 Playlists
- Create Playlist
- Update Playlist
- Delete Playlist
- Add Video to Playlist
- Remove Video from Playlist
- Get Playlist Details

### 📺 Subscriptions
- Subscribe Channel
- Unsubscribe Channel
- Get Subscribers
- Get Subscribed Channels

### 📊 Dashboard & Analytics
- Channel Statistics
- Total Videos
- Total Views
- Total Subscribers
- Total Likes
- MongoDB Aggregation Pipelines

### 🩺 Health Check
- Server Status Endpoint
- API Availability Monitoring
- Uptime Verification

### ☁️ Cloud Storage
- Cloudinary Integration
- Avatar Upload
- Cover Image Upload
- Video Upload
- Automatic File Management

### ⚡ Additional Features
- MongoDB Aggregation Pipelines
- Pagination
- Filtering
- Sorting
- Search
- Async Error Handling
- Standardized API Responses
- Modular Architecture

---

# 🛠 Tech Stack

| Category | Technologies |
|-----------|-------------|
| Runtime | Node.js |
| Framework | Express.js |
| Database | MongoDB |
| ODM | Mongoose |
| Authentication | JWT |
| Password Encryption | bcrypt |
| File Upload | Multer |
| Cloud Storage | Cloudinary |
| Cookies | cookie-parser |
| CORS | cors |
| Environment Variables | dotenv |

---

# 📁 Project Structure

```
src/
│
├── controllers/
├── models/
├── routes/
├── middlewares/
├── db/
├── utils/
├── constants/
├── app.js
├── index.js
│
public/
│
.env
package.json
README.md
```

---

# 🏗 System Architecture

The project architecture, database schema, and API relationships are documented below.

📌 **Architecture Diagram**

https://app.eraser.io/workspace/YtPqZ1VogxGy1jzIDkzj?origin=share

---

# 🔐 Authentication Flow

```text
User Register
      │
      ▼
Login
      │
      ▼
Generate Access Token
Generate Refresh Token
      │
      ▼
Refresh Token Stored in Database
      │
      ▼
Protected Routes
      │
      ▼
Access Token Expires
      │
      ▼
Refresh Token API
      │
      ▼
New Access Token Generated
```

---

# 📦 Installation

Clone the repository

```bash
git clone https://github.com/your-username/social-media-backend.git
```

Move into the project

```bash
cd social-media-backend
```

Install dependencies

```bash
npm install
```

---

# ⚙️ Environment Variables

Create a `.env` file inside the root directory.

```env
PORT=8000

MONGODB_URI=<your_mongodb_connection_string>

ACCESS_TOKEN_SECRET=<your_access_token_secret>
ACCESS_TOKEN_EXPIRY=1d

REFRESH_TOKEN_SECRET=<your_refresh_token_secret>
REFRESH_TOKEN_EXPIRY=10d

CLOUDINARY_CLOUD_NAME=<your_cloud_name>
CLOUDINARY_API_KEY=<your_api_key>
CLOUDINARY_API_SECRET=<your_api_secret>

CORS_ORIGIN=<your_frontend_url>
```

---

# ▶️ Running the Project

Development

```bash
npm run dev
```

Production

```bash
npm start
```

---

# 📌 API Modules

## 🔐 Authentication

- Register
- Login
- Logout
- Refresh Token
- Change Password

---

## 👤 Users

- Get Current User
- Update Profile
- Update Avatar
- Update Cover Image
- Watch History
- Channel Profile

---

## 🎥 Videos

- Upload Video
- Update Video
- Delete Video
- Publish Video
- Toggle Publish Status
- Get Video
- Get All Videos

---

## ❤️ Likes

- Toggle Video Like
- Toggle Tweet Like
- Toggle Comment Like
- Get Liked Videos

---

## 💬 Comments

- Add Comment
- Update Comment
- Delete Comment
- Get Video Comments

---

## 📝 Tweets

- Create Tweet
- Update Tweet
- Delete Tweet
- Get User Tweets

---

## 📂 Playlists

- Create Playlist
- Update Playlist
- Delete Playlist
- Add Video
- Remove Video
- Get Playlist

---

## 📺 Subscriptions

- Subscribe
- Unsubscribe
- Subscriber List
- Subscribed Channels

---

## 📊 Dashboard

- Channel Analytics
- Total Videos
- Total Views
- Total Likes
- Total Subscribers

---

## 🩺 Health Check

- Server Status
- API Availability

---

# 🗄 Database Collections

- Users
- Videos
- Comments
- Likes
- Tweets
- Playlists
- Subscriptions

---

# 📈 Database Relationships

```text
User
 ├── Videos
 ├── Tweets
 ├── Comments
 ├── Likes
 ├── Playlists
 └── Subscriptions

Video
 ├── Owner
 ├── Comments
 └── Likes

Playlist
 ├── Owner
 └── Videos

Subscription
 ├── Subscriber
 └── Channel
```

---

# 🔒 Security

- JWT Authentication
- Refresh Token Rotation
- Password Hashing (bcrypt)
- HTTP-only Cookies
- Protected Routes
- Input Validation
- Environment Variables
- Centralized Error Handling

---

# 🚀 Performance Optimizations

- MongoDB Aggregation Pipelines
- Pagination
- Database Indexing
- Query Projection
- Modular Folder Structure
- Async Error Wrapper
- Standardized API Responses

---

# ☁️ Cloudinary Integration

Media uploads are managed using Cloudinary.

Supported uploads:

- User Avatar
- Cover Image
- Videos

---

# 🧪 API Testing

All endpoints were tested using **Postman** to ensure correct request validation, authentication flow, and response handling.

---

# 📌 Future Improvements

- Real-time Chat (Socket.io)
- Notifications
- Email Verification
- OTP Authentication
- Two-Factor Authentication (2FA)
- Bookmark System
- Follow Recommendations
- Trending Feed
- Admin Dashboard
- Swagger/OpenAPI Documentation
- Docker Support
- CI/CD Pipeline
- Unit & Integration Testing
- Rate Limiting
- Redis Caching

---

# 🤝 Contributing

Contributions are welcome.

1. Fork the repository

2. Create your feature branch

```bash
git checkout -b feature/your-feature
```

3. Commit your changes

```bash
git commit -m "feat: add your feature"
```

4. Push the branch

```bash
git push origin feature/your-feature
```

5. Open a Pull Request

---

# 📄 License

This project is licensed under the **MIT License**.

---

# 👩‍💻 Author

**Vaishnavi Gupta**

B.Tech – Artificial Intelligence & Data Science

---

## ⭐ Support

If you found this project useful, please consider giving it a ⭐ on GitHub. It helps others discover the project and motivates future development.
