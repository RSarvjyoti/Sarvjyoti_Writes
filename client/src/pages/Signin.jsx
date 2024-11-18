import { Button, Label, TextInput } from "flowbite-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export function Signin() {
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(""); // Define error message state
  const [loading, setLoading] = useState(false); // Define loading state

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when form submission starts
    try {
      const res = await axios.post('/api/auth/signin', formData); // Axios POST request
      const data = res.data;

      if (data.success === false) {
        return setErrorMessage(data.message); // Set error message if signup failed
      } 
      setLoading(false);
      navigate('/');
    } catch (error) {
      console.error("Signup Failed:", error.response?.data || error.message);
      setErrorMessage(error.response?.data?.message || "An unexpected error occurred.");
    } finally {
      setLoading(false); // Set loading to false after submission is complete
    }
  };

  return (
    <div className="min-h-screen mt-20">
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
        {/* Left side */}
        <div className="flex-1">
          <Link to="/" className=" font-bold dark:text-white text-4xl">
            <span className="px-2 py-1 bg-gradient-to-r from-indigo-700 to-pink-400 rounded-lg text-white">
              Sarvjyoti
            </span>
            Writes
          </Link>
          <p className="text-sm mt-5">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus,
            debitis!
          </p>
        </div>
        {/* Right side */}
        <div className="flex-1">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div>
              <Label value="Enter Email..." />
              <TextInput
                type="email"
                placeholder="Email"
                id="email"
                onChange={handleChange}
              />
            </div>
            <div>
              <Label value="Enter password..." />
              <TextInput
                type="password"
                placeholder="Password"
                id="password"
                onChange={handleChange}
              />
            </div>
            {errorMessage && (
              <p className="text-red-500 text-sm">{errorMessage}</p>
            )}
            <Button
              gradientDuoTone="purpleToPink"
              type="submit"
              disabled={loading} // Disable button while loading
            >
              {loading ? "Signing In..." : "Sign In"} {/* Show loading text */}
            </Button>
          </form>
          <div className="flex gap-2 text-sm mt-5">
            <span>Dont Have an account?</span>
            <Link to="/sign-up" className="text-blue-500">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
