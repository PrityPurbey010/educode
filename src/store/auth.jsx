// import { response } from "express";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [services, setServices] = useState([]);
  const AuthorizationToken = `Bearer ${token}`;

  const storeTokenInLS = (serverToken) => {
    setToken(serverToken);
    return localStorage.setItem("token", serverToken);
  };

  let isLoggedIn = !!token;

  const LogoutUser = () => {
    setToken("");
    return localStorage.removeItem("token");
  };

  const userAuthentication = useCallback(async () => {
    if (!token) {
      setUser("");
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      const respone = await fetch("http://localhost:3000/api/auth/user", {
        method: "GET",
        headers: {
          Authorization: AuthorizationToken,
        },
      });

      if (respone.ok) {
        const data = await respone.json();
        setUser(data.userData);
      } else {
        setUser("");
      }
    } catch (error) {
      console.log("Error fetching user data", error);
      setUser("");
    } finally {
      setIsLoading(false);
    }
  }, [AuthorizationToken, token]);

  // to fetch the services data from the database
  const getServices = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/data/service", {
        method: "GET",
      });
      if (response.ok) {
        const data = await response.json();
        const updatedData = data?.message?.map((item, index) => {
          return {
            ...item,
            courseImg: `/image/img${index + 1}.jpg`,
          };
        });

        setServices(updatedData);
      }
    } catch (error) {
      console.log(` service frontend error: ${error}`);
    }
  };

  useEffect(() => {
    getServices();
  }, []);

  useEffect(() => {
    userAuthentication();
  }, [userAuthentication]);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        storeTokenInLS,
        LogoutUser,
        user,
        services,
        AuthorizationToken,
        isLoading,
        userAuthentication,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const authContextValue = useContext(AuthContext);
  if (!authContextValue) {
    throw new Error("useAuth used outside of the Provider");
  }
  return authContextValue;
};
