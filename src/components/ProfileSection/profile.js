import { useEffect, useState } from "react";
import classes from "./profile.module.css";
import picture from "./profile.jpg";

const Profile = () => {
  const [profile, setProfile] = useState({});

  const fetchPostsHandler = () => {
    const url = "http://localhost:3000/user";
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: localStorage.getItem("mail"),
      }),
    })
      .then((res) => {
        console.log("here");
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("Something went wrong");
        }
      })
      .then((data) => {
        setProfile(data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  useEffect(() => {
    fetchPostsHandler();
  }, []);

  return (
    <>
      <div className={classes.wrapper}>
        <div class="card text-center">
          <img
            src={picture}
            class="card-img-top"
            alt="Profile Picture"
          ></img>
          <div class="card-body">
            <h5 class="card-title">
              {profile.f_name} {profile.l_name}
            </h5>
            <p class="card-text">{profile.email}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
