import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";
const Header = () => {
  const { userInfo, setUserInfo } = useContext(UserContext);
  let username = userInfo?.user?.username;

  const handleLogout = async () => {
    const response = await fetch("http://localhost:5000/logout", {
      method: "POST",
      credentials: "include",
    });
    setUserInfo(null);
  };
  const fetchUser = async () => {
    const response = await fetch("http://localhost:5000/profile", {
      method: "GET",
      credentials: "include",
    });
    const json = await response.json();
    setUserInfo(json);
  };
  useEffect(() => {
    fetchUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <header>
      <Link to="/" className="logo">
        MyBlog
      </Link>
      <nav>
        {username ? (
          <>
            <span>Hello {username}</span>
            <Link to="/create">Create new post</Link>
            <Link onClick={handleLogout}>Logout</Link>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
