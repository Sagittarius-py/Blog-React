import React, { useState } from "react";
import Axios from "axios";
import "../App.css";

function CreateUser() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [about, setAbout] = useState("");
  const [accessLVL, setAccess] = useState(1);

  const submitUser = () => {
    Axios.post("http://localhost:3002/api/createUser", {
      username: userName,
      password: password,
      access_lvl: accessLVL,
      about: about,
    });
    refreshPage();
  };



  function refreshPage() {
    window.location.reload(false);
  }

  return (
    <div className="CreateUser">
      <div className="uploadPost">
        <label>Username: </label>
        <input
          type="text"
          onChange={(e) => {
            setUserName(e.target.value);
          }}
        />
        <label>Password: </label>
        <input
          type="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <label>About User</label>
        <textarea
          onChange={(e) => {
            setAbout(e.target.value);
          }}
        ></textarea>
        <label>Access_LVL: </label>
        <select
          onChange={(e) => {
            setAccess(e.target.value);
          }}
        >
          <option value="1">Normal User</option>
          <option value="2">Privilage User</option>
          <option value="3">Admin</option>
        </select>

        <button onClick={submitUser}>Submit Post</button>
      </div>
    </div>
  );
}

export default CreateUser;
