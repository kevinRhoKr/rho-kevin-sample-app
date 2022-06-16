import classes from "./NewPost.module.css";
import { useRef } from "react";

const NewPost = (props) => {

    const textRef = useRef();

  const postsHandler = () => {
    const url = "http://localhost:3000/posts/new";
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
          text: textRef.current.value,
          email: localStorage.getItem("mail"),
      })
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("Something went wrong");
        }
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log("error");
      });

      textRef.current.value = "";
      props.hideTextArea();
      //props.refreshPost();
      window.location.reload(false);
  };


  return (
    <>
      <form className={classes.wrapper} onSubmit={postsHandler}>
        <div class="form-outline mb-4">
          <textarea
            class="form-control"
            id="postBody"
            rows="4"
            placeholder="Type in a new message"
            ref={textRef}
          ></textarea>
        </div>
        <button
          type="submit"
          class="btn btn-primary btn-block mb-4"
          style={{ marginRight: 10 }}
        >
          Post
        </button>
        <button
          type="button"
          class="btn btn-danger btn-block mb-4"
          onClick={props.hideTextArea}
        >
          Cancel
        </button>
      </form>
    </>
  );
};

export default NewPost;
