import React, { useState, useEffect } from "react";
import axios from "axios";

function Posts() {
  const [posts, setPosts] = useState({ data: [], isLoaded: false });
  const [errors, setErrors] = useState({});
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const response = await axios.get("/api/posts");
    setPosts({ data: response.data, isLoaded: true });
  }

  const onSubmit = async (e) => {
    e.preventDefault();

    const postData = {
      name: e.target.name.value,
      message: e.target.message.value,
    };

    try {
      const response = await axios.post("/api/posts", postData);
      const data = await response.data;

      setErrors({});
      setName("");
      setMessage("");
      fetchData();
    } catch (e) {
      setErrors(e.response.data);
    }
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
          {errors.name && <span style={{ color: "red" }}>{errors.name}</span>}
        </div>
        <div>
          <label htmlFor="text">Message:</label>
          <input
            type="text"
            name="message"
            placeholder="Enter your message"
            onChange={(e) => setMessage(e.target.value)}
            value={message}
          />
          {errors.message && (
            <span style={{ color: "red" }}>{errors.message}</span>
          )}
        </div>
        <button type="submit">Send</button>
      </form>
      {!posts.isLoaded ? (
        <div>...loading</div>
      ) : (
        <div>
          {posts.data.map((post) => (
            <div key={post._id}>
              <span style={{ width: "100px", fontWeight: "700" }}>
                {post.name}
              </span>
              : {post.message}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
export default Posts;
