import React, { useState } from "react";

const Signup = () => {
  const [credentials, setCredentials] = useState({
    name: "",
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });
      if (!response.ok) {
        alert("Registration failed. Please try again later.");
        setCredentials({ name: "", username: "", password: "" });
      } else {
        alert("Registration successful");
      }
    } catch (error) {
      alert("Registration failed. Please try again later.");
      setCredentials({ name: "", username: "", password: "" });
    }
  };

  return (
    <>
      <form className="register" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="name"
          name="name"
          value={credentials.name}
          onChange={handleChange}
        />
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
        <button>Signup</button>
      </form>
    </>
  );
};

export default Signup;
