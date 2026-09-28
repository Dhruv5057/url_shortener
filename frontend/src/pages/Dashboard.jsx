import { useState } from "react";

function Dashboard() {
    const [originalUrl, setOriginalUrl] = useState("");
    const [shortUrl, setShortUrl] = useState("");

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
console.log("Status:", response.status);
console.log("Response:", data);

if (response.ok) {
    setShortUrl(`http://localhost:3000/${data.shortCode}`);
}

    } catch (error) {
        console.log("Error:", error);
    }
};
    const handleLogout = () => {
        localStorage.removeItem("token");
        window.location.href = "/login";
    };

    return (
        <div>
            <h1>URL Shortener</h1>

            <button onClick={handleLogout}>
                Logout
            </button>

            <h2>Shorten your URL</h2>

            <form onSubmit={handleShorten}>
                <input
                    type="url"
                    placeholder="Enter your long URL"
                    value={originalUrl}
                    onChange={(e) => setOriginalUrl(e.target.value)}
                    required
                />

                <button type="submit">
                    Shorten
                </button>
            </form>

            {shortUrl && (
                <div>
                    <p>Your shortened URL:</p>
                    <a href={shortUrl} target="_blank">
                        {shortUrl}
                    </a>
                </div>
            )}
        </div>
    );
}

export default Dashboard;