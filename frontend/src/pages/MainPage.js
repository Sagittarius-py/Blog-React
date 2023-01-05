import React, { useState, useEffect } from "react";
import Axios from "axios";
import "../App.css";
import PostCard from "./PostCard";

import getCookieObject from "../getCookieObject";

function MainPage() {
  const [postList, setPostList] = useState([]);

  console.log(getCookieObject());
  // const username = Cookies.get("username");

  useEffect(() => {
    Axios.get("http://localhost:3002/api/get").then((data) => {
      setPostList(data.data);
    });
  }, []);

  return (
    <div className="MainPage">
      <div className="PostContainer">
        {postList.map((val, key) => {
          return (
            <PostCard
              key={key}
              id={val.id}
              postTitle={val.title}
              postText={val.post_text}
              postCreator={val.user_name}
              imageLink={val.photoName}
              postLikes={val.likes}
            />
          );
        })}
      </div>
    </div>
  );
}

export default MainPage;
