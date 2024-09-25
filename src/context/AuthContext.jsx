import { createContext, useState, useEffect } from "react";
import AxiosHelper from "../AxiosHelper";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true); // Để kiểm soát trạng thái loading

  const BaseURL = import.meta.env.VITE_SERVER_URL;
  const apiClient = new AxiosHelper(BaseURL);

  useEffect(() => {
    // Kiểm tra xem token có tồn tại không
    const token = localStorage.getItem("accessToken");
    if (token) {
      // Lấy thông tin người dùng từ API
      getUserInfo(token);
    } else {
      setLoading(false); // Nếu không có token, ngừng loading
    }
  }, []);

  // Hàm lấy thông tin người dùng từ API
  const getUserInfo = async (token) => {
    try {
      apiClient.setAccessToken(token); // Đặt token vào AxiosHelper
      const response = await apiClient.get(
        "/authentication/user-infor",
        {},
        {},
        true
      );
      const { data } = response;

      if (data) {
        setUser(data);
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error("Error fetching user info:", error);
      setIsAuthenticated(false);
    } finally {
      setLoading(false); // Kết thúc trạng thái loading
    }
  };

  const login = async (username, password) => {
    try {
      const response = await apiClient.post("/authentication/login", {
        username,
        password,
      });

      const { isSuccess, data, message } = response;

      if (isSuccess === false) {
        return { isSuccess, message };
      }

      const userData = {
        userId: data.userId,
        username: data.username,
        email: data.email,
        role: data.role,
      };

      // Set user data and authentication state
      apiClient.setAccessToken(data.token);
      apiClient.setRefreshToken(data.refreshToken);
      setUser(userData);
      setIsAuthenticated(true);

      // Store user data and tokens in localStorage
      localStorage.setItem("accessToken", data.token);
      localStorage.setItem("refreshToken", data.refreshToken);

      return userData;
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        setUser,
        setIsAuthenticated,
        login,
        logout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
