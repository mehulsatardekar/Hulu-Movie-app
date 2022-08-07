import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../../supabaseClient";

const Authentication = createContext(null);

const AuthContextData = ({ children }) => {
  const userToken = JSON.parse(localStorage.getItem("supabase.auth.token"));
  const session = supabase.auth.session();

  const [currentUser, setCurrentUser] = useState(
    userToken ? userToken.currentSession : null
  );

  useEffect(() => {
    if (session === null) {
      setCurrentUser(session);
    }

    const subscriber = supabase.auth.onAuthStateChange((event, session) => {
      switch (event) {
        case "SIGNED_OUT":
          // eslint-disable-next-line no-lone-blocks
          {
            if (session == null) {
              setCurrentUser(session);
            }
          }
          break;
        case "SIGNED_IN":
          // eslint-disable-next-line no-lone-blocks
          {
            if (session == null) {
              setCurrentUser(session);
            }
          }
          break;

        default:
          console.log("no change in event");
      }
    });

    return () => {
      // eslint-disable-next-line no-unused-expressions
      subscriber;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setCurrentUser, currentUser]);

  //console.log(currentUser?.currentSession.user.id)
  return (
    <Authentication.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </Authentication.Provider>
  );
};

const useAuth = () => useContext(Authentication);

export { AuthContextData, useAuth };
