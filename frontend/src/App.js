import React, { useContext } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import CreatePost from "./pages/CreatePost";
import Login from "./pages/Login";
import MainPage from "./pages/MainPage";
import Post from "./pages/Post";
import NavBar from "./pages/NavBar";
import Signup from "./pages/Signup";

import { SessionProvider } from "./context";

const App = () => {
  return (
    <div>
      <SessionProvider>
        <NavBar />
        <Router>
          <Route path="/" exact render={(props) => <MainPage />} />
          <Route path="/createpost" render={(props) => <CreatePost />} />
          <Route path="/login" render={(props) => <Login />} />
          <Route path="/register" render={(props) => <Signup />} />
          <Route path="/post/:postId" render={(props) => <Post />} />
        </Router>
      </SessionProvider>
    </div>
  );
};

export default App;
