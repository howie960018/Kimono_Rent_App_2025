import { tokenStorage } from '@/utils/storage';
import axios from 'axios';
import Constants from 'expo-constants';

// 取得本機 IP（從 Expo manifest 中取得）
const getApiUrl = () => {
  // 在開發環境使用 Expo 的 hostUri
  const debuggerHost = Constants.expoConfig?.hostUri;
  if (debuggerHost) {
    const host = debuggerHost.split(':').shift();
    return `http://${host}:3000/api`;
  }
  // 降級使用 localhost（僅供網頁版）
  return 'http://localhost:3000/api';
};

// 設定 API 基礎 URL
const API_URL = getApiUrl();

console.log('📡 API URL:', API_URL);

// 建立 axios 實例
const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 請求攔截器：自動附加 token
api.interceptors.request.use(
  async (config) => {
    const token = await tokenStorage.getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 回應攔截器：處理 401 未授權
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Token 過期或無效，清除本地資料
      await tokenStorage.removeToken();
    }
    return Promise.reject(error);
  }
);

// 註冊 API
export const registerUser = async (userData: {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}) => {
  try {
    console.log('🔵 開始註冊，發送資料:', { ...userData, password: '***', confirmPassword: '***' });
    console.log('🔵 API URL:', `${API_URL}/auth/register`);
    const response = await api.post('/auth/register', userData);
    console.log('✅ 註冊成功，回應:', response.data);
    return { success: true, data: response.data };
  } catch (error: any) {
    console.error('❌ 註冊失敗');
    console.error('錯誤狀態碼:', error.response?.status);
    console.error('錯誤訊息:', error.response?.data);
    console.error('完整錯誤:', error.message);
    return {
      success: false,
      error: error.response?.data?.error || error.response?.data?.message || '註冊失敗，請稍後再試',
    };
  }
};

// 登入 API
export const loginUser = async (credentials: {
  email: string;
  password: string;
}) => {
  try {
    console.log('🔵 開始登入，發送資料:', { email: credentials.email, password: '***' });
    console.log('🔵 API URL:', `${API_URL}/auth/login`);
    const response = await api.post('/auth/login', credentials);
    console.log('✅ 登入成功，回應:', { ...response.data, token: '***' });
    return { success: true, data: response.data };
  } catch (error: any) {
    console.error('❌ 登入失敗');
    console.error('錯誤狀態碼:', error.response?.status);
    console.error('錯誤訊息:', error.response?.data);
    console.error('完整錯誤:', error.message);
    return {
      success: false,
      error: error.response?.data?.error || error.response?.data?.message || '登入失敗，請檢查帳號密碼',
    };
  }
};

// 取得使用者個人資料 API（使用 token）
export const getUserProfile = async () => {
  try {
    const response = await api.get('/users/profile');
    return { success: true, data: response.data };
  } catch (error: any) {
    return {
      success: false,
      error: error.response?.data?.message || '無法取得使用者資料',
    };
  }
};

// 更新使用者資料 API（使用 token）
export const updateUserProfile = async (userData: {
  fullName?: string;
  phone?: string;
  birthday?: string;
  address?: string;
}) => {
  try {
    const response = await api.put('/users/profile', userData);
    return { success: true, data: response.data };
  } catch (error: any) {
    return {
      success: false,
      error: error.response?.data?.message || '更新失敗，請稍後再試',
    };
  }
};

// 更改密碼 API
export const changePassword = async (
  currentPassword: string,
  newPassword: string
) => {
  try {
    const response = await api.put('/users/change-password', {
      currentPassword,
      newPassword,
    });
    return { success: true, data: response.data };
  } catch (error: any) {
    return {
      success: false,
      error: error.response?.data?.message || '更改密碼失敗',
    };
  }
};

// 刪除帳號 API
export const deleteAccount = async () => {
  try {
    const response = await api.delete('/users/profile');
    return { success: true, data: response.data };
  } catch (error: any) {
    return {
      success: false,
      error: error.response?.data?.message || '刪除帳號失敗',
    };
  }
};

// 舊的 API 保留以兼容
export const updateUser = async (
  userId: string,
  userData: {
    fullName?: string;
    phone?: string;
    birthday?: string;
    address?: string;
  }
) => {
  return updateUserProfile(userData);
};

// 取得使用者資料 API
export const getUser = async (userId: string) => {
  return getUserProfile();
};

export default api;
