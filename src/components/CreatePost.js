import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Editor from "./Editor";

const CreatePost = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState("");
  const createNewPost = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.set("title", title);
    data.set("summary", summary);
    data.set("content", content);
    data.set("file", file[0]);
    const response = await fetch("http://localhost:5000/post", {
      method: "POST",
      body: data,
      credentials: "include",
    });
    if (response.ok) {
      const json = await response.json();
      console.log(json);
      navigate("/");
    } else {
      alert("Something went wrong");
    }
  };
  return (
    <>
      <form onSubmit={createNewPost}>
        <input
          type="title"
          placeholder={"Title"}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="summary"
          placeholder={"Summary"}
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
        />
        <input
          type="file"
          onChange={(e) => {
            setFile(e.target.files);
          }}
        />
        <Editor value={content} handleChange={setContent} />
        <button style={{ marginTop: "5px" }}>Create post</button>
      </form>
    </>
  );
};

export default CreatePost;
