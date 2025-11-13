import AsyncStorage from '@react-native-async-storage/async-storage';

const TOKEN_KEY = '@auth_token';
const USER_KEY = '@user_data';

// Token 管理
export const tokenStorage = {
  // 儲存 token
  async setToken(token: string): Promise<void> {
    try {
      await AsyncStorage.setItem(TOKEN_KEY, token);
    } catch (error) {
      console.error('儲存 token 失敗:', error);
      throw error;
    }
  },

  // 取得 token
  async getToken(): Promise<string | null> {
    try {
      return await AsyncStorage.getItem(TOKEN_KEY);
    } catch (error) {
      console.error('取得 token 失敗:', error);
      return null;
    }
  },

  // 移除 token
  async removeToken(): Promise<void> {
    try {
      await AsyncStorage.removeItem(TOKEN_KEY);
    } catch (error) {
      console.error('移除 token 失敗:', error);
      throw error;
    }
  },
};

// 使用者資料管理
export const userStorage = {
  // 儲存使用者資料
  async setUser(user: any): Promise<void> {
    try {
      await AsyncStorage.setItem(USER_KEY, JSON.stringify(user));
    } catch (error) {
      console.error('儲存使用者資料失敗:', error);
      throw error;
    }
  },

  // 取得使用者資料
  async getUser(): Promise<any | null> {
    try {
      const userData = await AsyncStorage.getItem(USER_KEY);
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      console.error('取得使用者資料失敗:', error);
      return null;
    }
  },

  // 移除使用者資料
  async removeUser(): Promise<void> {
    try {
      await AsyncStorage.removeItem(USER_KEY);
    } catch (error) {
      console.error('移除使用者資料失敗:', error);
      throw error;
    }
  },
};

// 清除所有認證資料
export const clearAuthData = async (): Promise<void> => {
  try {
    await Promise.all([
      tokenStorage.removeToken(),
      userStorage.removeUser(),
    ]);
  } catch (error) {
    console.error('清除認證資料失敗:', error);
    throw error;
  }
};
