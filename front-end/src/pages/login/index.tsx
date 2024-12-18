import React, { useState } from "react";
import { useRouter } from "next/router"; // Gebruik useRouter van Next.js

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter(); // Gebruik useRouter in plaats van useNavigate

  const validateForm = () => {
    setError("");

    if (!email.includes("@")) {
      setError("Please enter a valid email address.");
      return false;
    }

    if (password.length < 5) {
      setError("Password must be at least 8 characters long.");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const response = await fetch("http://localhost:3000/users/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });

        if (response.ok) {
          const data = await response.json();
          console.log("Login successful:", data);

          // Navigeer naar de movies-pagina
          router.push("/movies");
        } else {
          const errorData = await response.json();
          setError(errorData.message || "Login failed. Please try again.");
        }
      } catch (err) {
        setError("An error occurred while logging in.");
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-500 via-green-500 to-teal-600 p-6 animate-fade-in">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-xl transform scale-100 transition-all duration-500 hover:scale-105">
        <h2 className="text-4xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-teal-700 animate-pulse">
          Log In
        </h2>

        {error && (
          <p className="text-red-600 text-center text-sm animate-slide-down">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-teal-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 mt-1 text-teal-700 bg-teal-50 border border-teal-200 rounded-lg shadow-md focus:outline-none focus:ring-4 focus:ring-blue-400 focus:ring-opacity-50 hover:shadow-lg transition-all duration-300"
              required
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-teal-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 mt-1 text-teal-700 bg-teal-50 border border-teal-200 rounded-lg shadow-md focus:outline-none focus:ring-4 focus:ring-blue-400 focus:ring-opacity-50 hover:shadow-lg transition-all duration-300"
              required
              placeholder="Your password"
            />
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2 font-bold text-white bg-gradient-to-r from-blue-500 via-green-500 to-teal-500 rounded-lg hover:from-blue-600 hover:to-teal-600 focus:outline-none focus:ring-4 focus:ring-blue-300 shadow-lg transform hover:scale-105 transition-transform duration-300"
          >
            Log In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
