import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useHistory } from "react-router-dom";
import "../App.css";

function MainPage() {
  const [postList, setPostList] = useState([]);

  let history = useHistory();

  let refreshPage = () => {
    window.location.reload(false);
  };

  useEffect(() => {
    Axios.get("http://localhost:3002/api/get").then((data) => {
      console.log(data);
      setPostList(data.data);
    });
  }, []);

  const LikePost = (id) => {
    Axios.post(`http://localhost:3002/api/like/${id}`).then((response) => {
      alert("you liked a post");
    });
    refreshPage();
  };

  var photo = () => {
    Axios.get(`http://localhost:3002/api/getPhoto`).then((response) => {
      console.log(response);
    });
  };

  photo();

  return (
    <div className="MainPage">
      <div className="PostContainer">
        {postList.map((val, key) => {
          return (
            <div className="Post">
              <h1
                className="post-title"
                onClick={() => history.push(`/post/${val.id}`)}
              >
                {val.title}
              </h1>
              <img
                src={`http://localhost:3002/images/${val.photoName}`}
                alt={val.photoName}
              ></img>
              <h5>{val.photoName + ".png"}</h5>
              <p>
                {val.post_text.length > 300
                  ? val.post_text.substring(0, 300) + " ..."
                  : val.post_text}
              </p>
              <h4>{val.user_name}</h4>
              <button className="like_btn" onClick={() => LikePost(val.id)}>
                Like
              </button>

              <h5>Likes: {val.likes}</h5>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default MainPage;
