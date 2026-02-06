import React from 'react';
import '../../styles/auth-shared.css';
//import axios from 'axios';
import api from "../../api/axios";
import { useNavigate } from 'react-router-dom';

const FoodPartnerLogin = () => {

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const email = e.target.email.value;
            const password = e.target.password.value;

            const res = await api.post(
                "/api/auth/food-partner/login",
                { email, password },
                { withCredentials: true }
            );

            console.log("Login Response:", res.data);

            // ✅ Check foodPartner object (not user)
            if (res.data.foodPartner && res.data.foodPartner.role === "foodPartner") {
                const partnerId = res.data.foodPartner.id; // backend sends 'id'
                navigate(`/foodpartner/profile/${partnerId}`);
            } else {
                navigate("/");
            }

        } catch (error) {
            console.error("Login error:", error.response?.data || error.message);
        }
    };


    return (
        <div className="auth-page-wrapper">
            <div className="auth-card" role="region" aria-labelledby="partner-login-title">
                <header>
                    <h1 id="partner-login-title" className="auth-title">Partner login</h1>
                    <p className="auth-subtitle">Access your dashboard and manage orders.</p>
                </header>
                <form className="auth-form" onSubmit={handleSubmit} noValidate>
                    <div className="field-group">
                        <label htmlFor="email">Email</label>
                        <input id="email" name="email" type="email" placeholder="business@example.com" autoComplete="email" />
                    </div>
                    <div className="field-group">
                        <label htmlFor="password">Password</label>
                        <input id="password" name="password" type="password" placeholder="Password" autoComplete="current-password" />
                    </div>
                    <button className="auth-submit" type="submit">Sign In</button>
                </form>
                <div className="auth-alt-action">
                    New partner? <a href="/food-partner/register">Create an account</a>
                </div>
            </div>
        </div>
    );
};

export default FoodPartnerLogin;