import axios from "axios";
import { useEffect, useRef, useState } from "react";

import { useNavigate } from "react-router-dom";
import homePageVideo from "../video/homePage.mp4";
import tkLogo from "../photos/tkLogo.jpg";
import { useAuth } from "../context/AuthContext";

function Login() {
    const { login } = useAuth();
    const videoRef = useRef<HTMLVideoElement>(null);
    const navigate = useNavigate();

    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string>("");


    async function submit(event: any) {
        event.preventDefault();

        if (username === "" || password === "") {
            setError("Username and password are required");
            return;
        }

        const data = {
            username: username,
            password: password,
        };

        try {
            const response = await axios.post("http://localhost:9002/auth/login", data);
            login(response.data);
            localStorage.setItem("username", username);
            navigate("/");
        } catch (error) {
            setError("There was an error logging in");
        }
    }

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.playbackRate = 0.5;
        }
    }, []);

    return (
        <div className="relative min-h-screen flex items-center justify-center">
            {/* Video Background */}
            <video
                ref={videoRef}
                className="absolute top-0 left-0 w-full h-full object-cover -z-20"
                src={homePageVideo}
                autoPlay
                loop
                muted
            />
            {/* Transparent Dark Overlay */}
            <div
                className="absolute top-0 left-0 w-full h-full -z-10"
                style={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }}
            ></div>

            <div className="p-10 flex items-center justify-center min-h-screen">
            <div className="max-w-[400px] p-8 shadow-xl rounded-lg bg-white bg-opacity-65 relative">
            {/* Logo */}
                    <div className="flex justify-center mb-8">
                        <img src={tkLogo} alt="Logo" className="w-24 h-24 rounded-full" />
                    </div>

                    <div className="text-center mb-5">
                        <h1 className="text-2xl font-semibold">Login</h1>
                    </div>

                    <form onSubmit={submit} >
                        <div className="mb-4">
                            <label className="block mb-1">Username</label>
                            <input
                                type="text"
                                onChange={(event) => {
                                    setUsername(event.target.value);
                                    setError("");
                                }}
                                className="block w-full p-2 border border-gray-200 rounded-lg"
                                placeholder="Enter your username"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block mb-1">Password</label>
                            <input
                                type="password"
                                onChange={(event) => {
                                    setPassword(event.target.value);
                                    setError("");
                                }}
                                className="block w-full p-2 border border-gray-200 rounded-lg"
                                placeholder="Enter your password"
                            />
                        </div>

                        {error && <div className="text-sm text-red-500">{error}</div>}

                        <div className="mt-8">
                            <button  type="submit" className="bg-gray-800 text-white px-4 py-2 rounded-lg w-full hover:bg-gray-900">
                                Login
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;
