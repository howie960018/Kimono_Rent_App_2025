import { DrawerMenu } from '@/components/DrawerMenu';
import { useAuth } from '@/contexts/AuthContext';
import { styles } from '@/styles/styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { router } from 'expo-router';
import React, { useCallback, useState } from 'react';
import {
    Alert,
    Image,
    ScrollView,
    SectionList,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type TabType = 'menu' | 'recommended' | 'favorites';

interface KimonoItem {
  id: string;
  name: string;
  price: string;
  image: string;
  isFavorite?: boolean;
}

interface KimonoSection {
  title: string;
  data: KimonoItem[];
}

// Mock Data - 菜單分類
const menuSections: KimonoSection[] = [
  {
    title: '留袖',
    data: [
      { id: '1', name: '黑留袖', price: '¥180,000～', image: 'https://picsum.photos/seed/tomesode1/200/250' },
      { id: '2', name: '色留袖', price: '¥150,000～', image: 'https://picsum.photos/seed/tomesode2/200/250' },
      { id: '3', name: '五つ紋 黑留袖', price: '¥200,000～', image: 'https://picsum.photos/seed/tomesode3/200/250' },
      { id: '4', name: '訪問著風 留袖', price: '¥170,000～', image: 'https://picsum.photos/seed/tomesode4/200/250' },
    ],
  },
  {
    title: '訪問著',
    data: [
      { id: '5', name: '京友禪 訪問著', price: '¥120,000～', image: 'https://picsum.photos/seed/houmongi1/200/250' },
      { id: '6', name: '加賀友禪 訪問著', price: '¥140,000～', image: 'https://picsum.photos/seed/houmongi2/200/250' },
      { id: '7', name: '江戶小紋 訪問著', price: '¥110,000～', image: 'https://picsum.photos/seed/houmongi3/200/250' },
      { id: '8', name: '絞り染 訪問著', price: '¥130,000～', image: 'https://picsum.photos/seed/houmongi4/200/250' },
    ],
  },
  {
    title: '浴衣',
    data: [
      { id: '9', name: '藍染浴衣', price: '¥8,000～', image: 'https://picsum.photos/seed/yukata1/200/250' },
      { id: '10', name: '綿麻浴衣', price: '¥12,000～', image: 'https://picsum.photos/seed/yukata2/200/250' },
      { id: '11', name: '注染浴衣', price: '¥15,000～', image: 'https://picsum.photos/seed/yukata3/200/250' },
      { id: '12', name: '高級浴衣', price: '¥25,000～', image: 'https://picsum.photos/seed/yukata4/200/250' },
    ],
  },
  {
    title: '和装小物',
    data: [
      { id: '13', name: '帯', price: '¥30,000～', image: 'https://picsum.photos/seed/obi1/200/250' },
      { id: '14', name: '帯締め', price: '¥5,000～', image: 'https://picsum.photos/seed/obijime/200/250' },
      { id: '15', name: '帯揚げ', price: '¥8,000～', image: 'https://picsum.photos/seed/obiage/200/250' },
      { id: '16', name: '草履', price: '¥15,000～', image: 'https://picsum.photos/seed/zori/200/250' },
    ],
  },
];

// Mock Data - 推薦商品
const recommendedItems: KimonoItem[] = [
  { id: '1', name: '黑留袖', price: '¥180,000～', image: 'https://picsum.photos/seed/tomesode1/200/250' },
  { id: '5', name: '京友禪 訪問著', price: '¥120,000～', image: 'https://picsum.photos/seed/houmongi1/200/250' },
  { id: '9', name: '藍染浴衣', price: '¥8,000～', image: 'https://picsum.photos/seed/yukata1/200/250' },
  { id: '13', name: '帯', price: '¥30,000～', image: 'https://picsum.photos/seed/obi1/200/250' },
  { id: '2', name: '色留袖', price: '¥150,000～', image: 'https://picsum.photos/seed/tomesode2/200/250' },
  { id: '10', name: '綿麻浴衣', price: '¥12,000～', image: 'https://picsum.photos/seed/yukata2/200/250' },
];

export function CatalogScreen() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<TabType>('menu');
  const [menuVisible, setMenuVisible] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);

  // 載入收藏
  const loadFavorites = async () => {
    try {
      const data = await AsyncStorage.getItem('@catalog_favorites');
      if (data) {
        setFavorites(JSON.parse(data));
      }
    } catch (error) {
      console.error('載入收藏失敗:', error);
    }
  };

  // 儲存收藏
  const saveFavorites = async (newFavorites: string[]) => {
    try {
      await AsyncStorage.setItem('@catalog_favorites', JSON.stringify(newFavorites));
    } catch (error) {
      console.error('儲存收藏失敗:', error);
    }
  };

  // 頁面聚焦時載入收藏
  useFocusEffect(
    useCallback(() => {
      loadFavorites();
    }, [])
  );

  const toggleFavorite = (itemId: string) => {
    if (!user) {
      Alert.alert('請先登入', '需要登入才能使用收藏功能', [
        { text: '取消', style: 'cancel' },
        { text: '去登入', onPress: () => router.push('/login') },
      ]);
      return;
    }

    setFavorites((prev) => {
      const newFavorites = prev.includes(itemId)
        ? prev.filter((id) => id !== itemId)
        : [...prev, itemId];
      saveFavorites(newFavorites);
      return newFavorites;
    });
  };

  const getFavoriteItems = (): KimonoItem[] => {
    const allItems = menuSections.flatMap((section) => section.data);
    return allItems.filter((item) => favorites.includes(item.id));
  };

  // 商品卡片組件
  const KimonoCard = ({ item, showRemove = false }: { item: KimonoItem; showRemove?: boolean }) => (
    <View style={styles.kimonoCard}>
      <TouchableOpacity>
        <View style={styles.kimonoImageContainer}>
          <Image source={{ uri: item.image }} style={styles.kimonoImage} />
          <TouchableOpacity
            style={styles.favoriteButton}
            onPress={() => toggleFavorite(item.id)}
          >
            <Text style={styles.favoriteIcon}>
              {favorites.includes(item.id) ? '★' : '☆'}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.kimonoInfo}>
          <Text style={styles.kimonoName}>{item.name}</Text>
          <Text style={styles.kimonoPrice}>{item.price}</Text>
        </View>
      </TouchableOpacity>
      {showRemove && (
        <TouchableOpacity
          style={styles.removeButton}
          onPress={() => toggleFavorite(item.id)}
        >
          <Text style={styles.removeButtonText}>移除收藏</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  // 渲染菜單 Tab（使用 SectionList）
  const renderMenuTab = () => (
    <SectionList
      sections={menuSections}
      keyExtractor={(item) => item.id}
      stickySectionHeadersEnabled={false}
      renderSectionHeader={({ section }) => (
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionHeaderText}>{section.title}</Text>
        </View>
      )}
      renderItem={({ item, index, section }) => {
        const sectionData = section.data;
        const isLeft = index % 2 === 0;
        const isLast = index === sectionData.length - 1;
        const isOdd = sectionData.length % 2 !== 0;

        if (isLeft) {
          return (
            <View style={styles.kimonoRow}>
              <KimonoCard item={item} />
              {index + 1 < sectionData.length && (
                <KimonoCard item={sectionData[index + 1]} />
              )}
              {isLast && isOdd && <View style={styles.kimonoCard} />}
            </View>
          );
        }
        return null;
      }}
      ListHeaderComponent={
        <View style={styles.catalogBanner}>
          <Image
            source={{ uri: 'https://picsum.photos/seed/kimono-banner/400/200' }}
            style={styles.catalogBannerImage}
          />
        </View>
      }
      contentContainerStyle={styles.catalogContent}
    />
  );

  // 渲染推薦菜單 Tab（三欄網格）
  const renderRecommendedTab = () => (
    <ScrollView contentContainerStyle={styles.catalogContent}>
      <View style={styles.threeColumnGrid}>
        {recommendedItems.map((item) => (
          <View key={item.id} style={styles.threeColumnCard}>
            <TouchableOpacity>
              <View style={styles.kimonoImageContainer}>
                <Image source={{ uri: item.image }} style={styles.kimonoImageSmall} />
                <TouchableOpacity
                  style={styles.favoriteButtonSmall}
                  onPress={() => toggleFavorite(item.id)}
                >
                  <Text style={styles.favoriteIconSmall}>
                    {favorites.includes(item.id) ? '★' : '☆'}
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={styles.kimonoInfoSmall}>
                <Text style={styles.kimonoNameSmall} numberOfLines={1}>
                  {item.name}
                </Text>
                <Text style={styles.kimononPriceSmall}>{item.price}</Text>
              </View>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </ScrollView>
  );

  // 渲染收藏 Tab（單欄列表）
  const renderFavoritesTab = () => {
    const favoriteItems = getFavoriteItems();

    if (favoriteItems.length === 0) {
      return (
        <View style={styles.emptyFavorites}>
          <Text style={styles.emptyFavoritesIcon}>☆</Text>
          <Text style={styles.emptyFavoritesText}>尚無收藏商品</Text>
        </View>
      );
    }

    return (
      <ScrollView contentContainerStyle={styles.catalogContent}>
        {favoriteItems.map((item) => (
          <View key={item.id} style={styles.favoriteCard}>
            <Image source={{ uri: item.image }} style={styles.favoriteImage} />
            <View style={styles.favoriteInfo}>
              <Text style={styles.favoriteName}>{item.name}</Text>
              <Text style={styles.favoritePrice}>{item.price}</Text>
              <TouchableOpacity
                style={styles.removeFavoriteButton}
                onPress={() => toggleFavorite(item.id)}
              >
                <Text style={styles.removeFavoriteText}>移除收藏</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
    );
  };

  return (
    <SafeAreaView style={styles.catalogContainer}>
      {/* Header */}
      <View style={styles.catalogHeader}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.catalogHeaderTitle}>菜單</Text>
        <TouchableOpacity onPress={() => setMenuVisible(true)}>
          <Text style={styles.iconText}>☰</Text>
        </TouchableOpacity>
      </View>

      {/* Tab 切換 */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'menu' && styles.tabButtonActive]}
          onPress={() => setActiveTab('menu')}
        >
          <Text style={[styles.tabText, activeTab === 'menu' && styles.tabTextActive]}>
            菜單
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'recommended' && styles.tabButtonActive]}
          onPress={() => setActiveTab('recommended')}
        >
          <Text
            style={[styles.tabText, activeTab === 'recommended' && styles.tabTextActive]}
          >
            推薦菜單
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'favorites' && styles.tabButtonActive]}
          onPress={() => setActiveTab('favorites')}
        >
          <Text style={[styles.tabText, activeTab === 'favorites' && styles.tabTextActive]}>
            收藏
          </Text>
        </TouchableOpacity>
      </View>

      {/* 內容區 */}
      {activeTab === 'menu' && renderMenuTab()}
      {activeTab === 'recommended' && renderRecommendedTab()}
      {activeTab === 'favorites' && renderFavoritesTab()}

      <DrawerMenu visible={menuVisible} onClose={() => setMenuVisible(false)} />
    </SafeAreaView>
  );
}
