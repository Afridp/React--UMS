import { Routes, Route } from "react-router-dom";

import Login from "../Pages/UserPages/Login";
import SignUp from "../Pages/UserPages/SignUp";
import Home from "../Pages/UserPages/Home";
import Profile from "../Pages/UserPages/Profile";
import UserPublic from "./UserPublic";
import UserProtect from "./UserProtected";

function UserRoute() {
  return (
    <Routes>
      <Route
        path="/signup"
        element={
          <UserPublic>
            {" "}
            <SignUp />
          </UserPublic>
        }
      />
      <Route
        path="/login"
        element={
          <UserPublic>
            <Login />
          </UserPublic>
        }
      />
      <Route
        path="/"
        element={
        
            <Home />
        
        }
      />
      <Route
        path="/profile"
        element={
          <UserProtect>
            <Profile />
          </UserProtect>
        }
      />
    </Routes>
  );
}

export default UserRoute;
