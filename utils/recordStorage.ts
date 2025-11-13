import { Record } from '@/types/record';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@kimono_records';

export const saveRecord = async (record: Record): Promise<void> => {
  try {
    const existing = await getRecords();
    const updated = [...existing, record];
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (error) {
    console.error('保存記錄失敗:', error);
    throw error;
  }
};

export const getRecords = async (): Promise<Record[]> => {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('讀取記錄失敗:', error);
    return [];
  }
};

export const updateRecord = async (id: string, updatedRecord: Record): Promise<void> => {
  try {
    const records = await getRecords();
    const index = records.findIndex((r) => r.id === id);
    if (index !== -1) {
      records[index] = updatedRecord;
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(records));
    }
  } catch (error) {
    console.error('更新記錄失敗:', error);
    throw error;
  }
};

export const deleteRecord = async (id: string): Promise<void> => {
  try {
    const records = await getRecords();
    const filtered = records.filter((r) => r.id !== id);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  } catch (error) {
    console.error('刪除記錄失敗:', error);
    throw error;
  }
};
