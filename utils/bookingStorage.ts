import { BookingRecord } from '@/types/bookingRecord';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BOOKINGS_KEY = '@bookings';

// 保存預約記錄
export const saveBooking = async (booking: Omit<BookingRecord, 'id' | 'createdAt' | 'updatedAt' | 'status'>): Promise<BookingRecord> => {
  try {
    const bookings = await getBookings();
    
    const newBooking: BookingRecord = {
      ...booking,
      id: Date.now().toString(),
      status: 'pending', // 所有新預約都是待確認
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    const updatedBookings = [newBooking, ...bookings];
    await AsyncStorage.setItem(BOOKINGS_KEY, JSON.stringify(updatedBookings));
    
    return newBooking;
  } catch (error) {
    console.error('保存預約失敗:', error);
    throw error;
  }
};

// 獲取所有預約記錄
export const getBookings = async (): Promise<BookingRecord[]> => {
  try {
    const data = await AsyncStorage.getItem(BOOKINGS_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('獲取預約記錄失敗:', error);
    return [];
  }
};

// 更新預約狀態
export const updateBookingStatus = async (
  bookingId: string,
  status: BookingRecord['status']
): Promise<void> => {
  try {
    const bookings = await getBookings();
    const updatedBookings = bookings.map(booking =>
      booking.id === bookingId
        ? { ...booking, status, updatedAt: new Date().toISOString() }
        : booking
    );
    await AsyncStorage.setItem(BOOKINGS_KEY, JSON.stringify(updatedBookings));
  } catch (error) {
    console.error('更新預約狀態失敗:', error);
    throw error;
  }
};

// 取消預約
export const cancelBooking = async (bookingId: string): Promise<void> => {
  return updateBookingStatus(bookingId, 'cancelled');
};

// 刪除預約
export const deleteBooking = async (bookingId: string): Promise<void> => {
  try {
    const bookings = await getBookings();
    const updatedBookings = bookings.filter(booking => booking.id !== bookingId);
    await AsyncStorage.setItem(BOOKINGS_KEY, JSON.stringify(updatedBookings));
  } catch (error) {
    console.error('刪除預約失敗:', error);
    throw error;
  }
};

// 清除所有預約（測試用）
export const clearAllBookings = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(BOOKINGS_KEY);
  } catch (error) {
    console.error('清除預約記錄失敗:', error);
    throw error;
  }
};
