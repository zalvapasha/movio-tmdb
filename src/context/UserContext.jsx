import React, { useState, createContext } from "react";

export const UserContext = createContext();

export const UserProvider = props => {
  const currentUser = JSON.parse(localStorage.getItem("user"))
  const [user, setUser] = useState(currentUser);

  const loginContext = currentUser => {
    localStorage.setItem("user", JSON.stringify(currentUser));
    setUser(currentUser);
  };

  const logoutContext = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <UserContext.Provider value={{user, setUser, loginContext, logoutContext}}>
      {props.children}
    </UserContext.Provider>
  );
};