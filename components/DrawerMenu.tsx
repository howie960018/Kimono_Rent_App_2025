import { useAuth } from '@/contexts/AuthContext';
import { styles } from '@/styles/styles';
import { router } from 'expo-router';
import React, { useEffect, useRef } from 'react';
import { Alert, Animated, Linking, Modal, ScrollView, Text, TouchableOpacity, View } from 'react-native';

interface DrawerMenuProps {
  visible: boolean;
  onClose: () => void;
}

export function DrawerMenu({ visible, onClose }: DrawerMenuProps) {
  const { user } = useAuth();
  const slideAnim = useRef(new Animated.Value(300)).current;

  useEffect(() => {
    if (visible) {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: 300,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  const menuItems = [
    { id: 1, icon: '🏠', label: '首頁', screen: 'home' },
    { id: 2, icon: '📍', label: '店鋪信息', screen: 'store' },
    { id: 3, icon: '📢', label: '最新消息', screen: 'news' },
    { id: 4, icon: '🏟️', label: '優惠券', screen: 'promo' },
    { id: 5, icon: '📝', label: '我的記錄', route: '/my-records' },
    { id: 6, icon: '📋', label: '菜單', route: '/catalog' },
    { id: 7, icon: '🎫', label: '會員證書', screen: 'profile' },
    { id: 8, icon: '▶️', label: '視頻 CH', url: 'https://youtube.com' },
    { id: 9, icon: '📅', label: '預約', route: '/booking/calendar', requireAuth: true },
    { id: 10, icon: '🌐', label: '網頁', url: 'https://example.com' },
    { id: 11, icon: '⋯', label: '其他', screen: 'other' },
  ];

  const handleMenuItemPress = (item: any) => {
    if (item.requireAuth && !user) {
      Alert.alert('請先登入', '需要登入才能使用預約服務', [
        { text: '取消', style: 'cancel' },
        { text: '去登入', onPress: () => { onClose(); router.push('/login'); } },
      ]);
      return;
    }
    
    if (item.url) {
      Linking.openURL(item.url);
    } else if (item.route) {
      onClose();
      router.push(item.route as any);
    } else {
      console.log('導航至:', item.screen);
    }
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.drawerOverlay}>
        <TouchableOpacity 
          style={styles.drawerBackdrop} 
          activeOpacity={1} 
          onPress={onClose}
        />
        
        <Animated.View 
          style={[
            styles.drawerContainer,
            {
              transform: [{ translateX: slideAnim }]
            }
          ]}
        >
          <ScrollView>
            <View style={styles.drawerHeader}>
              <View style={styles.drawerHeaderBackground} />
              {user ? (
                <View style={styles.drawerUserInfo}>
                  <View style={styles.drawerAvatar}>
                    <Text style={styles.drawerAvatarText}>👤</Text>
                  </View>
                  <View style={styles.drawerUserDetails}>
                    <Text style={styles.drawerUserName}>{user.fullName}</Text>
                    <TouchableOpacity onPress={() => { onClose(); router.push('/edit-profile'); }}>
                      <Text style={styles.drawerUserLink}>查看我的頁面</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ) : (
                <View style={styles.drawerUserInfo}>
                  <TouchableOpacity
                    style={styles.drawerLoginButton}
                    onPress={() => { onClose(); router.push('/login'); }}
                  >
                    <Text style={styles.drawerLoginButtonText}>登入</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.drawerRegisterButton}
                    onPress={() => { onClose(); router.push('/register'); }}
                  >
                    <Text style={styles.drawerRegisterButtonText}>註冊</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>

            <View style={styles.drawerMenuList}>
              {menuItems.map((item) => (
                <TouchableOpacity
                  key={item.id}
                  style={styles.drawerMenuItem}
                  onPress={() => handleMenuItemPress(item)}
                >
                  <Text style={styles.drawerMenuIcon}>{item.icon}</Text>
                  <Text style={styles.drawerMenuLabel}>{item.label}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <View style={styles.drawerSocial}>
              <TouchableOpacity 
                style={styles.drawerSocialButton}
                onPress={() => Linking.openURL('https://instagram.com')}
              >
                <Text style={styles.drawerSocialIcon}>📷</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.drawerSocialButton}
                onPress={() => Linking.openURL('https://facebook.com')}
              >
                <Text style={styles.drawerSocialIcon}>👍</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.drawerSocialButton}
                onPress={() => Linking.openURL('https://example.com')}
              >
                <Text style={styles.drawerSocialIcon}>🌐</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.drawerCloseButton} onPress={onClose}>
              <Text style={styles.drawerCloseText}>關閉</Text>
            </TouchableOpacity>
          </ScrollView>
        </Animated.View>
      </View>
    </Modal>
  );
}
