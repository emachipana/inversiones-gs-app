import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import apiFetch from "../services/apiFetch";
import * as session from "../services/sessions";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetch = async () => {
      try {
        const user = await apiFetch("users/profile/info");
        setUser(user);
        setIsLoading(false);
      }catch(e) {
        console.error(e);

        setIsLoading(false);
      }
    }

    fetch();
  }, []);

  const login = async (credentials) => {
    try {
      const user = await session.login(credentials);
      setUser(user);
      navigate("/");

      return user;
    }catch(e) {
      console.error(e);

      setError(e.message);
    }
  }

  const logout = async () => {
    await session.logout();

    setUser(null);
    setError(null);
    navigate("/login");
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        error,
        isLoading,
        setUser,
        setError,
        setIsLoading,
        login,
        logout
      }}
    >
      { children }
    </AuthContext.Provider>
  )
} 

const useAuth = () => {
  return useContext(AuthContext);
}

export { AuthProvider, useAuth };
