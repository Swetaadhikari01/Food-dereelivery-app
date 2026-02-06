import React from "react";
import { Routes, Route } from "react-router-dom";

import Landing from "../pages/general/Landing";
import ChooseRegister from "../pages/auth/ChooseRegister";
import UserRegister from "../pages/auth/UserRegister";
import UserLogin from "../pages/auth/UserLogin";
import FoodPartnerRegister from "../pages/auth/FoodPartnerRegister";
import FoodPartnerLogin from "../pages/auth/FoodPartnerLogin";
import Home from "../pages/general/Home";
import Saved from "../pages/general/Saved";
import CreateFood from "../pages/food-partner/CreateFood";
import Profile from "../pages/food-partner/Profile";
import Orders from "../pages/general/Orders";
import BottomNav from "../components/BottomNav";
import Cart from "../pages/cart/Cart";
import Checkout from "../pages/cart/Checkout";

import Layout from "../components/Layout"; // ✅ FIXED PATH

const AppRoutes = () => {
  return (
    <Routes>

      {/* Pages WITHOUT navbar (auth/landing) */}
      <Route path="/" element={<Landing />} />
      <Route path="/register" element={<ChooseRegister />} />
      <Route path="/user/register" element={<UserRegister />} />
      <Route path="/user/login" element={<UserLogin />} />
      <Route path="/food-partner/register" element={<FoodPartnerRegister />} />
      <Route path="/food-partner/login" element={<FoodPartnerLogin />} />

      {/* 🔥 Pages WITH Navbar */}
      <Route element={<Layout />}>

        <Route path="/home" element={<><Home /><BottomNav /></>} />
        <Route path="/saved" element={<><Saved /><BottomNav /></>} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/create-food" element={<CreateFood />} />
        <Route path="/food-partner/:id" element={<Profile />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/foodpartner/profile/:id" element={<Profile />} />
      </Route>

      {/* 404 */}
      <Route path="*" element={<h1>Page Not Found</h1>} />

    </Routes>
  );
};

export default AppRoutes;
