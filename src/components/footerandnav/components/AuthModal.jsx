"use client";

import { useState } from "react";
import CryptoJS from "crypto-js";

export default function AuthModal({ open, onClose }) {
  const [activeTab, setActiveTab] = useState("signin");

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6 relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-gray-500 hover:text-black text-xl"
        >
          ×
        </button>

        {/* Tabs */}
        <div className="flex mb-6 border-b">
          <button
            className={`flex-1 py-2 font-semibold ${
              activeTab === "signin"
                ? "border-b-2 border-orange-500 text-orange-500"
                : "text-gray-400"
            }`}
            onClick={() => setActiveTab("signin")}
          >
            Sign In
          </button>
          <button
            className={`flex-1 py-2 font-semibold ${
              activeTab === "register"
                ? "border-b-2 border-orange-500 text-orange-500"
                : "text-gray-400"
            }`}
            onClick={() => setActiveTab("register")}
          >
            Register
          </button>
        </div>

        {/* Content */}
        {activeTab === "signin" ? <SignInForm /> : <RegisterForm />}
      </div>
    </div>
  );
}

function RegisterForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(""); // For API errors
  const [passwordError, setPasswordError] = useState(""); // For password mismatch

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError(""); // clear API error
    setPasswordError(""); // clear password mismatch error
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    // ✅ Check if password and confirmPassword match
    if (form.password !== form.confirmPassword) {
      setPasswordError("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        setSuccess(true);
        setForm({ name: "", email: "", password: "", confirmPassword: "" });
      } else {
        setError(data.error || "Registration failed. Please try again.");
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again later.");
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-black">
      {/* Show API error */}
      {error && <p className="text-red-600 font-semibold">{error}</p>}

      {/* Show password mismatch error */}
      {passwordError && (
        <p className="text-red-600 font-semibold">{passwordError}</p>
      )}

      <div>
        <p>Your Name</p>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Name"
          required
          className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
        />
      </div>

      <div>
        <p>Your Email</p>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          required
          className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
        />
      </div>

      <div>
        <p>Password</p>
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Password"
          required
          className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
        />
      </div>

      <div>
        <p>Confirm Password</p>
        <input
          type="password"
          name="confirmPassword"
          value={form.confirmPassword}
          onChange={handleChange}
          placeholder="Confirm Password"
          required
          className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-orange-500 text-white py-2 rounded-lg font-semibold hover:bg-orange-600 transition disabled:opacity-50"
      >
        {loading ? "Signing up..." : "Register"}
      </button>

      {success && (
        <p className="text-green-600 font-semibold">
          Registration successful! You can now sign in.
        </p>
      )}
    </form>
  );
}

function SignInForm() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(""); // show invalid login
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError(""); // clear error on change
    setSuccess(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      // Call your GET API with query params
      const queryParams = new URLSearchParams({
        email: form.email,
        password: form.password,
      }).toString();

      const res = await fetch(`/api/user?${queryParams}`);
      const data = await res.json();

      if (data && data.id) {
        const userId = data.id;
        const secretKey = process.env.NEXT_PUBLIC_SECRET_KEY || "fallback_key";
        const encryptedId = CryptoJS.AES.encrypt(userId, secretKey).toString();
        localStorage.setItem("userId", encryptedId);

        setSuccess(true);
        setError("");

        // Redirect using native browser
        setTimeout(() => {
          window.location.href = "/en";
        }, 1000);
      } else {
        setError("Invalid email or password");
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again later.");
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-black">
      {error && <p className="text-red-600 font-semibold">{error}</p>}
      {success && (
        <p className="text-green-600 font-semibold">
          Sign in successful! Redirecting...
        </p>
      )}

      <div>
        <p>Your Email</p>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          required
          className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
        />
      </div>

      <div>
        <p>Password</p>
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Password"
          required
          className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-orange-500 text-white py-2 rounded-lg font-semibold hover:bg-orange-600 transition disabled:opacity-50"
      >
        {loading ? "Signing in..." : "Sign In"}
      </button>
    </form>
  );
}
