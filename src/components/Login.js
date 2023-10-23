import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const Login = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const { setUserInfo } = useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(credentials),
      });
      if (!response.ok) {
        alert("Registration failed. Please try again later.");
        setCredentials({ username: "", password: "" });
      } else {
        const json = await response.json();
        setUserInfo(json);
        alert("Registration successful");
        navigate("/");
      }
    } catch (error) {
      alert("Registration failed. Please try again later.");
      setCredentials({ username: "", password: "" });
    }
  };

  return (
    <>
      <form className="login" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="username"
          name="username"
          value={credentials.username}
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="password"
          name="password"
          value={credentials.password}
          onChange={handleChange}
        />
        <button>Login</button>
      </form>
    </>
  );
};

export default Login;
