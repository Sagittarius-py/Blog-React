import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Axios from "axios";
import CommentForm from "./CommentForm";
import Gallery from "react-photo-gallery";
import getCookieObject from "../getCookieObject";
import { useHistory } from "react-router-dom";

export default function Post() {
  let history = useHistory();
  const cookies = getCookieObject();
  let { postId } = useParams();
  const [post, setPost] = useState({
    title: "",
    postText: "",
    userName: "",
    photoNames: [],
    id: "",
    rendered: 0,
  });

  console.log(post);

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

  const photoList = [];
  post.photoNames.map((photo) => {
    photoList.push({
      src: `http://localhost:3002/images/${photo}`,
      width: 4,
      height: 3,
    });
    return photoList;
  });

  const deletePost = (id) => {
    Axios.delete(`http://localhost:3002/api/delete/${postId}`).then(
      (response) => {
        alert("you deleted a post");
      }
    );
  };

  return (
    <div className="flex justify-center m-12 f h-4/5">
      <div className="flex flex-col w-3/5 p-12 mt-12 rounded-md shadow-2xl h-fit flex-nowrap">
        <div className="about">
          <h1 className="mb-1 text-2xl font-bold text-gray-800 post-title">
            {post.title}
          </h1>
          <p>{post.postText}</p>
          <h4 className="m-2 text-sm font-normal text-gray-600">
            {post.userName}
          </h4>
        </div>
        <div className="photos">
          <Gallery photos={photoList} />
        </div>

        <CommentForm postId={postId} />

        {cookies.username == post.userName ? (
          <button
            className="relative bottom-0 right-0 float-right w-48 h-12 overflow-hidden text-lg bg-white rounded-lg shadow group"
            onClick={() => deletePost(post.id)}
          >
            <div className="absolute inset-0 w-3 bg-red-600 transition-all duration-[250ms] ease-out group-hover:w-full"></div>
            <span className="relative text-black group-hover:text-white">
              Delete Post
            </span>
          </button>
        ) : cookies.accessLvl > 2 ? (
          <button
            className="relative bottom-0 right-0 float-right w-48 h-12 overflow-hidden text-lg bg-white rounded-lg shadow group"
            onClick={() => {
              deletePost(post.id);
              history.push("/");
            }}
          >
            <div className="absolute inset-0 w-3 bg-red-600 transition-all duration-[250ms] ease-out group-hover:w-full"></div>
            <span className="relative text-black group-hover:text-white">
              Delete Post
            </span>
          </button>
        ) : null}
      </div>
    </div>
  );
}
