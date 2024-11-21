import React, { useState, useEffect } from "react";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Functie om het formulier te valideren
  const validateForm = () => {
    setError("");
    setSuccess(false);

    if (!email.includes("@")) {
      setError("Please enter a valid email address.");
      return false;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return false;
    }

    return true;
  };

  // Functie die het formulier verstuurt
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      setSuccess(true); // Als het formulier geldig is, zet 'success' op true
    }
  };

  // Zorg ervoor dat de component pas wordt gerenderd als deze gemonteerd is
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null; // Wacht tot de client geladen is om de component te renderen
  }

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
        {success && (
          <p className="text-green-600 text-center text-sm animate-slide-up">
            Login successful! Welcome back!
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-teal-700">
              Email
            </label>
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
            <label className="block text-sm font-medium text-teal-700">
              Password
            </label>
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
