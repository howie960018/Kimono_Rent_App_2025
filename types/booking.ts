// 預約狀態介面
export interface BookingState {
  // 步驟 1: 日期選擇
  storeName: string;
  selectedDate: string;
  
  // 步驟 2: 內容填寫
  customerName: string;
  contactMethod: string;
  contactNumber: string;
  firstChoice: string;
  secondChoice?: string;
  memo?: string;
}

// 日期狀態類型
export type DateStatus = 'available' | 'unavailable' | 'pending' | 'booked';

// 日期狀態標記
export const DATE_STATUS_SYMBOLS = {
  available: '○',      // 預訂可能
  unavailable: '×',    // 休息/不可預約
  pending: '◎',        // 預約受理
  booked: '満',        // 預約完畢
} as const;

// 聯絡方式選項
export const CONTACT_METHODS = [
  { label: '撥打電話', value: 'phone' },
  { label: 'Email', value: 'email' },
  { label: 'LINE', value: 'line' },
] as const;

// 預約意願選項
export const BOOKING_CHOICES = [
  '活動、展示會參觀預約',
  '和服穿著教室預約',
  '和服租借',
  '穿著服務',
  '其他',
] as const;

// 店鋪列表
export const STORES = [
  { id: '1', name: '和韻藝廊 川平屋', phone: '03-1234-5678' },
  { id: '2', name: '和服館 東京店', phone: '03-8765-4321' },
] as const;

// 預約備註/提醒
export const STORE_MEMOS: Record<string, string> = {
  '和韻藝廊 川平屋': '和服穿著教室開課時間為每週四及週日。',
};
