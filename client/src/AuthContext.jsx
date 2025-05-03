import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const refreshToken = async () => {
    const response = await fetch('/auth/generatetoken', {
      method: 'POST',
      credentials: 'include',
    });
  
    if (!response.ok) throw new Error('Token refresh failed');
  
    const data = await response.json();
    return data.token;
  };

  const decodeTokenPayload = (token) => {
    if (!token || typeof token !== 'string') return null;
    
    try {
      const parts = token.split('.');
      if (parts.length !== 3) return null;
      
      const decoded = atob(parts[1].replace(/-/g, '+').replace(/_/g, '/'));
      return JSON.parse(decoded);
    } catch (error) {
      console.error('Token decoding failed:', error);
      return null;
    }
  };

  const [user, setUser] = useState(decodeTokenPayload(token));

  const isTokenValid = (token) => {
    const payload = decodeTokenPayload(token);
    if (!payload || !payload.exp) return false;
    
    return payload.exp * 1000 > Date.now();
  };
  
  const isTokenExpiringSoon = (token) => {
    const payload = decodeTokenPayload(token);
    if (!payload || !payload.exp) return true;
    
    return payload.exp * 1000 - Date.now() < 15 * 60 * 1000;
  };
  
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const storedToken = localStorage.getItem('token');
        
        if (storedToken) {
          if (isTokenValid(storedToken)) {
            setToken(storedToken);
            setUser(decodeTokenPayload(storedToken));

            if (isTokenExpiringSoon(storedToken)) {
              try {
                const newToken = await refreshToken();
                localStorage.setItem('token', newToken);
                setToken(newToken);
                setUser(decodeTokenPayload(newToken));
              } catch (refreshError) {
                console.log("Token refresh failed", refreshError);
              }
            }
          } else {
            localStorage.removeItem('token');
            setToken(null);
            setUser(null);
          }
        }
      } catch (error) {
        console.error("Auth initialization failed", error);
      } finally {
        setIsInitialized(true);
        setIsLoading(false);
      }
    };
  
    console.log("Decoded token:", decodeTokenPayload(token));

    initializeAuth();
  
    const interval = setInterval(() => {
      const currentToken = localStorage.getItem('token');
      if (currentToken && isTokenExpiringSoon(currentToken)) {
        refreshToken().then(newToken => {
          localStorage.setItem('token', newToken);
          setToken(newToken);
          setUser(decodeTokenPayload(newToken));
        }).catch (console.error);
      }
    }, 300000); // 5 minutes
  
    console.log("Decoded token payload:", decodeTokenPayload(token));

    return () => clearInterval(interval);
  }, []);


  const login = (newToken) => {
    console.log("Storing token:", newToken);
    if (!newToken) {
      console.error("Attempted to store undefined token");
      return Promise.reject("Invalid token");
    }
    localStorage.setItem('token', newToken);
    setToken(newToken);
    const decoded = decodeTokenPayload(newToken);
    setUser(decoded);
    return Promise.resolve();
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  };

  const value = { 
    token,
    user,
    login, 
    logout, 
    isLoading,
    isAuthenticated: !!token,
    isInitialized
  };

  return (
    <AuthContext.Provider value={value}>
      {!isInitialized ? <div>Loading...</div> : children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};