import { useCallback, useState } from "react";
import classes from "./Post.module.css";

const Post = (props) => {
  const email = localStorage.getItem("mail");
  const [isUpdating, setIsUpdating] = useState(false);

  const deleteHandler = () => {
    const url = "http://localhost:3000/posts/delete";
    fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        post_id: props.post_id,
      }),
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

    window.location.reload(false);
  };

  const updateHandler = useCallback(() => {
    setIsUpdating(prev => !prev);

  });

  return (
    <>
      <a
        href="#"
        class="list-group-item list-group-item-action flex-column align-items-start"
      >
        <div class="d-flex w-100 justify-content-between">
          <h5 class="mb-1">
            {props.f_name} {props.l_name}
          </h5>
          <div className={classes.wrapper}>
            <span>
              <small class="text-muted">{props.date}</small>
            </span>
            {props.email === email && (
              <>
                <span>
                  <small>
                    <a onClick={deleteHandler} class="text-muted">
                      Delete
                    </a>
                  </small>
                </span>
                <small>
                  {!isUpdating && <a class="text-muted" onClick={updateHandler}>Edit</a>}
                  {isUpdating && <a class="text-muted" onClick={updateHandler}>Cancel</a>}
                </small>
              </>
            )}
          </div>
        </div>
        {!isUpdating && <p class="mb-1">{props.body}</p>}
        {isUpdating && (
          <form>
          <textarea class="form-control" defaultValue={props.body}></textarea>
          <br></br>
          <button type="submit" class="btn btn-primary">Update</button>
          </form>
        )}
      </a>
    </>
  );
};

export default Post;
