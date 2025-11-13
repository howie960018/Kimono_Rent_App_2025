import { useRouter } from 'expo-router';
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

export function EditProfileScreen() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullName: '王小明',
    email: 'wang.xiaoming@example.com',
    phone: '0912-345-678',
    birthday: '1990-01-01',
    address: '台北市信義區',
  });

  const handleSave = () => {
    // TODO: 實作真實儲存功能
    console.log('儲存資料:', formData);
    Alert.alert('成功', '個人資料已更新', [
      { text: '確定', onPress: () => router.back() }
    ]);
  };

  const updateFormData = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Text style={styles.backButtonText}>← 返回</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>編輯個人資料</Text>
          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>儲存</Text>
          </TouchableOpacity>
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* 頭像區域 */}
          <View style={styles.avatarSection}>
            <View style={styles.avatarContainer}>
              <Text style={styles.avatarText}>👤</Text>
            </View>
            <TouchableOpacity style={styles.changeAvatarButton}>
              <Text style={styles.changeAvatarText}>更換頭像</Text>
            </TouchableOpacity>
          </View>

          {/* 表單區域 */}
          <View style={styles.formContainer}>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>姓名</Text>
              <TextInput
                style={styles.input}
                placeholder="請輸入姓名"
                value={formData.fullName}
                onChangeText={(text) => updateFormData('fullName', text)}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>電子郵件</Text>
              <TextInput
                style={styles.input}
                placeholder="請輸入電子郵件"
                value={formData.email}
                onChangeText={(text) => updateFormData('email', text)}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>手機號碼</Text>
              <TextInput
                style={styles.input}
                placeholder="請輸入手機號碼"
                value={formData.phone}
                onChangeText={(text) => updateFormData('phone', text)}
                keyboardType="phone-pad"
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>生日</Text>
              <TouchableOpacity style={styles.dateInput}>
                <Text style={styles.dateText}>{formData.birthday}</Text>
                <Text style={styles.dateIcon}>📅</Text>
              </TouchableOpacity>
              <Text style={styles.hint}>點擊選擇日期</Text>
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>地址</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="請輸入地址"
                value={formData.address}
                onChangeText={(text) => updateFormData('address', text)}
                multiline
                numberOfLines={3}
              />
            </View>
          </View>

          {/* 安全設定 */}
          <View style={styles.securitySection}>
            <Text style={styles.sectionTitle}>安全設定</Text>
            
            <TouchableOpacity style={styles.securityItem}>
              <View style={styles.securityItemLeft}>
                <Text style={styles.securityIcon}>🔑</Text>
                <Text style={styles.securityText}>更改密碼</Text>
              </View>
              <Text style={styles.securityArrow}>›</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.securityItem}>
              <View style={styles.securityItemLeft}>
                <Text style={styles.securityIcon}>📱</Text>
                <Text style={styles.securityText}>雙重認證</Text>
              </View>
              <Text style={styles.securityArrow}>›</Text>
            </TouchableOpacity>
          </View>

          {/* 帳號管理 */}
          <View style={styles.dangerSection}>
            <TouchableOpacity style={styles.dangerButton}>
              <Text style={styles.dangerButtonText}>刪除帳號</Text>
            </TouchableOpacity>
            <Text style={styles.dangerHint}>
              刪除帳號將永久移除您的所有資料，此操作無法復原
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  keyboardView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  backButton: {
    padding: 4,
  },
  backButtonText: {
    fontSize: 16,
    color: '#A0522D',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
  },
  saveButton: {
    padding: 4,
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#A0522D',
  },
  scrollContent: {
    flexGrow: 1,
  },
  avatarSection: {
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    paddingVertical: 30,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#F4EFE6',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatarText: {
    fontSize: 48,
  },
  changeAvatarButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#A0522D',
    borderRadius: 6,
  },
  changeAvatarText: {
    fontSize: 14,
    color: '#A0522D',
    fontWeight: '600',
  },
  formContainer: {
    backgroundColor: '#FFFFFF',
    marginTop: 16,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  inputContainer: {
    marginBottom: 24,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 8,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    backgroundColor: '#F9F9F9',
  },
  textArea: {
    height: 100,
    paddingTop: 12,
    textAlignVertical: 'top',
  },
  dateInput: {
    height: 50,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingHorizontal: 16,
    backgroundColor: '#F9F9F9',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dateText: {
    fontSize: 16,
    color: '#333333',
  },
  dateIcon: {
    fontSize: 20,
  },
  hint: {
    fontSize: 12,
    color: '#999999',
    marginTop: 4,
  },
  securitySection: {
    backgroundColor: '#FFFFFF',
    marginTop: 16,
    paddingTop: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
    paddingHorizontal: 20,
    marginBottom: 8,
  },
  securityItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  securityItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  securityIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  securityText: {
    fontSize: 16,
    color: '#333333',
  },
  securityArrow: {
    fontSize: 24,
    color: '#CCCCCC',
  },
  dangerSection: {
    marginTop: 16,
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: '#FFFFFF',
    marginBottom: 24,
  },
  dangerButton: {
    height: 50,
    borderWidth: 1,
    borderColor: '#FF4444',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dangerButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF4444',
  },
  dangerHint: {
    fontSize: 12,
    color: '#999999',
    textAlign: 'center',
    marginTop: 12,
    lineHeight: 18,
  },
});
