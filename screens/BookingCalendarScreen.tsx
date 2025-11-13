import { DATE_STATUS_SYMBOLS, DateStatus, STORES } from '@/types/booking';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    Dimensions,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');
const CALENDAR_PADDING = 20;
const DAY_SIZE = (width - CALENDAR_PADDING * 2) / 7;

// Mock 日期狀態數據
const mockDateStatuses: Record<string, DateStatus> = {
  '2025-11-01': 'unavailable',
  '2025-11-02': 'available',
  '2025-11-03': 'pending',
  '2025-11-08': 'booked',
  '2025-11-09': 'available',
  '2025-11-10': 'available',
  '2025-11-13': 'available',
  '2025-11-15': 'unavailable',
  '2025-11-16': 'available',
  '2025-11-17': 'pending',
  '2025-11-22': 'unavailable',
  '2025-11-23': 'available',
  '2025-11-24': 'booked',
  '2025-11-29': 'unavailable',
  '2025-11-30': 'available',
};

const WEEKDAYS = ['日', '月', '火', '水', '木', '金', '土'];

export function BookingCalendarScreen() {
  const router = useRouter();
  const [selectedStore, setSelectedStore] = useState(STORES[0]);
  const [currentDate, setCurrentDate] = useState(new Date(2025, 10, 1)); // 2025年11月
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  // 生成日曆數據
  const generateCalendar = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDay = firstDay.getDay(); // 0-6 (Sunday-Saturday)
    
    const days: Array<{ date: Date | null; dateString: string; status: DateStatus }> = [];
    
    // 填充前面的空白
    for (let i = 0; i < startDay; i++) {
      days.push({ date: null, dateString: '', status: 'unavailable' });
    }
    
    // 填充當月日期
    for (let day = 1; day <= lastDay.getDate(); day++) {
      const date = new Date(year, month, day);
      const dateString = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const status = mockDateStatuses[dateString] || 'available';
      days.push({ date, dateString, status });
    }
    
    // 填充到 42 格 (6週)
    while (days.length < 42) {
      days.push({ date: null, dateString: '', status: 'unavailable' });
    }
    
    return days;
  };

  const handleDateSelect = (dateString: string, status: DateStatus) => {
    if (status === 'available' || status === 'pending') {
      setSelectedDate(dateString);
      
      // 轉換為日文格式
      const date = new Date(dateString);
      const formattedDate = `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
      
      // 導航到預約表單
      router.push({
        pathname: '/booking/form' as any,
        params: {
          storeName: selectedStore.name,
          selectedDate: formattedDate,
        },
      });
    }
  };

  const handlePreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const calendarDays = generateCalendar();

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.backButton}>← 返回</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>預約</Text>
        <View style={{ width: 50 }} />
      </View>

      <ScrollView style={styles.content}>
        {/* 店鋪選擇器 */}
        <View style={styles.storeSelector}>
          <Text style={styles.storeName}>{selectedStore.name}</Text>
        </View>

        {/* 月份切換器 */}
        <View style={styles.monthSelector}>
          <TouchableOpacity onPress={handlePreviousMonth} style={styles.monthArrow}>
            <Text style={styles.monthArrowText}>◀</Text>
          </TouchableOpacity>
          <Text style={styles.monthText}>
            {currentDate.getFullYear()}/{String(currentDate.getMonth() + 1).padStart(2, '0')}
          </Text>
          <TouchableOpacity onPress={handleNextMonth} style={styles.monthArrow}>
            <Text style={styles.monthArrowText}>▶</Text>
          </TouchableOpacity>
        </View>

        {/* 星期標籤 */}
        <View style={styles.weekdayRow}>
          {WEEKDAYS.map((day, index) => (
            <View key={index} style={styles.weekdayCell}>
              <Text style={[
                styles.weekdayText,
                (index === 0 || index === 6) && styles.weekendText
              ]}>
                {day}
              </Text>
            </View>
          ))}
        </View>

        {/* 日期網格 */}
        <View style={styles.calendarGrid}>
          {calendarDays.map((day, index) => {
            const isSelected = day.dateString === selectedDate;
            const isWeekend = index % 7 === 0 || index % 7 === 6;
            const isAvailable = day.date && (day.status === 'available' || day.status === 'pending');
            
            return (
              <TouchableOpacity
                key={index}
                style={[
                  styles.dayCell,
                  isSelected && styles.selectedDay,
                  isAvailable && styles.availableDay,
                ]}
                onPress={() => day.date && handleDateSelect(day.dateString, day.status)}
                disabled={!isAvailable}
              >
                {day.date && (
                  <>
                    <Text style={[
                      styles.dayNumber,
                      isWeekend && styles.weekendDayNumber,
                      day.status === 'booked' && styles.bookedDayNumber,
                      isSelected && styles.selectedDayText,
                    ]}>
                      {day.date.getDate()}
                    </Text>
                    <Text style={[
                      styles.statusSymbol,
                      day.status === 'booked' && styles.bookedSymbol,
                      isSelected && styles.selectedDayText,
                    ]}>
                      {DATE_STATUS_SYMBOLS[day.status]}
                    </Text>
                  </>
                )}
              </TouchableOpacity>
            );
          })}
        </View>

        {/* 圖例 */}
        <View style={styles.legend}>
          <Text style={styles.legendTitle}>狀態說明</Text>
          <View style={styles.legendRow}>
            <View style={styles.legendItem}>
              <Text style={styles.legendSymbol}>○</Text>
              <Text style={styles.legendText}>預訂可能</Text>
            </View>
            <View style={styles.legendItem}>
              <Text style={styles.legendSymbol}>×</Text>
              <Text style={styles.legendText}>休息</Text>
            </View>
            <View style={styles.legendItem}>
              <Text style={styles.legendSymbol}>◎</Text>
              <Text style={styles.legendText}>預約受理</Text>
            </View>
            <View style={styles.legendItem}>
              <Text style={[styles.legendSymbol, styles.bookedSymbol]}>満</Text>
              <Text style={styles.legendText}>預約完畢</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  backButton: {
    fontSize: 16,
    color: '#A0522D',
    width: 50,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  content: {
    flex: 1,
  },
  storeSelector: {
    backgroundColor: '#FFF',
    padding: 16,
    marginBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  storeName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  monthSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#333',
    paddingVertical: 12,
    marginBottom: 8,
  },
  monthArrow: {
    paddingHorizontal: 20,
  },
  monthArrowText: {
    color: '#FFF',
    fontSize: 16,
  },
  monthText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
    minWidth: 100,
    textAlign: 'center',
  },
  weekdayRow: {
    flexDirection: 'row',
    backgroundColor: '#F5F5F5',
    paddingVertical: 8,
  },
  weekdayCell: {
    width: DAY_SIZE,
    alignItems: 'center',
  },
  weekdayText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  weekendText: {
    color: '#D32F2F',
  },
  calendarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: '#FFF',
  },
  dayCell: {
    width: DAY_SIZE,
    height: DAY_SIZE,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: '#E0E0E0',
  },
  availableDay: {
    borderColor: '#66BB6A',
    borderWidth: 1,
  },
  selectedDay: {
    backgroundColor: '#66BB6A',
  },
  dayNumber: {
    fontSize: 16,
    color: '#333',
    marginBottom: 2,
  },
  weekendDayNumber: {
    color: '#D32F2F',
  },
  bookedDayNumber: {
    color: '#D32F2F',
  },
  selectedDayText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  statusSymbol: {
    fontSize: 12,
    color: '#666',
  },
  bookedSymbol: {
    color: '#D32F2F',
    fontWeight: 'bold',
  },
  legend: {
    backgroundColor: '#FFF',
    padding: 16,
    marginTop: 16,
    marginBottom: 32,
  },
  legendTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  legendRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  legendSymbol: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#666',
  },
  legendText: {
    fontSize: 12,
    color: '#666',
  },
});
