import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Login = ({ handleLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const submitHandler = async (e) => {
    e.preventDefault();
    setError("");
    
    try {
      const success = await handleLogin(email, password);
      if (success) {
        navigate(from, { replace: true });
      } else {
        setError("Invalid email or password");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-gray-900">
      <div className="border-2 border-emerald-600 p-20 rounded-xl bg-gray-800">
        <form
          onSubmit={submitHandler}
          className="flex flex-col items-center justify-center space-y-4"
        >
          {error && (
            <div className="text-red-500 text-sm mb-2">
              {error}
            </div>
          )}
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full sm:w-80 text-white bg-transparent outline-none border-2 border-emerald-600 rounded-full py-3 px-5"
            type="email"
            placeholder="Enter your email"
          />
          <input
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full sm:w-80 text-white bg-transparent outline-none border-2 border-emerald-600 rounded-full py-3 px-5"
            type="password"
            placeholder="Enter password"
          />
          <button
            type="submit"
            className="mt-20 w-80 text-white outline-none font-semibold hover:bg-emerald-700 rounded-full py-3 px-5 bg-emerald-600"
          >
            Log in
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
