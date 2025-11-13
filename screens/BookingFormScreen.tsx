import { useAuth } from '@/contexts/AuthContext';
import { BOOKING_CHOICES, CONTACT_METHODS, STORE_MEMOS } from '@/types/booking';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    Alert,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export function BookingFormScreen() {
  const router = useRouter();
  const { user } = useAuth();
  const params = useLocalSearchParams();
  
  const storeName = params.storeName as string || '';
  const selectedDate = params.selectedDate as string || '';

  const [formData, setFormData] = useState({
    customerName: user?.fullName || '',
    contactMethod: 'phone',
    contactNumber: user?.phone || '',
    firstChoice: '',
    secondChoice: '',
  });

  const handleSubmit = () => {
    // 驗證必填欄位
    if (!formData.customerName.trim()) {
      Alert.alert('錯誤', '請輸入姓名');
      return;
    }

    if (!formData.firstChoice) {
      Alert.alert('錯誤', '請選擇第一意願');
      return;
    }

    if (!formData.contactNumber.trim()) {
      Alert.alert('錯誤', '請輸入聯絡電話');
      return;
    }

    // 導航到確認頁面
    router.push({
      pathname: '/booking/confirm' as any,
      params: {
        storeName,
        selectedDate,
        customerName: formData.customerName,
        contactMethod: CONTACT_METHODS.find(m => m.value === formData.contactMethod)?.label || '',
        contactNumber: formData.contactNumber,
        firstChoice: formData.firstChoice,
        secondChoice: formData.secondChoice,
      },
    });
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>預約內容</Text>
        <TouchableOpacity onPress={() => router.back()} style={styles.closeButton}>
          <Text style={styles.closeButtonText}>✕</Text>
        </TouchableOpacity>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* 日期/店鋪資訊 */}
          <View style={styles.infoSection}>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>預約日期</Text>
              <Text style={styles.infoValue}>{selectedDate}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>店鋪</Text>
              <Text style={styles.infoValue}>{storeName}</Text>
            </View>
          </View>

          {/* 表單區域 */}
          <View style={styles.formSection}>
            {/* 姓名 */}
            <View style={styles.fieldContainer}>
              <Text style={styles.label}>
                姓名 <Text style={styles.required}>*必填</Text>
              </Text>
              <TextInput
                style={styles.input}
                value={formData.customerName}
                onChangeText={(text) => setFormData({ ...formData, customerName: text })}
                placeholder="請輸入您的姓名"
                placeholderTextColor="#999"
              />
            </View>

            {/* 第一意願 */}
            <View style={styles.fieldContainer}>
              <Text style={styles.label}>
                第一意願 <Text style={styles.required}>*必填</Text>
              </Text>
              {BOOKING_CHOICES.map((choice) => (
                <TouchableOpacity
                  key={choice}
                  style={[
                    styles.choiceButton,
                    formData.firstChoice === choice && styles.choiceButtonSelected,
                  ]}
                  onPress={() => setFormData({ ...formData, firstChoice: choice })}
                >
                  <View style={styles.radioOuter}>
                    {formData.firstChoice === choice && <View style={styles.radioInner} />}
                  </View>
                  <Text style={[
                    styles.choiceText,
                    formData.firstChoice === choice && styles.choiceTextSelected,
                  ]}>
                    {choice}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* 第二意願 */}
            <View style={styles.fieldContainer}>
              <Text style={styles.label}>第二意願 (選填)</Text>
              {BOOKING_CHOICES.map((choice) => (
                <TouchableOpacity
                  key={choice}
                  style={[
                    styles.choiceButton,
                    formData.secondChoice === choice && styles.choiceButtonSelected,
                  ]}
                  onPress={() => setFormData({ ...formData, secondChoice: choice })}
                >
                  <View style={styles.radioOuter}>
                    {formData.secondChoice === choice && <View style={styles.radioInner} />}
                  </View>
                  <Text style={[
                    styles.choiceText,
                    formData.secondChoice === choice && styles.choiceTextSelected,
                  ]}>
                    {choice}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* 備註 */}
            {STORE_MEMOS[storeName] && (
              <View style={styles.memoSection}>
                <Text style={styles.memoTitle}>店家備註</Text>
                <Text style={styles.memoText}>{STORE_MEMOS[storeName]}</Text>
              </View>
            )}

            {/* 聯絡方式 */}
            <View style={styles.fieldContainer}>
              <Text style={styles.label}>聯絡方式</Text>
              {CONTACT_METHODS.map((method) => (
                <TouchableOpacity
                  key={method.value}
                  style={[
                    styles.choiceButton,
                    formData.contactMethod === method.value && styles.choiceButtonSelected,
                  ]}
                  onPress={() => setFormData({ ...formData, contactMethod: method.value })}
                >
                  <View style={styles.radioOuter}>
                    {formData.contactMethod === method.value && <View style={styles.radioInner} />}
                  </View>
                  <Text style={[
                    styles.choiceText,
                    formData.contactMethod === method.value && styles.choiceTextSelected,
                  ]}>
                    {method.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* 聯絡電話 */}
            <View style={styles.fieldContainer}>
              <Text style={styles.label}>
                聯絡電話 <Text style={styles.required}>*必填</Text>
              </Text>
              <TextInput
                style={styles.input}
                value={formData.contactNumber}
                onChangeText={(text) => setFormData({ ...formData, contactNumber: text })}
                placeholder="請輸入聯絡電話"
                placeholderTextColor="#999"
                keyboardType="phone-pad"
              />
            </View>
          </View>

          {/* 確認按鈕 */}
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>確認</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
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
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    position: 'relative',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  closeButton: {
    position: 'absolute',
    right: 16,
    padding: 4,
  },
  closeButtonText: {
    fontSize: 24,
    color: '#666',
  },
  keyboardView: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  infoSection: {
    backgroundColor: '#F5F5F5',
    padding: 16,
    marginBottom: 8,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  infoLabel: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  infoValue: {
    fontSize: 14,
    color: '#333',
    fontWeight: 'bold',
  },
  formSection: {
    backgroundColor: '#FFF',
    padding: 16,
  },
  fieldContainer: {
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  required: {
    color: '#D32F2F',
    fontSize: 14,
  },
  input: {
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#333',
    backgroundColor: '#FFF',
  },
  choiceButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 8,
    marginBottom: 8,
    backgroundColor: '#FFF',
  },
  choiceButtonSelected: {
    borderColor: '#A0522D',
    backgroundColor: '#FFF8F0',
  },
  radioOuter: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#999',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#A0522D',
  },
  choiceText: {
    fontSize: 14,
    color: '#333',
    flex: 1,
  },
  choiceTextSelected: {
    color: '#A0522D',
    fontWeight: '600',
  },
  memoSection: {
    backgroundColor: '#FFF8F0',
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#F0E0D0',
    marginBottom: 24,
  },
  memoTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#A0522D',
    marginBottom: 8,
  },
  memoText: {
    fontSize: 13,
    color: '#666',
    lineHeight: 20,
  },
  submitButton: {
    backgroundColor: '#D2B48C',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    margin: 16,
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFF',
  },
});
