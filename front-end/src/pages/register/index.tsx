import React, { useState, useEffect } from "react";

const Register: React.FC = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Functie om te controleren of de gebruikersnaam of email uniek is
  const isUnique = (field: string, value: string): boolean => {
    return value !== "existingUser" && value !== "existingEmail@example.com";
  };

  // Functie om het formulier te valideren
  const validateForm = () => {
    setError("");
    setSuccess(false);

    if (!isUnique("username", username)) {
      setError("Username is already taken.");
      return false;
    }

    if (!isUnique("email", email)) {
      setError("Email is already in use.");
      return false;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return false;
    }

    if (!agreeToTerms) {
      setError("You must agree to the terms and conditions.");
      return false;
    }

    return true;
  };

  // Functie die het formulier verstuurt
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Voorkom dat de pagina opnieuw laadt bij het versturen

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
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-500 via-pink-500 to-indigo-600 p-6 animate-fade-in">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-xl transform scale-100 transition-all duration-500 hover:scale-105">
        <h2 className="text-4xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-700 to-indigo-700 animate-pulse">
          Create Account
        </h2>

        {error && (
          <p className="text-red-600 text-center text-sm animate-slide-down">
            {error}
          </p>
        )}
        {success && (
          <p className="text-green-600 text-center text-sm animate-slide-up">
            Your account has been created successfully!
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-indigo-700">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 mt-1 text-indigo-700 bg-indigo-50 border border-indigo-200 rounded-lg shadow-md focus:outline-none focus:ring-4 focus:ring-purple-400 focus:ring-opacity-50 hover:shadow-lg transition-all duration-300"
              required
              placeholder="Enter a unique username"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-indigo-700">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 mt-1 text-indigo-700 bg-indigo-50 border border-indigo-200 rounded-lg shadow-md focus:outline-none focus:ring-4 focus:ring-purple-400 focus:ring-opacity-50 hover:shadow-lg transition-all duration-300"
              required
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-indigo-700">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 mt-1 text-indigo-700 bg-indigo-50 border border-indigo-200 rounded-lg shadow-md focus:outline-none focus:ring-4 focus:ring-purple-400 focus:ring-opacity-50 hover:shadow-lg transition-all duration-300"
              required
              placeholder="At least 8 characters"
            />
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              checked={agreeToTerms}
              onChange={(e) => setAgreeToTerms(e.target.checked)}
              className="w-4 h-4 text-purple-500 border-gray-300 rounded focus:ring-purple-500"
            />
            <label className="ml-2 text-sm text-indigo-700">
              I agree to the{" "}
              <a
                href="/terms"
                className="text-purple-500 underline hover:text-purple-700"
              >
                terms and conditions
              </a>
              .
            </label>
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2 font-bold text-white bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 rounded-lg hover:from-purple-600 hover:to-indigo-600 focus:outline-none focus:ring-4 focus:ring-purple-300 shadow-lg transform hover:scale-105 transition-transform duration-300"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;