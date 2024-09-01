import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

const Signup = (props) => {
    const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "" });
    const navigate = useNavigate(); 

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, email, password } = credentials;
        if (password !== credentials.cpassword) {
            props.showAlert("Passwords do not match", "danger");
            return;
        }
        const response = await fetch("http://localhost:5000/api/auth/createuser", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, password })
        });
        const json = await response.json();
        if (json.success) {
            // Save the auth token and redirect
            localStorage.setItem('token', json.authtoken);
            navigate("/"); // Use navigate to redirect
            props.showAlert("User created successfully", "success");
        } else {
            props.showAlert("Invalid Credentials", "danger");
        }
    };

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    return (
        <div className="container mt-4">
            <h2 className="mb-4">SIGNUP TO PASSKEY</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        placeholder="Enter your name"
                        onChange={onChange}
                        value={credentials.name}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        placeholder="Enter your email"
                        onChange={onChange}
                        value={credentials.email}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        name="password"
                        placeholder="Enter your password"
                        onChange={onChange}
                        value={credentials.password}
                        required
                        minLength={5}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="cpassword"
                        name="cpassword"
                        placeholder="Confirm your password"
                        onChange={onChange}
                        value={credentials.cpassword}
                        required
                        minLength={5}
                    />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
};

export default Signup;
