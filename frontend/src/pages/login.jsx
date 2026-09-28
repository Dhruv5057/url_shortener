import { useState } from "react";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
const handleShorten = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    if (!token) {
        console.log("User is not logged in");
        return;
    }

    try {
        const response = await fetch("http://localhost:3000/api/urls", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                originalUrl: originalUrl
            })
        });

        const data = await response.json();

        console.log("Response:", data);

    } catch (error) {
        console.log("Error:", error);
    }
};
    return (
        <div>
            <h1>Login</h1>

            <form onSubmit={handleLogin}>

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button type="submit">
                    Login
                </button>

            </form>
        </div>
    );
}

export default Login;