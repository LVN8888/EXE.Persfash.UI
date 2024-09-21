
import { createContext, useState, useEffect } from 'react';
import AxiosHelper from '../AxiosHelper';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);

    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        const token = localStorage.getItem('accessToken');
        if (storedUser && token) {
          setUser(JSON.parse(storedUser));
          setIsAuthenticated(true);
        }
      }, []);

      const apiClinet = new AxiosHelper( 'https://localhost:7126/api');

      const login = async (username, password) => {
        try {
            const response = await apiClinet.post('/authentication/login', {
                username,
                password,
            });

            console.log(response);

            const { isSuccess, data, message } = response;

            if (isSuccess === false) {                
                console.log(response);
                return { isSuccess, message };
            }

            const userData = {
                userId: data.userId,
                username: data.username,
                email: data.email,
                role: data.role,
            };

            // Set user data and authentication state
            apiClinet.setAccessToken(data.token);
            apiClinet.setRefreshToken(data.refreshToken);
            setUser(userData);
            setIsAuthenticated(true);

            // Store user data and tokens in localStorage
            localStorage.setItem('user', JSON.stringify(userData));
            localStorage.setItem('accessToken', data.token); // Store access token
            localStorage.setItem('refreshToken', data.refreshToken); // Store refresh token

            return response;
        } catch (error) {
            console.error('Login failed:', error);
            throw error;
        }
    };

      const logout = () => {
        setUser(null);
        setIsAuthenticated(false);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
      };

      return (
        <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
          {children}
        </AuthContext.Provider>
      );
}