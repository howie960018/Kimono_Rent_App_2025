import { BOOKING_STATUS, BookingRecord } from '@/types/bookingRecord';
import { cancelBooking, getBookings } from '@/utils/bookingStorage';
import { useFocusEffect, useLocalSearchParams, useRouter } from 'expo-router';
import React, { useCallback, useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    Linking,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export function BookingDetailScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const bookingId = params.bookingId as string;
  const [booking, setBooking] = useState<BookingRecord | null>(null);
  const [loading, setLoading] = useState(true);

  const loadBooking = async () => {
    try {
      const bookings = await getBookings();
      const found = bookings.find(b => b.id === bookingId);
      setBooking(found || null);
    } catch (error) {
      console.error('載入預約詳情失敗:', error);
    } finally {
      setLoading(false);
    }
  };

  // 頁面聚焦時重新載入數據
  useFocusEffect(
    useCallback(() => {
      loadBooking();
    }, [bookingId])
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Text style={styles.backButton}>← 返回</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>預約詳情</Text>
          <View style={{ width: 50 }} />
        </View>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#D2B48C" />
        </View>
      </SafeAreaView>
    );
  }

  if (!booking) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Text style={styles.backButton}>← 返回</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>預約詳情</Text>
          <View style={{ width: 50 }} />
        </View>
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>找不到預約記錄</Text>
        </View>
      </SafeAreaView>
    );
  }

  const handleCall = () => {
    if (booking.contactMethod === '撥打電話') {
      Linking.openURL(`tel:${booking.contactNumber}`);
    }
  };

  const handleCancel = async () => {
    Alert.alert(
      '取消預約',
      '您確定要取消這個預約嗎？',
      [
        { text: '不取消', style: 'cancel' },
        {
          text: '確定取消',
          style: 'destructive',
          onPress: async () => {
            try {
              // 調用取消預約
              await cancelBooking(bookingId);
              Alert.alert('成功', '預約已取消', [
                {
                  text: '確定',
                  onPress: () => {
                    // 重新載入數據以顯示更新後的狀態
                    loadBooking();
                  },
                },
              ]);
            } catch (error) {
              Alert.alert('錯誤', '取消預約失敗，請稍後再試');
              console.error('取消預約失敗:', error);
            }
          },
        },
      ]
    );
  };

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}/${String(date.getMonth() + 1).padStart(2, '0')}/${String(date.getDate()).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.backButton}>← 返回</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>預約詳情</Text>
        <View style={{ width: 50 }} />
      </View>

      <ScrollView style={styles.content}>
        {/* 狀態卡片 */}
        <View style={styles.statusCard}>
          <View
            style={[
              styles.statusBadgeLarge,
              { backgroundColor: BOOKING_STATUS[booking.status].color },
            ]}
          >
            <Text style={styles.statusTextLarge}>
              {BOOKING_STATUS[booking.status].label}
            </Text>
          </View>
          <Text style={styles.bookingId}>預約編號：{booking.id}</Text>
        </View>

        {/* 預約資訊 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>預約資訊</Text>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>預約日期</Text>
            <Text style={styles.detailValue}>{booking.selectedDate}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>店鋪</Text>
            <Text style={styles.detailValue}>{booking.storeName}</Text>
          </View>
        </View>

        <View style={styles.divider} />

        {/* 客戶資訊 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>客戶資訊</Text>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>姓名</Text>
            <Text style={styles.detailValue}>{booking.customerName}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>聯絡方式</Text>
            <Text style={styles.detailValue}>{booking.contactMethod}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>聯絡電話</Text>
            <TouchableOpacity onPress={handleCall}>
              <Text style={styles.detailValueLink}>{booking.contactNumber}</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.divider} />

        {/* 預約內容 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>預約內容</Text>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>第一意願</Text>
            <Text style={styles.detailValue}>{booking.firstChoice}</Text>
          </View>
          {booking.secondChoice && (
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>第二意願</Text>
              <Text style={styles.detailValue}>{booking.secondChoice}</Text>
            </View>
          )}
        </View>

        <View style={styles.divider} />

        {/* 預約時間記錄 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>時間記錄</Text>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>申請時間</Text>
            <Text style={styles.detailValueSmall}>
              {formatDateTime(booking.createdAt)}
            </Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>更新時間</Text>
            <Text style={styles.detailValueSmall}>
              {formatDateTime(booking.updatedAt)}
            </Text>
          </View>
        </View>

        {/* 提醒訊息 */}
        {booking.status === 'pending' && (
          <View style={styles.noticeBox}>
            <Text style={styles.noticeText}>
              ※ 您的預約正在處理中，我們將在 3 個工作日內與您聯繫確認。
            </Text>
          </View>
        )}

        {booking.status === 'confirmed' && (
          <View style={styles.confirmBox}>
            <Text style={styles.confirmText}>
              ✓ 您的預約已確認，請準時到店體驗。如需取消或變更，請提前聯絡我們。
            </Text>
          </View>
        )}
      </ScrollView>

      {/* 操作按鈕 */}
      {(booking.status === 'pending' || booking.status === 'confirmed') && (
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.callButton}
            onPress={handleCall}
          >
            <Text style={styles.callButtonText}>📞 聯絡店家</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={handleCancel}
          >
            <Text style={styles.cancelButtonText}>取消預約</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
  statusCard: {
    backgroundColor: '#FFF',
    padding: 20,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  statusBadgeLarge: {
    paddingHorizontal: 24,
    paddingVertical: 8,
    borderRadius: 20,
    marginBottom: 12,
  },
  statusTextLarge: {
    fontSize: 16,
    color: '#FFF',
    fontWeight: 'bold',
  },
  bookingId: {
    fontSize: 13,
    color: '#999',
  },
  section: {
    backgroundColor: '#FFF',
    padding: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#A0522D',
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
    alignItems: 'center',
  },
  detailLabel: {
    fontSize: 13,
    color: '#666',
    fontWeight: '500',
  },
  detailValue: {
    fontSize: 14,
    color: '#333',
    fontWeight: '400',
    flex: 1,
    textAlign: 'right',
  },
  detailValueLink: {
    fontSize: 14,
    color: '#A0522D',
    fontWeight: '500',
    textDecorationLine: 'underline',
  },
  detailValueSmall: {
    fontSize: 12,
    color: '#999',
  },
  divider: {
    height: 8,
    backgroundColor: '#F5F5F5',
  },
  noticeBox: {
    backgroundColor: '#FFF8F0',
    padding: 16,
    margin: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#F0E0D0',
  },
  noticeText: {
    fontSize: 13,
    color: '#A0522D',
    lineHeight: 20,
  },
  confirmBox: {
    backgroundColor: '#F0F8F0',
    padding: 16,
    margin: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#D0E8D0',
  },
  confirmText: {
    fontSize: 13,
    color: '#2E7D32',
    lineHeight: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#FFF',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    gap: 12,
  },
  callButton: {
    flex: 1,
    backgroundColor: '#D2B48C',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  callButtonText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#FFF',
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#F44336',
  },
  cancelButtonText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#F44336',
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
  },
});
