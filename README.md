# Sarvjyoti_Writes

## Project Type
**Full-Stack Blog Application**

---

## About Project

This is an individual project built in 20 days. Sarvjyoti_Writes is a blog application where:
- **Admin** can create, update, and delete posts.
- **Users** can read posts, comment, like, and edit/delete their own comments.

## Live link : 
- Server API :  https://sarvjyoti-writes-4.onrender.com
- Client : https://sarvjyoti-writes-l4iz.vercel.app/

## Live Links

- **Server API:** [https://sarvjyoti-writes-4.onrender.com](https://sarvjyoti-writes-4.onrender.com)
- **Client:** [https://sarvjyoti-writes-l4iz.vercel.app/](https://sarvjyoti-writes-l4iz.vercel.app/)

---

## Directory Structure

### Client

- `src/components/`  
  ![1](https://github.com/user-attachments/assets/e938b86c-7b03-4fe0-ad70-69879341b50c)
- `src/pages/`  
  ![2](https://github.com/user-attachments/assets/22f33791-2bc5-43bd-8127-6f968dfbfe88)
- `src/redux/`  
  ![3](https://github.com/user-attachments/assets/bb80612b-ad32-45f2-a754-fb6df94247b4)

### Server

- `api/`  
  ![4](https://github.com/user-attachments/assets/945fd024-114d-45b0-a13e-bc299575cafa)
  ![5](https://github.com/user-attachments/assets/79d4087a-bdc5-4040-bf03-0d6d674d7f97)

---

## Video Walkthrough

*Add your walkthrough video link here.*

---

## Features

### Authentication & Authorization
- Signup & Login (with Firebase)
- JWT-based authentication
- Role-based authorization (Admin, User)

### CRUD Operations

#### Post
- **Admin only:** Create, Read, Update, Delete
- Like posts
- Comment on posts

#### Comment
- **All users:** Create, Read, Edit, Delete their own comments
- Like comments

### Other Features
- Search posts
- Admin dashboard with analytics
- Responsive design

---

## Backend API

### Authentication Routes (`/api/auth`)
| Method | Endpoint         | Description         |
|--------|------------------|--------------------|
| POST   | `/signup`        | Register user      |
| POST   | `/signin`        | Login user         |
| POST   | `/google`        | Google OAuth login |

### User Routes (`/api/user`)
| Method | Endpoint                    | Description                        | Auth      |
|--------|-----------------------------|------------------------------------|-----------|
| GET    | `/test`                     | Test route                         | None      |
| PUT    | `/update/:userId`           | Update user profile                | User      |
| DELETE | `/delete/:userId`           | Delete user                        | User      |
| POST   | `/signout`                  | Sign out user                      | User      |
| GET    | `/getusers?limit=5`         | Get users (admin, paginated)       | Admin     |
| GET    | `/:userId`                  | Get single user by ID              | User/Admin|

### Post Routes (`/api/post`)
| Method | Endpoint                                   | Description                        | Auth      |
|--------|--------------------------------------------|------------------------------------|-----------|
| POST   | `/create`                                  | Create post                        | Admin     |
| GET    | `/getposts?userId=&category=&slug=&...`    | Get posts (filter, paginate)       | User/Admin|
| DELETE | `/deletepost/:postId/:userId`              | Delete post                        | Admin     |
| PUT    | `/updatepost/:postId/:userId`              | Update post                        | Admin     |

### Comment Routes (`/api/comment`)
| Method | Endpoint                            | Description                        | Auth      |
|--------|-------------------------------------|------------------------------------|-----------|
| POST   | `/create`                           | Create comment                     | User      |
| GET    | `/getcomment/:postId`               | Get comments for a post            | User      |
| PUT    | `/likecomment/:commentId`           | Like/unlike a comment              | User      |
| PUT    | `/editcomment/:commentId`           | Edit comment                       | User      |
| DELETE | `/deletecomment/:commentId`         | Delete comment                     | User      |
| GET    | `/getcomments?limit=5`              | Get all comments (admin, paginated)| Admin     |

---

## Database Models

### User Model

```js
{
  username: String, // required, unique
  email: String,    // required, unique
  password: String, // required (hashed)
  profilePicture: String, // default provided
  isAdmin: Boolean, // default: false
  createdAt: Date,
  updatedAt: Date
}
```

### Post Model

```js
{
  userId: String,      // required
  content: String,     // required
  title: String,       // required, unique
  image: String,       // default provided
  category: String,    // default: 'uncategorized'
  slug: String,        // required, unique
  createdAt: Date,
  updatedAt: Date
}
```

### Comment Model

```js
{
  content: String,      // required
  postId: String,       // required
  userId: String,       // required
  likes: Array,         // user IDs
  numberOfLikes: Number,// default: 0
  createdAt: Date,
  updatedAt: Date
}
```

---

## Installation & Getting Started

```bash
git clone https://github.com/RSarvjyoti/Sarvjyoti_Writes
```

### Frontend

```bash
cd client
npm install
npm start
```

### Backend

```bash
cd server
npm install
npm run server
```

---

## Tech Stack

- **Frontend:** React.js, Redux, Tailwind CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (Mongo Atlas)
- **Authentication:** Firebase, JWT

---

## Deployment

- **Backend:** Render
- **Frontend:** Vercel
- **Database:** MongoDB Atlas

---

## Screenshots

![signup](https://github.com/user-attachments/assets/5f9da01e-0f76-4902-b1ad-2c9ef222e05d)
![signin](https://github.com/user-attachments/assets/ae277dbf-0164-4955-86a2-daf1d045c98f)
![home](https://github.com/user-attachments/assets/6cea7600-4f91-4c86-9eed-fea0b65669e5)
![allpost](https://github.com/user-attachments/assets/a88e9b15-a055-408f-82d5-8a925d3698fb)
![post](https://github.com/user-attachments/assets/3352a19e-3722-4c5d-bb65-785b727b67bc)
![readPost](https://github.com/user-attachments/assets/2b206326-4965-4632-a455-42a448600b35)
![about](https://github.com/user-attachments/assets/1e921025-ab92-4a60-abce-bce7ecf4f450)
![dashboard](https://github.com/user-attachments/assets/d8bac1b8-fa57-4c98-8860-a458898