import { DrawerMenu } from '@/components/DrawerMenu';
import { styles } from '@/styles/styles';
import React, { useState } from 'react';
import { Image, Linking, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { SafeAreaView } from 'react-native-safe-area-context';

export function MapScreen() {
  const [menuVisible, setMenuVisible] = useState(false);
  const shopPhone = '0565-32-0201';
  const shopAddress = '愛知県豊田市挙母町1-43';
  const shopLocation = {
    latitude: 35.0841,
    longitude: 137.1592,
  };

  const initialRegion = {
    latitude: shopLocation.latitude,
    longitude: shopLocation.longitude,
    latitudeDelta: 0.015,
    longitudeDelta: 0.0121,
  };

  const handlePhoneCall = () => {
    Linking.openURL(`tel:${shopPhone}`);
  };

  const openGoogleMaps = async () => {
    const { latitude, longitude } = shopLocation;
    const url = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;

    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        console.log("無法打開 Google Maps");
      }
    } catch (error) {
      console.error("打開地圖錯誤:", error);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={styles.mapScreenContainer}>
        <SafeAreaView edges={['top']} style={styles.headerSafeArea}>
          <View style={styles.headerContainer}>
            <View style={{ flex: 1 }} />
            <View style={styles.logoContainer}>
              <Text style={styles.logoText}>店舗情報</Text>
            </View>
            <View style={styles.headerIcons}>
              <TouchableOpacity>
                <Text style={styles.iconText}>👤</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setMenuVisible(true)}>
                <Text style={styles.iconText}>☰</Text>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>

        <Image
          source={{ uri: 'https://picsum.photos/seed/shop/400/280' }}
          style={styles.shopImage}
        />

        <View style={styles.shopInfoSection}>
          <Text style={styles.shopNameCh}>和韻藝廊 川平屋</Text>
          <Text style={styles.shopDescription}>
            自創業以來，我們致力於傳承和服之美與日本傳統文化，為每位顧客提供細心周到的服務。從和服清洗、裁縫到租借服務，我們提供全方位的專業支援。{'\n\n'}
            經驗豐富的專業團隊，從和服挑選到穿著協助，都將用心為您服務。讓我們為您打造難忘的特別時刻。
          </Text>
        </View>

        <View style={styles.contactCard}>
          <View style={styles.contactInfo}>
            <View style={styles.contactRow}>
              <Text style={styles.contactLabel}>住所</Text>
              <View>
                <Text style={styles.contactText}>〒471-0023</Text>
                <Text style={styles.contactText}>{shopAddress}</Text>
              </View>
            </View>
            <View style={styles.contactRow}>
              <Text style={styles.contactLabel}>電話</Text>
              <TouchableOpacity onPress={handlePhoneCall}>
                <Text style={[styles.contactText, styles.phoneLink]}>{shopPhone}</Text>
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity style={styles.mapIconButton} onPress={openGoogleMaps}>
            <Text style={styles.mapIconText}>🗺️</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.mapContainer}>
          <MapView
            provider={PROVIDER_GOOGLE}
            style={styles.mapImage}
            initialRegion={initialRegion}
            customMapStyle={[]}
          >
            <Marker
              coordinate={{
                latitude: shopLocation.latitude,
                longitude: shopLocation.longitude,
              }}
              title="和韻藝廊 川平屋"
              description={shopAddress}
            />
          </MapView>
          
          <TouchableOpacity style={styles.mapNavigateButton} onPress={openGoogleMaps}>
            <Text style={styles.mapNavigateIcon}>🧭</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.socialContainer}>
          <Text style={styles.socialTitle}>SOCIAL MEDIA</Text>
          <View style={styles.socialIcons}>
            <TouchableOpacity
              style={styles.socialButton}
              onPress={() => Linking.openURL('https://www.facebook.com')}
            >
              <Text style={styles.socialIcon}>👍</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.socialButton}
              onPress={() => Linking.openURL('https://www.instagram.com')}
            >
              <Text style={styles.socialIcon}>📷</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.socialButton}
              onPress={() => Linking.openURL('https://line.me')}
            >
              <Text style={styles.socialIcon}>💬</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      <TouchableOpacity style={styles.floatingCallButton} onPress={handlePhoneCall}>
        <Text style={styles.floatingCallIcon}>📞</Text>
      </TouchableOpacity>

      <DrawerMenu visible={menuVisible} onClose={() => setMenuVisible(false)} />
    </View>
  );
}
