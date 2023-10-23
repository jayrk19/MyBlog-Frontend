import React, { useEffect, useState } from "react";
import Post from "./Post";

const Home = () => {
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    const response = await fetch("http://localhost:5000/post");
    const json = await response.json();
    setPosts(json);
  };
  useEffect(() => {
    fetchPosts();
  }, []);
  return (
    <>
      {posts.length > 0 &&
        posts.map((post) => <Post {...post} key={post._id} />)}
    </>
  );
};

export default Home;
