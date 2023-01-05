import React, { useState, useEffect, useContext } from "react";
import Axios from "axios";
import "../App.css";
import PostCard from "./PostCard";
import SessionContext from "../context";

function MainPage() {
  const { session, signIn } = useContext(SessionContext);
  console.log(session);
  const [postList, setPostList] = useState([]);

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
