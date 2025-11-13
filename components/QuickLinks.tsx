import { useAuth } from '@/contexts/AuthContext';
import { styles } from '@/styles/styles';
import { router } from 'expo-router';
import React from 'react';
import { Alert, Text, TouchableOpacity, View } from 'react-native';

const links = [
  { id: 1, icon: '🎫', label: '會員證', route: null },
  { id: 2, icon: '⭐', label: '點', route: null },
  { id: 3, icon: '📰', label: '最新消息', route: null },
  { id: 4, icon: '📅', label: '預約', route: '/booking/calendar', requireAuth: true },
  { id: 5, icon: '🏟️', label: '優惠券', route: null },
  { id: 6, icon: '📋', label: '菜單', route: '/catalog' },
];

export function QuickLinks() {
  const { user } = useAuth();
  
  const handlePress = (link: { route: string | null; requireAuth?: boolean }) => {
    if (link.requireAuth && !user) {
      Alert.alert('請先登入', '需要登入才能使用預約服務', [
        { text: '取消', style: 'cancel' },
        { text: '去登入', onPress: () => router.push('/login') },
      ]);
      return;
    }
    
    if (link.route) {
      router.push(link.route as any);
    }
  };

  return (
    <View style={styles.quickLinksContainer}>
      {links.map((link, index) => (
        <TouchableOpacity
          key={link.id}
          style={[
            styles.quickLinkButton,
            (index + 1) % 3 !== 0 && styles.quickLinkBorderRight,
            index < 3 && styles.quickLinkBorderBottom,
          ]}
          onPress={() => handlePress(link)}
        >
          <Text style={styles.quickLinkIcon}>{link.icon}</Text>
          <Text style={styles.quickLinkLabel}>{link.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}
