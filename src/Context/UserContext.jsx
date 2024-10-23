import axios from "axios";
import { useContext, createContext, useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';  
import { server } from "../main";

const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuth, setIsAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  
  async function fetchUser() {
    const token = localStorage.getItem("token");
    if (!token) {
      setIsAuth(false);
      setLoading(false);
      return;
    }
    try {
      const { data } = await axios.get(`${server}/profile`, {
        headers: {
          token,
        },
      });

      setUser(data.user);
      setIsAuth(true);
    
    } catch (error) {
      console.error(error);
      setIsAuth(false);
      
    } finally {
      setLoading(false);
    }
  }

  async function userLogin(email,  navigate) {
    setLoading(true);
    try {
      const { data } = await axios.post(`${server}/login`, {
        email,
        
      });

      localStorage.setItem("token", data.token);
      setUser(data.user);
      setIsAuth(true);
      toast.success(`Welcome ${data.user.username}`);
      
      navigate("/");
    } catch (error) {
      console.error(error);
      toast.error("Login failed. Please check your credentials.");
      setIsAuth(false);
    } finally {
      setLoading(false);
    }
  }

  async function registerUser(username, email,  navigate) {
    setLoading(true);
    try {
      const { data } = await axios.post(`${server}/register`, {
        username,
        email,
        
      });

      toast.success("Registration successful!");
      navigate("/signin");
    } catch (error) {
      console.error(error);
      toast.error("Registration failed.");
    } finally {
      setLoading(false);
    }
  }

 
  useEffect(()=>{
    fetchUser()
  },[])

  return (
    <UserContext.Provider
      value={{
        user,
        loading,
        setUser,
        setIsAuth,
        isAuth,
        userLogin,
        registerUser,
      }}
    >
      {children}
      
      <ToastContainer />
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
