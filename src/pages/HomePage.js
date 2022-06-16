import NewPost from "../components/Posts/NewPost";
import PostList from "../components/Posts/PostList";
import { useState, useCallback, useEffect } from "react";

const HomePage = () => {
  const [newPost, setNewPost] = useState(false);

  const showPostSubmit = () => {
    setNewPost(true);
  };

  const hidePostSubmit = () => {
    setNewPost(false);
  };

  const [posts, setPosts] = useState([]);

  const fetchPostsHandler = useCallback(() => {
    const url = "http://localhost:3000/posts";
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("Something went wrong");
        }
      })
      .then((data) => {
        setPosts(data.reverse());
      })
      .catch((error) => {
        console.log("error");
      });
      
  });

  useEffect(() => {
    fetchPostsHandler();
  }, [])

  console.log("here!");

  return (
    <>
      <div class="text-center">
        {!newPost && (
          <button
            type="button"
            class="btn btn-outline-primary"
            style={{"marginTop": 40}}
            onClick={showPostSubmit}
          >
            New Post
          </button>
        )}

        {newPost && <NewPost hideTextArea={hidePostSubmit} refreshPost={fetchPostsHandler}></NewPost>}
      </div>
      <PostList posts={posts}></PostList>
    </>
  );
};

export default HomePage;
