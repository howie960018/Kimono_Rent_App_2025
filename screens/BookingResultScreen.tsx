import { STORES } from '@/types/booking';
import { useRouter } from 'expo-router';
import React from 'react';
import {
    Linking,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export function BookingResultScreen() {
  const router = useRouter();
  const storePhone = STORES[0].phone; // 使用第一個店鋪的電話

  const handleClose = () => {
    // 關閉所有預約相關頁面，返回首頁
    router.dismissAll();
    router.replace('/(tabs)');
  };

  const handleCall = () => {
    Linking.openURL(`tel:${storePhone}`);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <View style={{ width: 50 }} />
        <View style={{ width: 50 }} />
        <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
          <Text style={styles.closeButtonText}>✕</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        {/* 成功圖示 */}
        <View style={styles.iconContainer}>
          <Text style={styles.successIcon}>✓</Text>
        </View>

        {/* 主要訊息 */}
        <Text style={styles.mainMessage}>謝謝您的預約</Text>

        {/* 未確定提醒 */}
        <View style={styles.noticeBox}>
          <Text style={styles.warningLabel}>※ 還沒有確定預約</Text>
          <Text style={styles.noticeText}>
            預約尚未確定，我們將在 3 個工作日內回覆，請耐心等候。
          </Text>
        </View>

        {/* 緊急聯繫 */}
        <View style={styles.contactBox}>
          <Text style={styles.contactTitle}>若有急需，請直接聯繫：</Text>
          <TouchableOpacity onPress={handleCall} style={styles.phoneButton}>
            <Text style={styles.phoneNumber}>{storePhone}</Text>
            <Text style={styles.phoneIcon}>📞</Text>
          </TouchableOpacity>
        </View>

        {/* 補充說明 */}
        <View style={styles.infoBox}>
          <Text style={styles.infoText}>
            • 我們會透過您提供的聯絡方式與您確認預約詳情{'\n'}
            • 如需取消或變更預約，請提前致電通知{'\n'}
            • 預約確認後會發送通知至您的郵箱或手機
          </Text>
        </View>
      </View>

      {/* 關閉按鈕 */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.closeBottomButton} onPress={handleClose}>
          <Text style={styles.closeBottomButtonText}>關閉</Text>
        </TouchableOpacity>
      </View>
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
  closeButton: {
    padding: 4,
  },
  closeButtonText: {
    fontSize: 24,
    color: '#666',
  },
  content: {
    flex: 1,
    padding: 24,
    alignItems: 'center',
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#66BB6A',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 32,
    marginBottom: 24,
  },
  successIcon: {
    fontSize: 48,
    color: '#FFF',
    fontWeight: 'bold',
  },
  mainMessage: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 32,
  },
  noticeBox: {
    backgroundColor: '#FFF8F0',
    padding: 20,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#F0E0D0',
    width: '100%',
    marginBottom: 24,
  },
  warningLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#D32F2F',
    textAlign: 'center',
    marginBottom: 12,
  },
  noticeText: {
    fontSize: 14,
    color: '#333',
    lineHeight: 22,
    textAlign: 'center',
  },
  contactBox: {
    width: '100%',
    marginBottom: 24,
  },
  contactTitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 12,
  },
  phoneButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#A0522D',
    gap: 8,
  },
  phoneNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#A0522D',
  },
  phoneIcon: {
    fontSize: 20,
  },
  infoBox: {
    backgroundColor: '#F5F5F5',
    padding: 16,
    borderRadius: 8,
    width: '100%',
  },
  infoText: {
    fontSize: 13,
    color: '#666',
    lineHeight: 20,
  },
  buttonContainer: {
    padding: 16,
    backgroundColor: '#FFF',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  closeBottomButton: {
    backgroundColor: '#D2B48C',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  closeBottomButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFF',
  },
});
