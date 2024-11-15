import { Button, Label, TextInput } from "flowbite-react";
import React from "react";
import { Link } from "react-router-dom";

export function Signup() {
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
        {/* right side */}
        <div className="flex-1">
          <form className="flex flex-col gap-4">
            <div>
              <Label value="Enter username..." />
              <TextInput 
              type="text"
              placeholder="Username"
              id='username'
              />
            </div>
            <div>
              <Label value="Enter Email..." />
              <TextInput 
              type="email"
              placeholder="Email"
              id='email'
              />
            </div>
            <div>
              <Label value="Enter password..." />
              <TextInput 
              type="password"
              placeholder="Password"
              id='password'
              />
            </div>
            <Button gradientDuoTone="purpleToPink" type="submit">Sign Up</Button>
          </form>
          <div className="flex gap-2 text-sm mt-5">
            <span>Have an account?</span>
            <Link to='/sign-in' className="text-blue-500 ">Sign In</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
