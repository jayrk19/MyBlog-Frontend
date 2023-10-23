import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { format } from "date-fns";

const PostPage = () => {
  const { id } = useParams();
  const { userInfo } = useContext(UserContext);
  const [post, setPost] = useState(null);
  const fetchPost = async () => {
    const response = await fetch(`http://localhost:5000/post/${id}`);
    const json = await response.json();
    setPost(json);
  };
  useEffect(() => {
    fetchPost();
  }, []);

  if (!post) return "";
  return (
    <div className="post-page">
      <h1>{post.title}</h1>
      <time>{format(new Date(post.createdAt), "dd-MM-yyyy HH:mm")}</time>
      <div className="author">by @{post.author.name}</div>
      {userInfo.user.id === post.author._id && (
        <div className="edit-row">
          <Link className="edit-btn" to={`/edit/${post._id}`}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            ></svg>
            Edit this post
          </Link>
        </div>
      )}
      <div className="image">
        <img src={`http://localhost:5000/${post.cover}`} alt="" />
      </div>
      <div
        className="content"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </div>
  );
};

export default PostPage;
