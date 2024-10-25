import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Swal from "sweetalert2"; // Import SweetAlert2
import logo from '../../photos/tkLogo.jpg'; // Replace with the correct path to your logo
import video from '../../video/singPage.mp4'; 

function SignUp() {
    const { isAuthenticated, jwtToken } = useAuth();

    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [age, setAge] = useState<number | undefined>();
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const navigate = useNavigate();

    const config = {
        headers: {
            Authorization: `Bearer ${jwtToken}`
        }
    }

    // Handler functions for input fields
    const handleUserNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUserName(event.target.value);
    };

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };

    const handleAgeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAge(Number(event.target.value));
    };

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    const handleConfirmPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setConfirmPassword(value);
        if (password !== value) {
            setPasswordError("Passwords do not match");
        } else {
            setPasswordError("");
        }
    };

    // Sign up handler
    async function signUp(event: React.FormEvent) {
        const data = { username: userName, password: password };
        try {
            event.preventDefault();
            console.log(password, age, userName, email);

            const response = await axios.post("http://localhost:9002/users", data, config);
            console.log("User created:", response);

            // Show success alert
            Swal.fire({
                title: 'Success!',
                text: 'User created successfully!',
                icon: 'success',
                confirmButtonText: 'OK'
            });

            // Clear form
            setAge(undefined);
            setEmail("");
            setConfirmPassword("");
            setPassword("");
            setUserName("");
            localStorage.clear();
            navigate("/auth/login");
        } catch (error) {
            console.error("Error creating user", error);
            // Show error alert
            Swal.fire({
                title: 'Error!',
                text: 'Failed to create user. Please try again.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    }

    const videoRef = useRef<HTMLVideoElement | null>(null); // Define the ref type

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.playbackRate = 0.4; // Set playback speed to 0.4x
        }
    }, []);

    return (
        <div className="relative bg-gray-100 flex items-center justify-center min-h-screen">
            <video
                ref={videoRef} // Use ref here
                className="absolute top-0 left-0 w-full h-full object-cover z-0"
                src={video} // replace with your video path or URL
                autoPlay
                loop
                muted
                style={{ filter: 'brightness(0.9)', opacity: '0.8' }} // Darken and add transparency
            />
            <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50 z-10" />
            <div className="relative z-10 w-full max-w-md bg-stone-100 shadow-md rounded-lg p-8 bg-opacity-65">
                <h2 className="text-2xl font-bold text-center mb-6">Add Admin</h2>
                <form className="space-y-6" onSubmit={signUp}>
                    {/* Rearranged Input fields */}
                    <div className="relative z-10">
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={userName}
                            onChange={handleUserNameChange}
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                    <div className="relative z-10">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={email}
                            onChange={handleEmailChange}
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                    <div className="relative z-10">
                        <label htmlFor="age" className="block text-sm font-medium text-gray-700">Age</label>
                        <input
                            type="number"
                            id="age"
                            name="age"
                            value={age || ""}
                            onChange={handleAgeChange}
                            min="1"
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                    <div className="relative z-10">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={password}
                            onChange={handlePasswordChange}
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                    <div className="relative z-10">
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            value={confirmPassword}
                            onChange={handleConfirmPasswordChange}
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                        {passwordError && (
                            <p className="text-red-500 text-sm mt-1">{passwordError}</p>
                        )}
                    </div>
                    <button
                        type="submit"
                        disabled={passwordError !== ""}
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                    >
                        Sign Up
                    </button>
                </form>
                <p className="mt-6 text-center text-sm text-gray-600">
                    Already have an account?
                    <a
                        href="/auth/login"
                        className="text-indigo-600 hover:text-indigo-500"
                        onClick={() => {
                            localStorage.clear(); // Clear local storage
                        }}
                    >
                        Login
                    </a>
                </p>
            </div>
        </div>
    );
}

export default SignUp;
