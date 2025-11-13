import { saveBooking } from '@/utils/bookingStorage';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export function BookingConfirmScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [loading, setLoading] = useState(false);

  const bookingData = {
    storeName: params.storeName as string,
    selectedDate: params.selectedDate as string,
    customerName: params.customerName as string,
    contactMethod: params.contactMethod as string,
    contactNumber: params.contactNumber as string,
    firstChoice: params.firstChoice as string,
    secondChoice: params.secondChoice as string,
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      // 保存預約到本地存儲
      await saveBooking(bookingData);
      
      // 導航到結果頁面
      router.push('/booking/result' as any);
    } catch (error) {
      Alert.alert('錯誤', '預約提交失敗，請稍後再試');
      console.error('提交預約失敗:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.backButton}>← 返回</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>確認預約內容</Text>
        <View style={{ width: 50 }} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>預約資訊</Text>
          
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>預約日期</Text>
            <Text style={styles.detailValue}>{bookingData.selectedDate}</Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>店鋪</Text>
            <Text style={styles.detailValue}>{bookingData.storeName}</Text>
          </View>
        </View>

        <View style={styles.divider} />

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>客戶資訊</Text>
          
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>姓名</Text>
            <Text style={styles.detailValue}>{bookingData.customerName}</Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>聯絡方式</Text>
            <Text style={styles.detailValue}>{bookingData.contactMethod}</Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>聯絡電話</Text>
            <Text style={styles.detailValue}>{bookingData.contactNumber}</Text>
          </View>
        </View>

        <View style={styles.divider} />

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>預約內容</Text>
          
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>第一意願</Text>
            <Text style={styles.detailValue}>{bookingData.firstChoice}</Text>
          </View>

          {bookingData.secondChoice && (
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>第二意願</Text>
              <Text style={styles.detailValue}>{bookingData.secondChoice}</Text>
            </View>
          )}
        </View>

        <View style={styles.noticeBox}>
          <Text style={styles.noticeText}>
            ※ 提交後，預約尚未確定。我們將在 3 個工作日內與您聯繫確認。
          </Text>
        </View>
      </ScrollView>

      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.backEditButton} 
          onPress={handleBack}
          disabled={loading}
        >
          <Text style={styles.backEditButtonText}>返回修改</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.submitButton, loading && styles.submitButtonDisabled]} 
          onPress={handleSubmit}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#FFF" />
          ) : (
            <Text style={styles.submitButtonText}>申請預訂</Text>
          )}
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
    marginBottom: 16,
  },
  detailLabel: {
    fontSize: 13,
    color: '#666',
    marginBottom: 4,
    fontWeight: '500',
  },
  detailValue: {
    fontSize: 16,
    color: '#333',
    fontWeight: '400',
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
  buttonContainer: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#FFF',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    gap: 12,
  },
  backEditButton: {
    flex: 1,
    backgroundColor: '#999',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  backEditButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFF',
  },
  submitButton: {
    flex: 1,
    backgroundColor: '#D2B48C',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitButtonDisabled: {
    backgroundColor: '#CCC',
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFF',
  },
});
