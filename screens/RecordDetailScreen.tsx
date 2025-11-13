import { useAuth } from '@/contexts/AuthContext';
import { styles } from '@/styles/styles';
import { Record, mockRecords } from '@/types/record';
import { deleteRecord, getRecords } from '@/utils/recordStorage';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    Image,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export function RecordDetailScreen() {
  const { user } = useAuth();
  const params = useLocalSearchParams();
  const recordId = params.id as string;
  const [record, setRecord] = useState<Record | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadRecord();
  }, [recordId]);

  const loadRecord = async () => {
    try {
      const records = await getRecords();
      const allRecords = records.length > 0 ? records : mockRecords;
      const found = allRecords.find((r) => r.id === recordId);
      setRecord(found || null);
    } catch (error) {
      console.error('載入記錄失敗:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = () => {
    Alert.alert('確認刪除', '確定要刪除此記錄嗎？', [
      { text: '取消', style: 'cancel' },
      {
        text: '確定',
        style: 'destructive',
        onPress: async () => {
          try {
            await deleteRecord(recordId);
            Alert.alert('成功', '記錄已刪除');
            router.back();
          } catch (error) {
            Alert.alert('錯誤', '刪除記錄失敗');
          }
        },
      },
    ]);
  };

  const renderStars = (rating: number) => {
    return (
      <View style={styles.recordStars}>
        {[1, 2, 3, 4, 5].map((star) => (
          <Text key={star} style={styles.recordDetailStar}>
            {star <= rating ? '★' : '☆'}
          </Text>
        ))}
      </View>
    );
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.recordContainer}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#D2B48C" />
        </View>
      </SafeAreaView>
    );
  }

  if (!record) {
    return (
      <SafeAreaView style={styles.recordContainer}>
        <View style={styles.recordHeader}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <Text style={styles.backButtonText}>←</Text>
          </TouchableOpacity>
          <Text style={styles.recordHeaderTitle}>記錄詳情</Text>
          <View style={{ width: 40 }} />
        </View>
        <View style={styles.emptyRecords}>
          <Text style={styles.emptyRecordsText}>找不到記錄</Text>
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
        <Text style={styles.recordHeaderTitle}>記錄詳情</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView style={styles.recordDetailContainer}>
        {/* 圖片 */}
        <Image source={{ uri: record.image_url }} style={styles.recordDetailImage} />

        {/* 詳細資訊 */}
        <View style={styles.recordDetailContent}>
          <View style={styles.recordDetailRow}>
            <Text style={styles.recordDetailLabel}>日期</Text>
            <Text style={styles.recordDetailValue}>{record.date}</Text>
          </View>

          <View style={styles.recordDetailRow}>
            <Text style={styles.recordDetailLabel}>記載類型</Text>
            <Text style={styles.recordDetailValue}>{record.type}</Text>
          </View>

          <View style={styles.recordDetailRow}>
            <Text style={styles.recordDetailLabel}>菜單項目</Text>
            <Text style={styles.recordDetailValue}>{record.menu_item}</Text>
          </View>

          <View style={styles.recordDetailRow}>
            <Text style={styles.recordDetailLabel}>評價</Text>
            {renderStars(record.rating)}
          </View>

          <View style={styles.recordDetailRow}>
            <Text style={styles.recordDetailLabel}>記錄內容</Text>
            <Text style={styles.recordDetailNotes}>{record.notes}</Text>
          </View>
        </View>
      </ScrollView>

      {/* 底部操作按鈕 */}
      <View style={styles.recordDetailActions}>
        <TouchableOpacity
          style={styles.recordEditButton}
          onPress={() => {
            if (!user) {
              Alert.alert('請先登入', '需要登入才能編輯記錄', [
                { text: '取消', style: 'cancel' },
                { text: '去登入', onPress: () => router.push('/login') },
              ]);
              return;
            }
            router.push(`/my-records/form?id=${record.id}`);
          }}
        >
          <Text style={styles.recordEditButtonText}>修改</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.recordDeleteButton}
          onPress={() => {
            if (!user) {
              Alert.alert('請先登入', '需要登入才能刪除記錄', [
                { text: '取消', style: 'cancel' },
                { text: '去登入', onPress: () => router.push('/login') },
              ]);
              return;
            }
            handleDelete();
          }}
        >
          <Text style={styles.recordDeleteButtonText}>刪除</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
