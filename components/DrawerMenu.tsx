import { styles } from '@/styles/styles';
import React from 'react';
import { Linking, Modal, ScrollView, Text, TouchableOpacity, View } from 'react-native';

interface DrawerMenuProps {
  visible: boolean;
  onClose: () => void;
}

export function DrawerMenu({ visible, onClose }: DrawerMenuProps) {
  const menuItems = [
    { id: 1, icon: '🏠', label: '首頁', screen: 'home' },
    { id: 2, icon: '📍', label: '店鋪信息', screen: 'store' },
    { id: 3, icon: '📢', label: '最新消息', screen: 'news' },
    { id: 4, icon: '🎟️', label: '優惠券', screen: 'promo' },
    { id: 5, icon: '📝', label: '我的記錄', screen: 'history' },
    { id: 6, icon: '📋', label: '菜單', screen: 'catalog' },
    { id: 7, icon: '🎫', label: '會員證書', screen: 'profile' },
    { id: 8, icon: '▶️', label: '視頻 CH', url: 'https://youtube.com' },
    { id: 9, icon: '📅', label: '預約', screen: 'booking' },
    { id: 10, icon: '🌐', label: '網頁', url: 'https://example.com' },
    { id: 11, icon: '⋯', label: '其他', screen: 'other' },
  ];

  const handleMenuItemPress = (item: any) => {
    if (item.url) {
      Linking.openURL(item.url);
    } else {
      console.log('導航至:', item.screen);
    }
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.drawerOverlay}>
        <TouchableOpacity 
          style={styles.drawerBackdrop} 
          activeOpacity={1} 
          onPress={onClose}
        />
        
        <View style={styles.drawerContainer}>
          <ScrollView>
            <View style={styles.drawerHeader}>
              <View style={styles.drawerHeaderBackground} />
              <View style={styles.drawerUserInfo}>
                <View style={styles.drawerAvatar}>
                  <Text style={styles.drawerAvatarText}>👤</Text>
                </View>
                <View style={styles.drawerUserDetails}>
                  <Text style={styles.drawerUserName}>王小姐</Text>
                  <TouchableOpacity onPress={() => { onClose(); }}>
                    <Text style={styles.drawerUserLink}>查看我的頁面</Text>
                  </TouchableOpacity>
                </View>
              </View>
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
        </View>
      </View>
    </Modal>
  );
}
