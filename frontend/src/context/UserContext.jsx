import { createContext, useContext, useState } from "react";
import { StoreContext } from "./StoreContext";

export const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  const { serverURL } = useContext(StoreContext);
  const [authToken, setAuthToken] = useState(localStorage.getItem("authToken"));
  const [User, setUser] = useState({
    user: JSON.parse(localStorage.getItem("user")) || null,
    admin: JSON.parse(localStorage.getItem("admin")) || null,
  });

  const loginUser = async (email, password) => {
    if (!email || !password) {
      throw new Error("Please fill in both email and password.");
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new Error("Please enter a valid email address.");
    }
    const response = await fetch(`${serverURL}/api/user/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Login failed");
    }
    if (data.success) {
      const userData = {
        email,
        role: data.role,
        id: data.id || null,
      };
      if (data.role === "admin") {
        setUser({ user: null, admin: userData });
        localStorage.removeItem("user");
        localStorage.setItem("admin", JSON.stringify(userData));
      } else if (data.role === "user") {
        setUser({ user: userData, admin: null });
        localStorage.removeItem("admin");
        localStorage.setItem("user", JSON.stringify(userData));
      }
      setAuthToken(data.token);
      localStorage.setItem("authToken", data.token);
      return true;
    } else {
      throw new Error(data.message || "Invalid login credentials");
    }
  };

  const logoutUser = () => {
    setUser({ user: null, admin: null });
    localStorage.removeItem("user");
    localStorage.removeItem("admin");
  };

  return (
    <UserContext.Provider value={{ User, loginUser, logoutUser, authToken, setAuthToken }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;