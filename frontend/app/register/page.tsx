"use client";

import { registerUser } from "@/services/api"; // adjust path as needed
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [fullname, setFullname] = useState("");
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    if (!email || !fullname || !username || !phone || !password) {
      setError("Please fill in all fields");
      setIsLoading(false);
      return;
    }
    try {
      await registerUser({ email, fullname, username, phone, password });
      router.push("/login");
    } catch (err: any) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFBF0] flex items-center justify-center">
      <div className="relative w-full max-w-md p-8">
        {/* Pixel border effect */}
        <div className="absolute inset-0 bg-[#FFF2AF] border-4 border-[#FFD1DC] rounded-xl shadow-xl">
          <div className="absolute top-0 left-0 w-3 h-3 bg-[#FFFBF0] rounded-tl-xl"></div>
          <div className="absolute top-0 right-0 w-3 h-3 bg-[#FFFBF0] rounded-tr-xl"></div>
          <div className="absolute bottom-0 left-0 w-3 h-3 bg-[#FFFBF0] rounded-bl-xl"></div>
          <div className="absolute bottom-0 right-0 w-3 h-3 bg-[#FFFBF0] rounded-br-xl"></div>
          <div className="absolute top-0 left-3 right-3 h-3 bg-[#FFFBF0]"></div>
          <div className="absolute bottom-0 left-3 right-3 h-3 bg-[#FFFBF0]"></div>
          <div className="absolute left-0 top-3 bottom-3 w-3 bg-[#FFFBF0]"></div>
          <div className="absolute right-0 top-3 bottom-3 w-3 bg-[#FFFBF0]"></div>
        </div>
        {/* Register form container */}
        <div className="relative bg-[#FFFAEC] rounded-xl p-8 flex flex-col items-center">
          <h2 className="text-2xl font-bold text-[#7B3FE4] mb-2">Create Account</h2>
          <p className="text-gray-500 mb-6 text-center">Sign up for YO! GREEK</p>
          {error && (
            <div className="w-full mb-4 p-2 bg-red-100 border border-red-400 text-red-700 rounded text-center">
              {error}
            </div>
          )}
          <form className="w-full space-y-5" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-xs font-bold uppercase mb-1 text-[#7B3FE4]">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@email.com"
                className="w-full px-4 py-2 rounded-lg bg-[#FFF] border border-[#D9D9D9] focus:border-[#7B3FE4] focus:ring-2 focus:ring-[#FFD1DC] text-gray-700 placeholder-gray-400 transition"
                autoComplete="email"
              />
            </div>
            <div>
              <label htmlFor="fullname" className="block text-xs font-bold uppercase mb-1 text-[#7B3FE4]">
                Full Name
              </label>
              <input
                id="fullname"
                type="text"
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
                placeholder="Your full name"
                className="w-full px-4 py-2 rounded-lg bg-[#FFF] border border-[#D9D9D9] focus:border-[#7B3FE4] focus:ring-2 focus:ring-[#FFD1DC] text-gray-700 placeholder-gray-400 transition"
                autoComplete="name"
              />
            </div>
            <div>
              <label htmlFor="username" className="block text-xs font-bold uppercase mb-1 text-[#7B3FE4]">
                Username
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="your username"
                className="w-full px-4 py-2 rounded-lg bg-[#FFF] border border-[#D9D9D9] focus:border-[#7B3FE4] focus:ring-2 focus:ring-[#FFD1DC] text-gray-700 placeholder-gray-400 transition"
                autoComplete="username"
              />
            </div>
            <div>
              <label htmlFor="phone" className="block text-xs font-bold uppercase mb-1 text-[#7B3FE4]">
                Phone Number
              </label>
              <input
                id="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="08xxxxxxxx"
                className="w-full px-4 py-2 rounded-lg bg-[#FFF] border border-[#D9D9D9] focus:border-[#7B3FE4] focus:ring-2 focus:ring-[#FFD1DC] text-gray-700 placeholder-gray-400 transition"
                autoComplete="tel"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-xs font-bold uppercase mb-1 text-[#7B3FE4]">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create a password"
                className="w-full px-4 py-2 rounded-lg bg-[#FFF] border border-[#D9D9D9] focus:border-[#7B3FE4] focus:ring-2 focus:ring-[#FFD1DC] text-gray-700 placeholder-gray-400 transition"
                autoComplete="new-password"
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-2 rounded-full font-bold text-white bg-[#C3D4ED] hover:bg-[#EBD6FF] transition-colors shadow-md mt-2 ${isLoading ? "opacity-70 cursor-not-allowed" : ""}`}
            >
              {isLoading ? "Registering..." : "Register"}
            </button>
          </form>
          <div className="w-full flex justify-between items-center mt-6">
            <span className="text-xs text-gray-400">Already have an account?</span>
            <Link href="/login" className="text-[#7B3FE4] hover:underline text-sm font-medium flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mr-1"
              >
                <path d="m15 18-6-6 6-6" />
              </svg>
              Back to login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 