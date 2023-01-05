import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Axios from "axios";
import "../App.css";

export default function Post() {
  let { postId } = useParams();
  const [post, setPost] = useState({
    title: "",
    postText: "",
    userName: "",
    photoNames: [],
    id: "",
    rendered: 0,
  });
  //   const [title, setTitle] = useState("");

  useEffect(() => {
    Axios.get(`http://localhost:3002/api/getFromId/${postId}`).then((data) => {
      if (post.rendered < 1) {
        var imagesNames = [];
        data.data.map((record) => {
          imagesNames.push(record.photoName);
          return imagesNames;
        });

        var joined = post.photoNames.concat(imagesNames);

        //   console.log(joined);
        setPost({
          title: data.data[0].title,
          postText: data.data[0].post_text,
          userName: data.data[0].user_name,
          photoNames: joined,
          id: data.data[0].id,
          rendered: 1,
        });
      }
    });
  });

  const deletePost = (id) => {
    Axios.delete(`http://localhost:3002/api/delete/${postId}`).then(
      (response) => {
        alert("you deleted a post");
      }
    );
  };

  return (
    <div className="Post individual">
      <h1 className="post-title">{post.title}</h1>
      <p>{post.postText}</p>
      <h4>{post.userName}</h4>
      {post.photoNames.map((photo) => {
        return (
          <img
            key={photo}
            src={`http://localhost:3002/images/${photo}`}
            alt={photo}
          ></img>
        );
      })}

      <button onClick={() => deletePost(post.id)}>X</button>
    </div>
  );
}
