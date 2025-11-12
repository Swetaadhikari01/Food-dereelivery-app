Food Delivery App

This is a Full-Stack MERN (MongoDB, Express, React, Node.js) food delivery application that connects users and food partners.
It allows users to explore food items visually (through reels), save favorites, and manage their profiles — while food partners can upload their food items and promote them via short video “reels.


## Tech Stack

**Frontend:**
- React (Vite)
- React Router DOM
- Axios
- CSS / Tailwind (if added)
- Context API (for global state)

**Backend:**
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- bcrypt (for password hashing)
- dotenv (for environment variables)
- Multer / Cloud service (for image uploads, optional)

---

## Folder Structure

### Root
FOOD_DELIVERY_APP/
│
├── backend/ # Node + Express + MongoDB server
└── frontend/ # React (Vite) frontend application

frontend/
│
├── node_modules/              → Frontend dependencies
├── public/                    → Public static files
├── src/
│   ├── assets/                → Images, icons, etc.
│   ├── components/            → Reusable UI components
│   │   ├── BottomNav.jsx
│   │   └── ReelFeed.jsx
│   │
│   ├── pages/                 → Each screen/page in the app
│   │   ├── auth/              → Login & registration pages
│   │   │   ├── ChooseRegister.jsx
│   │   │   ├── FoodPartnerLogin.jsx
│   │   │   ├── FoodPartnerRegister.jsx
│   │   │   ├── UserLogin.jsx
│   │   │   └── UserRegister.jsx
│   │   │
│   │   ├── food-partner/      → Partner-specific pages
│   │   │   └── CreateFood.jsx
│   │   │
│   │   ├── general/           → Common pages for all users
│   │   │   ├── Home.jsx
│   │   │   └── Saved.jsx
│   │   │
│   │   └── Profile.jsx        → User profile page
│   │
│   ├── routes/                → All React Router route handling
│   │   └── AppRoutes.jsx
│   │
│   ├── styles/                → CSS files (App.css)
│   ├── App.jsx                → Main React app component
│   ├── main.jsx               → Entry point (renders App)
│   └── index.html             → HTML template
│
├── package.json               → Frontend dependencies
├── vite.config.js             → Vite build config


backend/
│
├── node_modules/              → Dependencies
├── src/
│   ├── controllers/           → Logic for handling API requests
│   │   ├── auth.controller.js
│   │   ├── food-partner.controller.js
│   │   └── food.controller.js
│   │
│   ├── db/
│   │   └── db.js              → MongoDB connection setup
│   │
│   ├── middlewares/
│   │   └── auth.middleware.js → Token verification, authentication check
│   │
│   ├── models/                → Mongoose schemas
│   │   ├── food.model.js
│   │   ├── foodPartner.model.js
│   │   ├── likes.model.js
│   │   ├── save.model.js
│   │   └── user.model.js
│   │
│   ├── routes/                → Express route definitions
│   │   ├── auth.routes.js
│   │   ├── food-partner.routes.js
│   │   └── food.routes.js
│   │
│   ├── services/              → Helper services (like file storage, external APIs)
│   │   └── storage.service.js
│   │
│   └── app.js                 → Express app setup (middleware, routes registration)
│
├── .env                       → Environment variables (DB_URI, PORT, JWT_SECRET)
├── package.json               → Node dependencies and scripts
└── server.js                  → Starts the Express server


