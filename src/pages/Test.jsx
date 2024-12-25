"use client";

import React, { useState } from "react";
// import { useRouter } from "next/navigation";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setlastName] = useState("");
  // const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {
      email,
      password,
      firstName,
      lastName,
    };

    if (!data.email || !data.password) {
      setError("لازم تكتب الايميل والباسورد");
      return;
    }

    const response = await fetch("/api/user/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorResponse = await response.json();
      console.log('3amo samy');
      console.log(errorResponse);
      setError(errorResponse.error);
    } else {
      const result = await response.json();
      setMessage(result.message);
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-500">
      <div className="bg-gray-800 bg-opacity-90 p-8 rounded-all shadow-md max-w-md w-full">
        <h1 className="text-2xl font-bold mb-6 text-center text-white">
          Sign Up
        </h1>
        <div className="signup-container">
          <h1 className="block mb-2 text-xl font-medium text-red-500">
            New User
          </h1>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                className="block mb-2 text-sm font-medium text-white"
                htmlFor="email"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full px-4 py-2 border border-black rounded-all bg-gray-700 text-black focus:ring-blue-500 focus:border-blue-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <label
                className="block mb-2 text-sm font-medium text-white"
                htmlFor="password"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="w-full px-4 py-2 border border-gray-600 rounded-all bg-gray-700 text-black focus:ring-blue-500 focus:border-blue-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div>
              <label
                className="block mb-2 text-sm font-medium text-white"
                htmlFor="firstName"
              >
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                className="w-full px-4 py-2 border border-gray-600 rounded-all bg-gray-700 text-black focus:ring-blue-500 focus:border-blue-500"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>

            <div>
              <label
                className="block mb-2 text-sm font-medium text-white"
                htmlFor="lastName"
              >
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                className="w-full px-4 py-2 border border-gray-600 rounded-all bg-gray-700 text-black focus:ring-blue-500 focus:border-blue-500"
                value={lastName}
                onChange={(e) => setlastName(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-all hover:bg-blue-700"
            >
              Submit
            </button>
          </form>
          {}
          <hr className="my-6 border-gray-300" />
          {error && <p style={{ color: "red" }}>{error}</p>}
          {message && <p style={{ color: "green" }}>{message}</p>}
        </div>
      </div>
    </div>
  );
};

export default SignUp;
