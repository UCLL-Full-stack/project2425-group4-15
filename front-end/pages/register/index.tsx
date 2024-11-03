import React, { useState } from "react";

const Register: React.FC = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  // Example function to check if the username and email are unique.
  const isUnique = (field: string, value: string): boolean => {
    // Replace with actual uniqueness validation (e.g., API call)
    return value !== "existingUser" && value !== "existingEmail@example.com";
  };

  const validateForm = () => {
    // Reset error and success
    setError("");
    setSuccess(false);

    // Check username uniqueness
    if (!isUnique("username", username)) {
      setError("Username is already taken.");
      return false;
    }

    // Check email uniqueness
    if (!isUnique("email", email)) {
      setError("Email is already in use.");
      return false;
    }

    // Validate password criteria
    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return false;
    }

    // Validate terms and conditions checkbox
    if (!agreeToTerms) {
      setError("You must agree to the terms and conditions.");
      return false;
    }

    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      // If validation passes, set success and redirect or perform further actions.
      setSuccess(true);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-500 to-indigo-600 p-6">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg border-t-4 border-purple-500">
        <h2 className="text-3xl font-bold text-center text-indigo-700">Create Account</h2>

        {error && <p className="text-red-600 text-center text-sm">{error}</p>}
        {success && <p className="text-green-600 text-center text-sm">Your account has been created successfully!</p>}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-indigo-700">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 mt-1 text-indigo-700 bg-indigo-50 border border-indigo-200 rounded-lg focus:outline-none focus:border-purple-400"
              required
              placeholder="Enter a unique username"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-indigo-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 mt-1 text-indigo-700 bg-indigo-50 border border-indigo-200 rounded-lg focus:outline-none focus:border-purple-400"
              required
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-indigo-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 mt-1 text-indigo-700 bg-indigo-50 border border-indigo-200 rounded-lg focus:outline-none focus:border-purple-400"
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
              I agree to the <a href="/terms" className="text-purple-500 underline hover:text-purple-600">terms and conditions</a>.
            </label>
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2 font-semibold text-white bg-gradient-to-r from-purple-500 to-indigo-500 rounded-lg hover:from-purple-600 hover:to-indigo-600 focus:outline-none focus:ring-4 focus:ring-purple-300"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
