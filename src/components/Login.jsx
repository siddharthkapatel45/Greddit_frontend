import { useState } from "react";
import Cookies from "js-cookie";

import { useToast } from "@/components/hooks/use-toast"
import { Button } from "@/components/ui/button"
export default function Login() {
  // State to manage form data and error messages
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { toast } = useToast();
  const handleSubmit = async (e) => {
    e.preventDefault();

import Navbar_OG from "./components/Navbar_OG";
import Profile from './components/Profile';
import Create from './components/Create';
import Home from "./components/Home";
import Login from './components/Login";
import Signup from './components/Signup';
import EditProfile from './components/Edit_Profile';
import CreateCommunity from './components/CreateCommunity';
import CommunityMembers from './components/CommunityMembers';
import Accept from './components/Accept';
>>>>>>> parent of a24d957 (Update Login.jsx)

    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });

      const data = await response.json();

      if (response.status === 200) {
        // Store token in a cookie
        Cookies.set("authToken", data.token, { expires: 100 });

        
        // console.log(Cookies.get("authToken"));
        // console.log("siddharth");

        // Redirect or notify the user of successful login
        toast({
          description: data.message,
        })
        window.location.href = "/"; // Redirect to the home page or another route
      }
      else if(response.status===401) alert("Username/Password incorrect"); 
      else {
        // Handle failed login (e.g., show an error message)
        setErrorMessage(data.message || "Login failed");
      }
    }
     catch (error) {
      // Handle network or other errors
      console.error("Error during login:", error);
      setErrorMessage("Username or password is incorrect. Please try again.");
    }
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
          Sign in to your account now
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Username Input */}
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-900">
              Username
            </label>
            <div className="mt-2">
              <input
                id="username"
                name="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                autoComplete="username"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
              />
            </div>
          </div>

          {/* Password Input */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-900">
              Password
            </label>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
              />
            </div>
          </div>

          {/* Error Message */}
          {errorMessage && (
            <div className="text-sm text-red-600">
              {errorMessage}
            </div>
          )}

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign in
            </button>
          </div>

          {/* Signup Link */}
          <div className="text-sm">
            <a href="/signup" className="font-semibold text-indigo-600 hover:text-indigo-500">
              
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
