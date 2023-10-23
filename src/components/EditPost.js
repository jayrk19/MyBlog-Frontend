import React, { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";
import Editor from "./Editor";

const EditPost = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState("");
  const fetchPost = async () => {
    const response = await fetch(`http://localhost:5000/post/${id}`);
    const json = await response.json();
    setTitle(json.title);
    setContent(json.content);
    setSummary(json.summary);
  };
  useEffect(() => {
    fetchPost();
  }, []);
  const updateNewPost = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.set("title", title);
    data.set("summary", summary);
    data.set("content", content);
    if (file?.[0]) {
      data.set("file", file[0]);
    }
    const response = await fetch(`http://localhost:5000/post/${id}`, {
      method: "PUT",
      body: data,
      credentials: "include",
    });
    if (response.ok) {
      const json = await response.json();
      console.log(json);
      navigate("/");
    } else {
      alert("Something went wrong");
      navigate("/");
    }
  };

  return (
    <>
      <form onSubmit={updateNewPost}>
        <input
          type="title"
          name="title"
          placeholder={"Title"}
          value={title}
          onChange={(ev) => setTitle(ev.target.value)}
        />
        <input
          type="summary"
          name="summary"
          placeholder={"Summary"}
          value={summary}
          onChange={(ev) => setSummary(ev.target.value)}
        />
        <input
          type="file"
          onChange={(e) => {
            setFile(e.target.files);
          }}
        />{" "}
        <Editor name="content" handleChange={setContent} value={content} />
        <button style={{ marginTop: "5px" }}>Update post</button>
      </form>
    </>
  );
};

export default EditPost;
