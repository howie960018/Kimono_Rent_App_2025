import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export function ProfileScreen() {
  const router = useRouter();
  // 模擬使用者登入狀態
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  // 模擬使用者資料
  const userInfo = {
    name: '王小明',
    email: 'wang.xiaoming@example.com',
    phone: '0912-345-678',
    memberLevel: '金牌會員',
    points: 1250,
  };

  // 未登入狀態顯示
  if (!isLoggedIn) {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.guestScrollContent}>
          <View style={styles.guestContainer}>
            <View style={styles.guestHeader}>
              <Text style={styles.guestAvatar}>👤</Text>
              <Text style={styles.guestTitle}>歡迎來到和服租賃</Text>
              <Text style={styles.guestSubtitle}>登入以享受更多服務</Text>
            </View>

            <View style={styles.guestButtons}>
              <TouchableOpacity
                style={styles.loginButton}
                onPress={() => router.push('/login')}
              >
                <Text style={styles.loginButtonText}>登入</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.registerButton}
                onPress={() => router.push('/register')}
              >
                <Text style={styles.registerButtonText}>註冊新帳號</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.guestFeatures}>
              <Text style={styles.featuresTitle}>會員專屬權益</Text>
              <View style={styles.featureItem}>
                <Text style={styles.featureIcon}>✨</Text>
                <Text style={styles.featureText}>線上預約和服租賃</Text>
              </View>
              <View style={styles.featureItem}>
                <Text style={styles.featureIcon}>🎁</Text>
                <Text style={styles.featureText}>獲得專屬優惠和折扣</Text>
              </View>
              <View style={styles.featureItem}>
                <Text style={styles.featureIcon}>⭐</Text>
                <Text style={styles.featureText}>累積點數兌換禮品</Text>
              </View>
              <View style={styles.featureItem}>
                <Text style={styles.featureIcon}>📅</Text>
                <Text style={styles.featureText}>查看預約記錄</Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  // 已登入狀態顯示
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* 使用者資訊區域 */}
        <View style={styles.profileHeader}>
          <View style={styles.avatarContainer}>
            <Text style={styles.avatarText}>👤</Text>
          </View>
          <View style={styles.userInfo}>
            <Text style={styles.userName}>{userInfo.name}</Text>
            <Text style={styles.userEmail}>{userInfo.email}</Text>
            <View style={styles.memberBadge}>
              <Text style={styles.memberBadgeText}>⭐ {userInfo.memberLevel}</Text>
            </View>
          </View>
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => router.push('/edit-profile')}
          >
            <Text style={styles.editButtonText}>編輯</Text>
          </TouchableOpacity>
        </View>

        {/* 會員點數卡片 */}
        <View style={styles.pointsCard}>
          <View style={styles.pointsContent}>
            <Text style={styles.pointsLabel}>我的點數</Text>
            <Text style={styles.pointsValue}>{userInfo.points}</Text>
          </View>
          <TouchableOpacity style={styles.pointsButton}>
            <Text style={styles.pointsButtonText}>兌換獎勵 →</Text>
          </TouchableOpacity>
        </View>

        {/* 功能選單 */}
        <View style={styles.menuSection}>
          <Text style={styles.sectionTitle}>我的服務</Text>
          
          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuIcon}>📅</Text>
            <Text style={styles.menuText}>我的預約</Text>
            <Text style={styles.menuArrow}>›</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuIcon}>❤️</Text>
            <Text style={styles.menuText}>我的收藏</Text>
            <Text style={styles.menuArrow}>›</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuIcon}>🎟️</Text>
            <Text style={styles.menuText}>我的優惠券</Text>
            <Text style={styles.menuArrow}>›</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuIcon}>💳</Text>
            <Text style={styles.menuText}>付款方式</Text>
            <Text style={styles.menuArrow}>›</Text>
          </TouchableOpacity>
        </View>

        {/* 設定選單 */}
        <View style={styles.menuSection}>
          <Text style={styles.sectionTitle}>設定</Text>
          
          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuIcon}>🔔</Text>
            <Text style={styles.menuText}>通知設定</Text>
            <Text style={styles.menuArrow}>›</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuIcon}>🔒</Text>
            <Text style={styles.menuText}>隱私權設定</Text>
            <Text style={styles.menuArrow}>›</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuIcon}>❓</Text>
            <Text style={styles.menuText}>幫助中心</Text>
            <Text style={styles.menuArrow}>›</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuIcon}>📧</Text>
            <Text style={styles.menuText}>聯絡我們</Text>
            <Text style={styles.menuArrow}>›</Text>
          </TouchableOpacity>
        </View>

        {/* 登出按鈕 */}
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={() => setIsLoggedIn(false)}
        >
          <Text style={styles.logoutButtonText}>登出</Text>
        </TouchableOpacity>

        <View style={styles.footer}>
          <Text style={styles.footerText}>版本 1.0.0</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  // 未登入狀態樣式
  guestScrollContent: {
    flexGrow: 1,
  },
  guestContainer: {
    padding: 24,
    minHeight: '100%',
  },
  guestHeader: {
    alignItems: 'center',
    marginTop: 60,
    marginBottom: 40,
  },
  guestAvatar: {
    fontSize: 80,
    marginBottom: 20,
  },
  guestTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 8,
  },
  guestSubtitle: {
    fontSize: 16,
    color: '#666666',
  },
  guestButtons: {
    marginBottom: 40,
  },
  loginButton: {
    height: 50,
    backgroundColor: '#A0522D',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  loginButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  registerButton: {
    height: 50,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#A0522D',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  registerButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#A0522D',
  },
  guestFeatures: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
  },
  featuresTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 20,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  featureIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  featureText: {
    fontSize: 16,
    color: '#666666',
  },
  // 已登入狀態樣式
  profileHeader: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  avatarContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#F4EFE6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  avatarText: {
    fontSize: 32,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 8,
  },
  memberBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#FFD700',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  memberBadgeText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#333333',
  },
  editButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 6,
  },
  editButtonText: {
    fontSize: 14,
    color: '#666666',
  },
  pointsCard: {
    backgroundColor: '#A0522D',
    margin: 16,
    padding: 20,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  pointsContent: {
    flex: 1,
  },
  pointsLabel: {
    fontSize: 14,
    color: '#FFFFFF',
    opacity: 0.9,
    marginBottom: 4,
  },
  pointsValue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  pointsButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  pointsButtonText: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  menuSection: {
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
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  menuIcon: {
    fontSize: 24,
    marginRight: 16,
  },
  menuText: {
    flex: 1,
    fontSize: 16,
    color: '#333333',
  },
  menuArrow: {
    fontSize: 24,
    color: '#CCCCCC',
  },
  logoutButton: {
    margin: 16,
    height: 50,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#FF4444',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoutButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF4444',
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  footerText: {
    fontSize: 12,
    color: '#999999',
  },
});
