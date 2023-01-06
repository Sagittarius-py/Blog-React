import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Axios from "axios";
import Placeholder from "../images/1.jpg";
import ProfilePh from "../images/Profile.png";
import Popup from "./Popup";

export default function Profile() {
  let { userName } = useParams();

  const [user, setUser] = useState({
    userId: 0,
    username: "",
    postCount: "",
    likesCount: "",
    accessLvl: 0,
    about: "",
    rendered: 0,
  });

  useEffect(() => {
    Axios.get(`http://localhost:3002/api/getUsers/${userName}`).then((data) => {
      if (user.rendered < 2) {
        setUser((prevState) => {
          return {
            userId: data.data[0].id_user,
            username: data.data[0].userName,
            postCount: data.data[0].postCount,
            likesCount: data.data[0].likesCount,
            accessLvl: data.data[0].likesCount,
            about: data.data[0].about,
            rendered: prevState.rendered + 1,
          };
        });

        console.log(user);
      }
    });
  });

  return (
    <>
      <div className="main h-fit w-3/4  mx-auto my-24 overflow-hidden bg-white rounded-lg drop-shadow-2xl ">
        <p className="absolute m-4  bg-white rounded-lg px-2 py-1 opacity-90 drop-shadow-lg">
          ID: {user.userId}
        </p>
        <img
          src={Placeholder}
          className="aspect-video h-96  w-full object-cover "
          alt=""
        />
        <img
          src={ProfilePh}
          className=" mx-auto h-48 w-48 object-cover -mt-24 rounded-full"
          alt=""
        />
        <div className="content flex flex-col">
          <h1 className="mx-auto uppercase text-5xl mt-8 mb-4">
            {user.username}
          </h1>
          <Popup></Popup>
          <p className="mx-12 my-6">
            <p className="">Likes Count: {user.likesCount}</p>
            <p className="">Comments Count: {user.likesCount}</p>
            About me: <br />
            {user.about}
          </p>
        </div>
      </div>
    </>
  );
}
