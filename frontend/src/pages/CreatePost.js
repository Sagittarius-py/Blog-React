import React, { useState } from "react";
import Axios from "axios";
import "../App.css";

function CreatePost() {
  const [userName, setUserName] = useState("");
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [photos, setPhotos] = useState("");

  const submitPost = () => {
    const data = new FormData();

    data.append("userName", userName);
    data.append("title", title);
    data.append("text", text);
    // data.append("files", photos);

    for (let i = 0; i < photos.length; i++) {
      data.append("files", photos[i]);
    }

    Axios.post("http://localhost:3002/api/create", data);

    // refreshPage();
  };

  function refreshPage() {
    window.location.reload(false);
  }

  return (
    <div className="CreatePost">
      <div className="uploadPost">
        <label>Username: </label>
        <input
          type="text"
          onChange={(e) => {
            setUserName(e.target.value);
          }}
        />
        <label>Title: </label>
        <input
          type="text"
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <label>Post Text</label>
        <textarea
          onChange={(e) => {
            setText(e.target.value);
          }}
        ></textarea>
        <label htmlFor="img">Select image:</label>
        <input
          type="file"
          id="img"
          name="img"
          accept="image/*"
          multiple
          onChange={(e) => {
            setPhotos(e.target.files);
            console.log(e.target.files);
          }}
        ></input>
        <button onClick={submitPost}>Submit Post</button>
      </div>
    </div>
  );
}

export default CreatePost;
