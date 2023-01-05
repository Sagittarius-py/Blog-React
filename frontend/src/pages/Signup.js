import React, { useState } from "react";
import Axios from "axios";

import Car1 from "../images/1.jpg";

export default function Signup(props) {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [about, setAbout] = useState("");
  const [accessLVL, setAccess] = useState(0);

  const submitUser = (event) => {
    event.preventDefault();
    Axios.get(`http://localhost:3002/api/getUsers/${userName}`).then((data) => {
      if (data.data.length === 0) {
        if (password === confPassword && password.length > 0) {
          if (accessLVL > 0) {
            Axios.post("http://localhost:3002/api/createUser", {
              username: userName,
              password: password,
              access_lvl: accessLVL,
              about: about,
            });
            refreshPage();
          } else {
            console.log("You have to choose any access level");
          }
        } else {
          console.log("Passwords aren't the same!");
        }
      } else {
        console.log("User with this user name alredy exists");
      }
    });
  };

  function refreshPage() {
    window.location.reload(false);
  }

  return (
    <div className="h-screen flex">
      <div
        className="hidden lg:flex w-full lg:w-1/2 login_img_section
        justify-around items-center bg-center  bg-no-repeat bg-cover"
        style={{ backgroundImage: `url(${Car1})` }}
      ></div>
      <div className="flex w-full lg:w-1/2 justify-center items-center bg-white space-y-8">
        <div className="w-full px-8 md:px-32 lg:px-24">
          <form className="bg-white rounded-md shadow-2xl p-5">
            <h1 className="text-gray-800 font-bold text-2xl mb-1">Welcome!</h1>
            <p className="text-sm font-normal text-gray-600 mb-8">
              We are happy to meet You!
            </p>
            <div className="flex items-center border-2 mb-8 py-2 px-3 rounded-2xl">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                />
              </svg>
              <input
                id="Username"
                className=" pl-2 w-full outline-none border-none"
                type="text"
                name="Username"
                placeholder="User name"
                onChange={(e) => {
                  setUserName(e.target.value);
                }}
              />
            </div>
            <div className="flex items-center border-2 mb-8 py-2 px-3 rounded-2xl ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                  clipRule="evenodd"
                />
              </svg>
              <input
                className="pl-2 w-full outline-none border-none"
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>
            <div className="flex items-center border-2 mb-8 py-2 px-3 rounded-2xl ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                  clipRule="evenodd"
                />
              </svg>
              <input
                className="pl-2 w-full outline-none border-none"
                type="password"
                name="confirmpassword"
                id="confirmpassword"
                placeholder="Confirm Password"
                onChange={(e) => {
                  setConfPassword(e.target.value);
                }}
              />
            </div>

            <div className="flex items-center border-2 mb-8 py-2 px-3 rounded-2xl ">
              <textarea
                className="pl-2 w-full outline-none border-none"
                placeholder="Tell something about Yourself"
                onChange={(e) => {
                  setAbout(e.target.value);
                }}
              />
            </div>
            <div className="flex items-center border-2 mb-12 py-2 px-3 rounded-2xl ">
              <select
                placeholder="Access Level"
                className="pl-2 w-full outline-none border-none"
                onChange={(e) => {
                  setAccess(e.target.value);
                }}
              >
                <option value="0">Choose access level</option>
                <option value="1">Normal User</option>
                <option value="2">Privilage User</option>
                <option value="3">Admin</option>
              </select>
            </div>

            <button
              className="block w-full bg-indigo-600 mt-5 py-2 rounded-2xl hover:bg-indigo-700 hover:-translate-y-1 transition-all duration-500 text-white font-semibold mb-2"
              onClick={submitUser}
            >
              Join
            </button>
            <div className="flex justify-between mt-4">
              <a
                href="/register"
                className="text-sm ml-2 hover:text-blue-500 cursor-pointer hover:-translate-y-1 duration-500 transition-all"
              >
                Don't have an account yet?
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
