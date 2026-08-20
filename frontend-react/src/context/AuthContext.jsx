import { createContext, useContext, useState, useEffect } from "react";
import { socket } from "../services/socket";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() =>
    localStorage.getItem("token")
  );

  const [user, setUser] = useState(() =>
    JSON.parse(localStorage.getItem("user") || "null")
  );

  function login(data) {
    setToken(data.token);
    setUser(data.user);
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
    socket.auth = { token: data.token };
    socket.connect();
  }

  function logout() {
    socket.disconnect();
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken && !socket.connected) {
      socket.auth = { token: savedToken };
      socket.connect();
    }
    // PAS de cleanup qui déconnecte
  }, []);

  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
