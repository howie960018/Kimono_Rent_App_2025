// 預約記錄介面
export interface BookingRecord {
  id: string;
  storeName: string;
  selectedDate: string;
  customerName: string;
  contactMethod: string;
  contactNumber: string;
  firstChoice: string;
  secondChoice?: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  createdAt: string;
  updatedAt: string;
}

// 預約狀態
export const BOOKING_STATUS = {
  pending: { label: '待確認', color: '#FF9800' },
  confirmed: { label: '已確認', color: '#66BB6A' },
  cancelled: { label: '已取消', color: '#F44336' },
  completed: { label: '已完成', color: '#9E9E9E' },
} as const;

// Mock 預約記錄數據
export const mockBookingRecords: BookingRecord[] = [
  {
    id: '1',
    storeName: '和韻藝廊 川平屋',
    selectedDate: '2025年11月20日',
    customerName: '曾好儀',
    contactMethod: '撥打電話',
    contactNumber: '094838271973',
    firstChoice: '活動、展示會參觀預約',
    secondChoice: '和服穿著教室預約',
    status: 'confirmed',
    createdAt: '2025-11-13T10:30:00',
    updatedAt: '2025-11-13T14:00:00',
  },
  {
    id: '2',
    storeName: '和韻藝廊 川平屋',
    selectedDate: '2025年11月15日',
    customerName: '曾好儀',
    contactMethod: '撥打電話',
    contactNumber: '094838271973',
    firstChoice: '和服租借',
    status: 'pending',
    createdAt: '2025-11-12T09:15:00',
    updatedAt: '2025-11-12T09:15:00',
  },
  {
    id: '3',
    storeName: '和服館 東京店',
    selectedDate: '2025年10月28日',
    customerName: '曾好儀',
    contactMethod: 'Email',
    contactNumber: 'howie960018@gmail.com',
    firstChoice: '穿著服務',
    status: 'completed',
    createdAt: '2025-10-20T16:45:00',
    updatedAt: '2025-10-28T18:00:00',
  },
];
