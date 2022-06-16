import { useRef, useState } from "react";
import classes from "./ContactForm.module.css";

const ContactsForm = () => {
  const textRef = useRef();
  const [success, setSuccess] = useState(false);

  const contactHandler = (event) => {
    event.preventDefault();
    const url = "http://localhost:3000/contact/new";
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: textRef.current.value,
        email: localStorage.getItem("mail"),
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
        setSuccess(true);
      })
      .catch((error) => {
        console.log("error");
      });

    textRef.current.value = "";
    
  };

  console.log(success);

  return (
    <>
      <br />
      <br />
      <h1 class="text-center">
        Contact us! <small class="text-muted">We appreciate any inputs!</small>
      </h1>
      <br />
      {success && (
        <div
          className="alert alert-success"
          style={{ width: 600, margin: "auto", marginTop: 50 }}
          role="alert"
        >
          <h4 className="alert-heading">Message Successfully Sent!</h4>
          <p>We thank you for contacting us! We appreciate your inputs.</p>
        </div>
      )}

      <form className={classes.wrapper} onSubmit={contactHandler}>
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
          Send
        </button>
      </form>
    </>
  );
};

export default ContactsForm;
