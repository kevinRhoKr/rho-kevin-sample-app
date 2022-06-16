import React, { useState } from "react";

const AuthContext = React.createContext({
  login: () => {},
  logout: () => {},
  isLoggedIn: false,
});

const retrieveLoggedStatus = () => {
  const storedStatus = localStorage.getItem("logged in");
  return storedStatus;
};

export const AuthContextProvider = (props) => {
  const status = retrieveLoggedStatus();
  const [isLogged, setIsLogged] = useState(status);

  const loginHandler = () => {
    localStorage.setItem("logged in", true);
    setIsLogged(true);
  };

  const logoutHandler = () => {
    localStorage.removeItem("logged in");
    localStorage.removeItem("mail"); // I know this is REALLY bad, espcially since this is usinga REST api, but just doing this to save time. 
    setIsLogged(false);
  };

  const contextValue = {
    login: loginHandler,
    logout: logoutHandler,
    isLoggedIn: isLogged,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
