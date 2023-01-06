import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import CreatePost from "./pages/CreatePost";
import Login from "./pages/Login";
import MainPage from "./pages/MainPage";
import Post from "./pages/Post";
import NavBar from "./pages/NavBar";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";

import { useCookies } from "react-cookie";

import { SessionProvider } from "./context";

const App = () => {
  const [cookies, setCookie, removeCookie] = useCookies({
    accessLvl: 0,
    username: "",
    loggedIn: false,
  });

  return (
    <div>
      <SessionProvider>
        <NavBar removeCookie={removeCookie} />
        <Router>
          <Route path="/" exact render={(props) => <MainPage />} />
          <Route path="/createpost" render={(props) => <CreatePost />} />
          <Route
            path="/login"
            render={(props) => <Login setCookie={setCookie} />}
          />
          <Route path="/register" render={(props) => <Signup />} />
          <Route path="/post/:postId" render={(props) => <Post />} />
          <Route path="/profile/:userName" render={(props) => <Profile />} />
        </Router>
      </SessionProvider>
    </div>
  );
};

export default App;
