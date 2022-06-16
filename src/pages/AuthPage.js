import AuthForm from "../components/Auth/AuthForm";
import classes from "./AuthPage.module.css";

const AuthPage = () => {
  return (
    <div className={classes.super}>
      <h2>aServerConnect</h2>
      <div className={classes.authForm}>
        <AuthForm />
      </div>
    </div>
  );
};

export default AuthPage;
