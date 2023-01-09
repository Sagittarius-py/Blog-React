import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Axios from "axios";
import Placeholder from "../images/1.jpg";
import ProfilePh from "../images/Profile.png";
import Popup from "./Popup";
import getCookieObject from "../getCookieObject";

export default function Profile() {
  let { userName } = useParams();

  const cookies = getCookieObject();

  const [user, setUser] = useState({
    userId: 0,
    username: "",
    postCount: "",
    likesCount: "",
    accessLvl: 0,
    about: "",
    rendered: 0,
  });
  const [userCar, setUserCar] = useState();

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
      }
    });
    if (user.rendered < 2) {
      Axios.get(`http://localhost:3002/api/getUserCar/${user.userId}`).then(
        (data) => {
          setUserCar(data.data[0]);
        }
      );
    }
  });

  return (
    <>
      <div className="w-3/4 mx-auto my-24 overflow-hidden bg-white rounded-lg main h-fit drop-shadow-2xl ">
        <p className="absolute z-10 px-2 py-1 m-4 bg-white rounded-lg opacity-90 drop-shadow-lg">
          ID: {user.userId}
        </p>
        <div className="z-0 overflow-hidden group/item ">
          <img
            src={Placeholder}
            className={`relative object-cover w-full ${
              cookies.loggedIn ? "group-hover/item:scale-110" : null
            } aspect-video h-96 `}
            alt=""
          />
          <h1 className="absolute invisible mx-auto text-4xl group-hover/item:visible">
            Edit
          </h1>
        </div>

        <img
          src={ProfilePh}
          className="z-10 object-cover w-48 h-48 mx-auto -mt-24 rounded-full "
          alt=""
        />
        <div className="flex flex-col content">
          <h1 className="mx-auto mt-8 mb-4 text-5xl uppercase">
            {user.username}
          </h1>
          <div className="absolute flex flex-col w-1/3 h-48 p-2 -mt-8 rounded-lg myCar right-12 bg-slate-300">
            <h1 className="mx-8 text-lg ">That's My Car:</h1>
            {userCar ? (
              <>
                <h2>
                  {userCar.brandName} {userCar.modelName} - {userCar.rocznik} r.
                </h2>
                <h1 className="mx-8 mt-4 text-lg">With engine:</h1>
                <h2>
                  {userCar.uklad} | {userCar.pojemnosc} CC | {userCar.moc}KM
                </h2>
              </>
            ) : null}

            {cookies.loggedIn ? (
              cookies.username == user.username ? (
                <Popup userId={user.userId} />
              ) : null
            ) : null}
          </div>

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
