import { loginUser as apiLogin, registerUser as apiRegister } from '@/services/api';
import { clearAuthData, tokenStorage, userStorage } from '@/utils/storage';
import React, { createContext, useContext, useEffect, useState } from 'react';

interface User {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  memberLevel?: string;
  points?: number;
  birthday?: string;
  address?: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (userData: {
    fullName: string;
    email: string;
    phone: string;
    password: string;
    confirmPassword: string;
  }) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  updateUser: (userData: Partial<User>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // 初始化時載入已儲存的認證資料
  useEffect(() => {
    loadAuthData();
  }, []);

  const loadAuthData = async () => {
    try {
      const [savedToken, savedUser] = await Promise.all([
        tokenStorage.getToken(),
        userStorage.getUser(),
      ]);

      if (savedToken && savedUser) {
        setToken(savedToken);
        setUser(savedUser);
      }
    } catch (error) {
      console.error('載入認證資料失敗:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const result = await apiLogin({ email, password });

      if (result.success && result.data) {
        const { token: newToken, user: userData } = result.data;

        // 儲存到 state
        setToken(newToken);
        setUser(userData);

        // 儲存到 AsyncStorage
        await Promise.all([
          tokenStorage.setToken(newToken),
          userStorage.setUser(userData),
        ]);

        return { success: true };
      }

      return { success: false, error: result.error };
    } catch (error: any) {
      console.error('登入錯誤:', error);
      return { success: false, error: '登入失敗，請稍後再試' };
    }
  };

  const register = async (userData: {
    fullName: string;
    email: string;
    phone: string;
    password: string;
    confirmPassword: string;
  }) => {
    try {
      const result = await apiRegister(userData);

      if (result.success && result.data) {
        const { token: newToken, user: newUser } = result.data;

        // 儲存到 state
        setToken(newToken);
        setUser(newUser);

        // 儲存到 AsyncStorage
        await Promise.all([
          tokenStorage.setToken(newToken),
          userStorage.setUser(newUser),
        ]);

        return { success: true };
      }

      return { success: false, error: result.error };
    } catch (error: any) {
      console.error('註冊錯誤:', error);
      return { success: false, error: '註冊失敗，請稍後再試' };
    }
  };

  const logout = async () => {
    try {
      // 清除 state
      setUser(null);
      setToken(null);

      // 清除 AsyncStorage
      await clearAuthData();
    } catch (error) {
      console.error('登出錯誤:', error);
      throw error;
    }
  };

  const updateUser = async (userData: Partial<User>) => {
    try {
      if (!user) return;

      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      await userStorage.setUser(updatedUser);
    } catch (error) {
      console.error('更新使用者資料錯誤:', error);
      throw error;
    }
  };

  const value = {
    user,
    token,
    isLoading,
    isAuthenticated: !!user && !!token,
    login,
    register,
    logout,
    updateUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth 必須在 AuthProvider 內使用');
  }
  return context;
}
