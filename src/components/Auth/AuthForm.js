import { useState, useRef, useContext } from "react";
import classes from "./AuthForm.module.css";
import AuthContext from "../../store/auth-context";

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [signupSuccess, setSignupSuccess] = useState(false);
  const [authAttemptFail, setAuthAttemptFail] = useState(false);
  const authCtx = useContext(AuthContext);
  console.log("AuthForm", authCtx.isLoggedIn);

  const emailRef = useRef();
  const passwordRef = useRef();
  const f_nameRef = useRef();
  const l_nameRef = useRef();

  const clearRefs = () => {
    if (!isLogin) {
      f_nameRef.current.value = "";
      l_nameRef.current.value = "";
    }
    passwordRef.current.value = "";
    emailRef.current.value = "";
  };

  const signUpHandler = () => {
    clearRefs();
    setSignupSuccess(false);
    setIsLogin((prevState) => !prevState);
    setAuthAttemptFail(false);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    let f_name, l_name;
    if (!isLogin) {
      f_name = f_nameRef.current.value;
      l_name = l_nameRef.current.value;
    }

    let userInput = {
      email: email,
      password: password,
    };

    console.log(userInput);

    let url;

    if (!isLogin) {
      userInput = {
        ...userInput,
        fname: f_name,
        lname: l_name,
      };
      url = "http://localhost:3000/user/signup";
    } else {
      url = "http://localhost:3000/user/login";
    }

    fetch(url, {
      method: "POST",
      body: JSON.stringify(
        userInput
      ),
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
        if (!isLogin) {
          console.log(data);
          if (data.status) {
            setAuthAttemptFail(true);
          } else {
            setSignupSuccess(true);
            setAuthAttemptFail(false);
          }
        } else {
          console.log(data.status);
          const status = data.status;

          if (status === "false") {
            setAuthAttemptFail(true);
          } else {
            // login and show new pages using ctx.
            localStorage.setItem("mail", email); // I know this is REALLY bad, espcially since this is usinga REST api, but just doing this to save time. 
            authCtx.login();
          }
        }
      })
      .catch((error) => {
        console.log("error");
      });
    
      clearRefs();

    if (!isLogin && authAttemptFail) {
      signUpHandler();
    }
  };

  return (
    <>
      {signupSuccess && (
        <div
          className="alert alert-success"
          style={{ width: 600, margin: "auto", marginTop: 50 }}
          role="alert"
        >
          <h4 className="alert-heading">Sign Up Success!</h4>
          <p>Please log in using your credentials!</p>
        </div>
      )}
      {authAttemptFail && (
        <div
          class="alert alert-danger"
          role="alert"
          style={{ width: 600, margin: "auto", marginTop: 50 }}
        >
          {isLogin && (
            <>
              <h4 className="alert-heading">Log in failed</h4>
              <p>Please enter correct credentials</p>
            </>
          )}
          {!isLogin && (
            <>
              <h4 className="alert-heading">Sign up failed</h4>
              <p>There's already an account with the same email</p>
            </>
          )}
        </div>
      )}
      <form className={classes.authForm} onSubmit={submitHandler}>
        {isLogin && <h3>Log in</h3>}
        {!isLogin && <h3>Sign up</h3>}
        <div className="mb-3">
          <label>Email address</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            ref={emailRef}
          />
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            ref={passwordRef}
          />
        </div>
        {!isLogin && (
          <div>
            <div className="mb-3">
              <label>First Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter First Name"
                ref={f_nameRef}
              />
            </div>
            <div className="mb-3">
              <label>Last Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Last Name"
                ref={l_nameRef}
              />
            </div>
          </div>
        )}

        <div className="d-grid">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
        <div className="mb-3">
          {isLogin && (
            <label className={classes.label}>
              No Account? Sign up <a onClick={signUpHandler}>here!</a>
            </label>
          )}
          {!isLogin && (
            <label className={classes.label}>
              Already have an account? Log in{" "}
              <a onClick={signUpHandler}>here!</a>
            </label>
          )}
        </div>
      </form>
    </>
  );
};

export default AuthForm;
