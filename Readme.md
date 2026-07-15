<div align="center">

# 🚀 Social Media Backend API

A scalable, production-inspired **RESTful Backend API** for a modern social media platform built using **Node.js**, **Express.js**, and **MongoDB**.

Designed with industry-standard backend practices including **JWT Authentication**, **Refresh Token Rotation**, **Cloudinary Media Management**, **MongoDB Aggregation Pipelines**, and a clean **MVC Architecture**.

<p align="center">

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Mongoose](https://img.shields.io/badge/Mongoose-880000?style=for-the-badge)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens)
![Cloudinary](https://img.shields.io/badge/Cloudinary-3448C5?style=for-the-badge&logo=cloudinary)

</p>

<p align="center">

![License](https://img.shields.io/badge/License-MIT-blue?style=flat-square)
![PRs Welcome](https://img.shields.io/badge/PRs-Welcome-brightgreen?style=flat-square)
![Made with Love](https://img.shields.io/badge/Made%20With-❤️-red?style=flat-square)

</p>

</div>

---

# 📑 Table of Contents

- [Overview](#-overview)
- [Project Highlights](#-project-highlights)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [System Architecture](#-system-architecture)
- [Authentication Flow](#-authentication-flow)
- [Installation](#-installation)
- [Environment Variables](#-environment-variables)
- [Running the Project](#-running-the-project)
- [API Modules](#-api-modules)
- [Database Design](#-database-design)
- [Security](#-security)
- [Performance Optimizations](#-performance-optimizations)
- [API Testing](#-api-testing)
- [Future Improvements](#-future-improvements)
- [Contributing](#-contributing)
- [License](#-license)
- [Author](#-author)

---

# 📖 Overview

This project is a **production-inspired backend** for a modern social media platform inspired by applications such as **YouTube** and **Twitter**.

It demonstrates scalable backend engineering concepts including:

- RESTful API Design
- JWT Authentication
- Refresh Token Rotation
- Cookie-based Authentication
- Cloudinary Media Uploads
- MongoDB Aggregation Pipelines
- MVC Architecture
- Standardized API Responses
- Centralized Error Handling

The project is designed to showcase backend development best practices and real-world API design using the MERN ecosystem.

---

# 🌟 Project Highlights

- 🔐 Secure JWT Authentication
- 🔄 Refresh Token Rotation
- ☁️ Cloudinary Media Storage
- 📊 MongoDB Aggregation Pipelines
- 🎥 Video Management System
- ❤️ Like System
- 💬 Comment System
- 📂 Playlist Management
- 📺 Subscription System
- 📈 Dashboard Analytics
- 🛡️ HTTP-only Cookie Authentication
- 📦 Modular MVC Architecture

---

# ✨ Features

## 🔐 Authentication

- User Registration
- User Login
- Secure Logout
- JWT Authentication
- Refresh Token Rotation
- Password Hashing using bcrypt
- HTTP-only Cookie Authentication
- Change Password
- Refresh Access Token

---

## 👤 User Management

- Get Current User
- Update Account Details
- Update Avatar
- Update Cover Image
- Watch History
- User Channel Profile

---

## 🎥 Video Management

- Upload Videos
- Update Videos
- Delete Videos
- Publish / Unpublish Videos
- Search Videos
- Pagination
- Filtering
- Sorting

---

## ❤️ Likes

- Like / Unlike Videos
- Like / Unlike Comments
- Like / Unlike Tweets
- Get Liked Videos

---

## 💬 Comments

- Create Comment
- Update Comment
- Delete Comment
- Get Video Comments

---

## 📝 Tweets

- Create Tweet
- Update Tweet
- Delete Tweet
- Fetch User Tweets

---

## 📂 Playlists

- Create Playlist
- Update Playlist
- Delete Playlist
- Add Videos
- Remove Videos

---

## 📺 Subscriptions

- Subscribe Channels
- Unsubscribe Channels
- Get Subscribers
- Get Subscribed Channels

---

## 📊 Dashboard

- Channel Statistics
- Total Videos
- Total Views
- Total Subscribers
- Total Likes

---

## 🩺 Health Check

- API Status
- Server Health
- Uptime Verification

---

# 🛠 Tech Stack

| Category | Technology |
|-----------|------------|
| Runtime | Node.js |
| Framework | Express.js |
| Database | MongoDB |
| ODM | Mongoose |
| Authentication | JWT |
| Encryption | bcrypt |
| File Upload | Multer |
| Cloud Storage | Cloudinary |
| Cookies | cookie-parser |
| CORS | cors |
| Environment | dotenv |

---

# 📂 Project Structure

```text
src
│
├── controllers
├── models
├── routes
├── middlewares
├── db
├── utils
├── constants
│
├── app.js
└── index.js

public

.env.example

package.json

README.md
```

---

# 🏗 System Architecture

The application follows a modular **MVC (Model–View–Controller)** architecture to ensure scalability, maintainability, and separation of concerns.

```text
                Client
                   │
                   ▼
             Express Router
                   │
                   ▼
              Controllers
                   │
                   ▼
              Business Logic
                   │
                   ▼
              MongoDB Atlas
                   │
          ┌────────┴────────┐
          ▼                 ▼
     Cloudinary        JWT Authentication
```

> 📌 **Architecture Diagram**
>
> Replace the placeholder below with your exported Eraser diagram:
>
> ```md
> ![Architecture](assets/architecture.png)
> ```
>
> Interactive Diagram:
>
> https://app.eraser.io/workspace/YtPqZ1VogxGy1jzIDkzj?origin=share

---
# 🔐 Authentication Flow

The authentication system is based on **JWT Access Tokens** and **Refresh Tokens**.

```text
                User Login
                    │
                    ▼
        Generate Access Token
        Generate Refresh Token
                    │
                    ▼
     Refresh Token Stored in Database
                    │
                    ▼
         Protected API Requests
                    │
                    ▼
        Access Token Expires
                    │
                    ▼
        Refresh Token Endpoint
                    │
                    ▼
        New Access Token Generated
```

### Authentication Features

- JWT Access Token
- Refresh Token Rotation
- HTTP-only Cookies
- Password Hashing using bcrypt
- Protected Routes Middleware
- Secure Logout
- Refresh Access Token API

---

# 🚀 Installation

## Clone Repository

```bash
git clone https://github.com/<your-username>/social-media-backend.git
```

Move into the project

```bash
cd social-media-backend
```

---

## Install Dependencies

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
CLOUDINARY_API_KEY=<your_cloudinary_api_key>
CLOUDINARY_API_SECRET=<your_cloudinary_api_secret>

CORS_ORIGIN=http://localhost:5173
```

---

# ▶️ Running the Project

### Development

```bash
npm run dev
```

### Production

```bash
npm start
```

---

# 📬 API Modules

## 🔐 Authentication

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | `/users/register` | Register User |
| POST | `/users/login` | Login User |
| POST | `/users/logout` | Logout User |
| POST | `/users/refresh-token` | Generate New Access Token |
| POST | `/users/change-password` | Change Password |

---

## 👤 Users

| Method | Endpoint |
|---------|----------|
| GET | `/users/current-user` |
| PATCH | `/users/update-account` |
| PATCH | `/users/avatar` |
| PATCH | `/users/cover-image` |
| GET | `/users/history` |
| GET | `/users/c/:username` |

---

## 🎥 Videos

| Method | Endpoint |
|---------|----------|
| POST | `/videos` |
| GET | `/videos` |
| GET | `/videos/:videoId` |
| PATCH | `/videos/:videoId` |
| DELETE | `/videos/:videoId` |
| PATCH | `/videos/toggle/publish/:videoId` |

---

## 💬 Comments

| Method | Endpoint |
|---------|----------|
| POST | `/comments/:videoId` |
| GET | `/comments/:videoId` |
| PATCH | `/comments/c/:commentId` |
| DELETE | `/comments/c/:commentId` |

---

## ❤️ Likes

| Method | Endpoint |
|---------|----------|
| POST | `/likes/toggle/v/:videoId` |
| POST | `/likes/toggle/c/:commentId` |
| POST | `/likes/toggle/t/:tweetId` |
| GET | `/likes/videos` |

---

## 📝 Tweets

| Method | Endpoint |
|---------|----------|
| POST | `/tweets` |
| GET | `/tweets/user/:userId` |
| PATCH | `/tweets/:tweetId` |
| DELETE | `/tweets/:tweetId` |

---

## 📂 Playlists

| Method | Endpoint |
|---------|----------|
| POST | `/playlists` |
| GET | `/playlists/:playlistId` |
| GET | `/playlists/user/:userId` |
| PATCH | `/playlists/:playlistId` |
| PATCH | `/playlists/add/:videoId/:playlistId` |
| DELETE | `/playlists/remove/:videoId/:playlistId` |
| DELETE | `/playlists/:playlistId` |

---

## 📺 Subscriptions

| Method | Endpoint |
|---------|----------|
| POST | `/subscriptions/c/:channelId` |
| GET | `/subscriptions/c/:channelId` |
| GET | `/subscriptions/u/:subscriberId` |

---

## 📊 Dashboard

| Method | Endpoint |
|---------|----------|
| GET | `/dashboard/stats` |
| GET | `/dashboard/videos` |

---

## 🩺 Health Check

| Method | Endpoint |
|---------|----------|
| GET | `/healthcheck` |

---

# 🗄 Database Collections

The application uses the following MongoDB collections:

```text
Users
Videos
Comments
Likes
Tweets
Playlists
Subscriptions
```

---

# 🔗 Database Relationships

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

This backend follows several security best practices.

### Authentication

- JWT Authentication
- Refresh Token Rotation
- HTTP-only Cookies
- Protected Routes

### Data Protection

- Password Hashing using bcrypt
- Environment Variables
- Input Validation
- Authentication Middleware

### Error Handling

- Async Error Wrapper
- Standardized API Responses
- Custom Error Classes
- Centralized Error Middleware

---

# ⚡ Performance Optimizations

The project includes several optimizations for scalability.

- MongoDB Aggregation Pipelines
- Query Projection
- Database Indexing
- Pagination
- Sorting
- Filtering
- Search
- Modular MVC Architecture
- Cloudinary Media Storage
- Async Handler Wrapper

---
# 🧪 API Testing

All endpoints were manually tested using **Postman** throughout development to ensure correct request validation, authentication flow, database interactions, and standardized API responses.

### Base URL

```http
http://localhost:8000/api/v1
```

### API Modules Tested

- ✅ Authentication
- ✅ Users
- ✅ Videos
- ✅ Comments
- ✅ Likes
- ✅ Tweets
- ✅ Playlists
- ✅ Subscriptions
- ✅ Dashboard
- ✅ Health Check

---

# 📄 Sample API Response

All API responses follow a standardized structure.

```json
{
    "statusCode": 200,
    "data": {
        "user": {
            "_id": "686ea0b0f7751f52a9bcdc03",
            "username": "vaishnavigupta",
            "email": "vaishnavi@example.com"
        }
    },
    "message": "User fetched successfully",
    "success": true
}
```

---

# 🚀 Deployment

The application can be deployed on any Node.js-supported hosting platform.

Examples include:

- Render
- Railway
- DigitalOcean
- AWS EC2
- Azure App Service
- Google Cloud Run

Before deployment, configure:

- MongoDB Atlas
- Cloudinary Credentials
- Environment Variables
- CORS Origin
- JWT Secrets

---

# 📈 Future Improvements

The following enhancements are planned for future versions.

### Authentication

- Email Verification
- OTP Authentication
- Two-Factor Authentication (2FA)

### Features

- Real-time Chat (Socket.io)
- Notifications
- Bookmark System
- Saved Videos
- Follow Recommendations
- Trending Feed

### Backend

- Swagger / OpenAPI Documentation
- Docker Support
- Redis Caching
- Rate Limiting
- API Versioning
- Unit Testing
- Integration Testing
- CI/CD Pipeline

---

# 💡 What I Learned

Developing this project provided practical experience with backend engineering concepts, including:

- Designing scalable RESTful APIs
- Building secure authentication systems using JWT
- Implementing Refresh Token Rotation
- Managing file uploads with Cloudinary
- Writing MongoDB Aggregation Pipelines
- Designing relational data models with MongoDB
- Structuring large Express applications using MVC architecture
- Handling asynchronous operations and centralized error management

---

# 📌 Project Statistics

| Metric | Count |
|---------|------:|
| REST APIs | 40+ |
| Controllers | 10+ |
| MongoDB Collections | 7 |
| Authentication System | JWT + Refresh Tokens |
| Cloud Storage | Cloudinary |
| Aggregation Pipelines | Yes |
| Media Uploads | Images & Videos |

---

# 🤝 Contributing

Contributions are welcome.

If you would like to contribute:

1. Fork the repository

2. Create a feature branch

```bash
git checkout -b feature/amazing-feature
```

3. Commit your changes

```bash
git commit -m "feat: add amazing feature"
```

4. Push to GitHub

```bash
git push origin feature/amazing-feature
```

5. Open a Pull Request

---

# 📝 Coding Standards

This project follows consistent coding practices:

- Modular MVC Architecture
- RESTful API Design
- Standardized API Responses
- Async/Await
- Centralized Error Handling
- Environment-based Configuration
- Meaningful Commit Messages

---

# 📄 License

This project is licensed under the **MIT License**.

Feel free to use, modify, and distribute it for educational or personal purposes.

---

# 👩‍💻 Author

### Vaishnavi Gupta

**B.Tech – Artificial Intelligence & Data Science**

Passionate about Backend Development, Scalable Systems, and Full Stack Engineering.

### Connect with me

- GitHub: https://github.com/<your-github-username>
- LinkedIn: https://linkedin.com/in/<your-linkedin-profile>

---

# 🙏 Acknowledgements

This project was built as part of my backend development journey to strengthen my understanding of scalable API design, authentication, database modeling, and production-ready backend architecture.

Special thanks to the open-source community and the creators of the amazing tools and libraries that made this project possible.

---

<div align="center">

## ⭐ Support

If you found this project helpful, please consider giving it a **⭐ Star** on GitHub.

It motivates me to build more open-source projects and helps others discover this repository.

**Thank you for visiting! 🚀**

</div>

