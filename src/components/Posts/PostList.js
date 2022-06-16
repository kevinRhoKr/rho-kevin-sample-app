import { useCallback, useEffect, useState } from "react";
import classes from "./PostList.module.css";
import Post from "./Post";

const PostList = (props) => {
  
  return (
    <>
      <h2 class="text-center" style={{ marginTop: 30, marginBottom: -20 }}>
        All Posts
      </h2>
      <div class="list-group" className={classes.wrapper}>
        {props.posts.map((post) => (
          <Post
            f_name={post.f_name}
            l_name={post.l_name}
            date={post.date}
            body={post.body}
            email={post.email}
            post_id={post.post_id}
            key={post.post_id}
          ></Post>
        ))}
      </div>
    </>
  );
};

export default PostList;
