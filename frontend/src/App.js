import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import CreatePost from "./pages/CreatePost";
import CreateUser from "./pages/CreateUser";
import MainPage from "./pages/MainPage";
import Post from "./pages/Post";

const App = () => {
  return (
    <div>
      <div className="navbar">
        <div className="links">
          <a href="/">Main Page</a>
          <a href="/createpost">Create Post</a>
          <a href="/createuser">Create User</a>
        </div>
      </div>

      <Router>
        <Route path="/" exact render={(props) => <MainPage />} />
        <Route path="/createpost" render={(props) => <CreatePost />} />
        <Route path="/createuser" render={(props) => <CreateUser />} />
        <Route path="/post/:postId" render={(props) => <Post />} />
      </Router>
    </div>
  );
};

export default App;
