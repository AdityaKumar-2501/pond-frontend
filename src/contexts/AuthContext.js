import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = process.env.EXPO_PUBLIC_API_URL || 'http://192.168.31.21:3000/api';
console.log('API_URL:', process.env.EXPO_PUBLIC_API_URL);
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState(null);
  const [error, setError] = useState(null);

  const login = async (email, password) => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await axios.post(`${API_URL}/login`, {
        email,
        password
      });

      const { token } = response.data;
      
      await AsyncStorage.setItem('userToken', token);
      setUserToken(token);
      console.log('Login successful:', token);
      return true;
    } catch (error) {
      setError(error.response?.data?.message || 'An error occurred during login');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (name, email, password) => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await axios.post(`${API_URL}/signup`, {
        name,
        email,
        password
      });

      return true;
    } catch (error) {
      setError(error.response?.data?.message || 'An error occurred during signup');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('userToken');
      setUserToken(null);
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  const isLoggedIn = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      setUserToken(token);
      return !!token;
    } catch (error) {
      console.error('Error checking auth state:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };


  const clearError = () => setError(null);

  return (
    <AuthContext.Provider 
      value={{
        isLoading,
        userToken,
        error,
        login,
        signup,
        logout,
        isLoggedIn,
        clearError,
      }}
    >
      {children}
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