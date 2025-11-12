Food Delivery App

A full-stack **MERN (MongoDB, Express, React, Node.js)** food delivery platform where users can register, explore food items, and order from food partners.  
Food partners can register, upload their food items, and manage profiles — all through a modern and responsive UI.

---

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

yaml
Copy code

---

### Backend Structure
backend/
│
├── src/
│ ├── controllers/ # Handles core business logic
│ │ ├── auth.controller.js
│ │ ├── food.controller.js
│ │ └── food-partner.controller.js
│ │
│ ├── db/
│ │ └── db.js # MongoDB connection setup
│ │
│ ├── middlewares/
│ │ └── auth.middleware.js
│ │
│ ├── models/ # Mongoose schemas
│ │ ├── user.model.js
│ │ ├── food.model.js
│ │ ├── foodPartner.model.js
│ │ ├── likes.model.js
│ │ └── save.model.js
│ │
│ ├── routes/ # Express routes
│ │ ├── auth.routes.js
│ │ ├── food.routes.js
│ │ └── food-partner.routes.js
│ │
│ ├── services/ # Helper utilities
│ │ └── storage.service.js
│ │
│ └── app.js # Express app setup
│
├── .env # Environment variables (DB_URI, PORT, JWT_SECRET)
├── package.json
└── server.js # App entry point


---

###  Frontend Structure
frontend/
│
├── src/
│ ├── assets/ # Images and static files
│ ├── components/ # Reusable components
│ │ ├── BottomNav.jsx
│ │ └── ReelFeed.jsx
│ │
│ ├── pages/
│ │ ├── auth/ # Login & Register pages
│ │ │ ├── ChooseRegister.jsx
│ │ │ ├── FoodPartnerLogin.jsx
│ │ │ ├── FoodPartnerRegister.jsx
│ │ │ ├── UserLogin.jsx
│ │ │ └── UserRegister.jsx
│ │ │
│ │ ├── food-partner/ # Partner dashboard pages
│ │ │ └── CreateFood.jsx
│ │ │
│ │ ├── general/ # Common pages
│ │ │ ├── Home.jsx
│ │ │ └── Saved.jsx
│ │ │
│ │ └── Profile.jsx
│ │
│ ├── routes/
│ │ └── AppRoutes.jsx # All route definitions
│ │
│ ├── styles/
│ │ └── App.css
│ │
│ ├── App.jsx # Main App component
│ ├── main.jsx # Entry point (ReactDOM render)
│ └── index.html
