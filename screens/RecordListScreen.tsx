import { useAuth } from '@/contexts/AuthContext';
import { styles } from '@/styles/styles';
import { Record, mockRecords } from '@/types/record';
import { getRecords } from '@/utils/recordStorage';
import { useFocusEffect } from '@react-navigation/native';
import { router } from 'expo-router';
import React, { useCallback, useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    FlatList,
    Image,
    RefreshControl,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export function RecordListScreen() {
  const { user } = useAuth();
  const [records, setRecords] = useState<Record[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const loadRecords = async () => {
    try {
      const data = await getRecords();
      // 如果沒有資料，使用 mock data
      if (data.length === 0) {
        setRecords(mockRecords);
      } else {
        setRecords(data);
      }
    } catch (error) {
      console.error('載入記錄失敗:', error);
      setRecords(mockRecords);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadRecords();
    }, [])
  );

  const onRefresh = () => {
    setRefreshing(true);
    loadRecords();
  };

  const renderStars = (rating: number) => {
    return (
      <View style={styles.recordStars}>
        {[1, 2, 3, 4, 5].map((star) => (
          <Text key={star} style={styles.recordStar}>
            {star <= rating ? '★' : '☆'}
          </Text>
        ))}
      </View>
    );
  };

  const RecordCard = ({ item }: { item: Record }) => (
    <TouchableOpacity
      style={styles.recordCard}
      onPress={() => router.push(`/my-records/detail?id=${item.id}`)}
    >
      <Image source={{ uri: item.image_url }} style={styles.recordThumbnail} />
      <View style={styles.recordCardInfo}>
        <Text style={styles.recordDate}>{item.date}</Text>
        <Text style={styles.recordTitle}>{item.menu_item}</Text>
        {renderStars(item.rating)}
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.recordContainer}>
        <View style={styles.recordHeader}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <Text style={styles.backButtonText}>←</Text>
          </TouchableOpacity>
          <Text style={styles.recordHeaderTitle}>記錄</Text>
          <View style={{ width: 40 }} />
        </View>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#D2B48C" />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.recordContainer}>
      <View style={styles.recordHeader}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.recordHeaderTitle}>記錄</Text>
        <View style={{ width: 40 }} />
      </View>

      <FlatList
        data={records}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <RecordCard item={item} />}
        contentContainerStyle={styles.recordList}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        ListEmptyComponent={
          <View style={styles.emptyRecords}>
            <Text style={styles.emptyRecordsIcon}>📝</Text>
            <Text style={styles.emptyRecordsText}>尚無記錄</Text>
          </View>
        }
      />

      {/* 浮動新增按鈕 */}
      <TouchableOpacity
        style={styles.recordFabButton}
        onPress={() => {
          if (!user) {
            Alert.alert('請先登入', '需要登入才能新增記錄', [
              { text: '取消', style: 'cancel' },
              { text: '去登入', onPress: () => router.push('/login') },
            ]);
            return;
          }
          router.push('/my-records/form');
        }}
      >
        <Text style={styles.recordFabIcon}>+</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
