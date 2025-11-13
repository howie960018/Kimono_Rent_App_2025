import { DrawerMenu } from '@/components/DrawerMenu';
import { useAuth } from '@/contexts/AuthContext';
import { styles as globalStyles } from '@/styles/styles';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export function BookingScreen() {
  const { user } = useAuth();
  const router = useRouter();
  const [menuVisible, setMenuVisible] = useState(false);

  const handleStartBooking = () => {
    if (!user) {
      Alert.alert('請先登入', '需要登入才能使用預約服務', [
        { text: '取消', style: 'cancel' },
        { text: '去登入', onPress: () => router.push('/login') },
      ]);
      return;
    }
    router.push('/booking/calendar');
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={globalStyles.catalogHeader}>
        <View style={{ width: 40 }} />
        <Text style={globalStyles.catalogHeaderTitle}>預約服務</Text>
        <TouchableOpacity onPress={() => setMenuVisible(true)}>
          <Text style={globalStyles.iconText}>☰</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>選擇日期開始您的和服體驗</Text>
        
        <TouchableOpacity style={styles.button} onPress={handleStartBooking}>
          <Text style={styles.buttonText}>開始預約</Text>
        </TouchableOpacity>
      </View>

      <DrawerMenu visible={menuVisible} onClose={() => setMenuVisible(false)} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 32,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#D2B48C',
    paddingVertical: 16,
    paddingHorizontal: 48,
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFF',
  },
});

