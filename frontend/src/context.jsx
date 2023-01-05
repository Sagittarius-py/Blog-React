import { createContext, useState } from "react";

const SessionContext = createContext();

export function SessionProvider({ children }) {
  var [session, setSession] = useState({
    username: "",
    loggedIn: false,
    accessLvl: 0,
  });

  const signIn = (username, accessLvl) => {
    setSession({ username: username, loggedIn: true, accessLvl: accessLvl });
  };

  return (
    <SessionContext.Provider value={{ session, signIn }}>
      {children}
    </SessionContext.Provider>
  );
}

export default SessionContext;
