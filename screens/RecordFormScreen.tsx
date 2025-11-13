import { styles } from '@/styles/styles';
import { MENU_ITEMS, RECORD_TYPES, Record, mockRecords } from '@/types/record';
import { getRecords, saveRecord, updateRecord } from '@/utils/recordStorage';
import DateTimePicker from '@react-native-community/datetimepicker';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    Image,
    Modal,
    Platform,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export function RecordFormScreen() {
  const params = useLocalSearchParams();
  const editMode = !!params.id;

  const [loading, setLoading] = useState(editMode);
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [type, setType] = useState('');
  const [showTypePicker, setShowTypePicker] = useState(false);
  const [menuItem, setMenuItem] = useState('');
  const [showMenuPicker, setShowMenuPicker] = useState(false);
  const [rating, setRating] = useState(0);
  const [notes, setNotes] = useState('');
  const [imageUrl, setImageUrl] = useState('https://via.placeholder.com/400x250?text=Upload+Image');

  // 載入編輯資料
  useEffect(() => {
    if (editMode && params.id) {
      loadRecord(params.id as string);
    }
  }, [editMode, params.id]);

  const loadRecord = async (recordId: string) => {
    try {
      const records = await getRecords();
      const allRecords = records.length > 0 ? records : mockRecords;
      const record = allRecords.find((r) => r.id === recordId);
      
      if (record) {
        // 解析日期
        const dateMatch = record.date.match(/(\d+)年(\d+)月(\d+)日/);
        if (dateMatch) {
          const [, year, month, day] = dateMatch;
          setDate(new Date(parseInt(year), parseInt(month) - 1, parseInt(day)));
        }
        
        setType(record.type);
        setMenuItem(record.menu_item);
        setRating(record.rating);
        setNotes(record.notes);
        setImageUrl(record.image_url);
      }
    } catch (error) {
      console.error('載入記錄失敗:', error);
      Alert.alert('錯誤', '載入記錄失敗');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date: Date) => {
    return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
  };

  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(Platform.OS === 'ios');
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  const handleSubmit = async () => {
    // 驗證必填欄位
    if (!type) {
      Alert.alert('錯誤', '請選擇記載類型');
      return;
    }
    if (!menuItem) {
      Alert.alert('錯誤', '請選擇菜單項目');
      return;
    }

    const record: Record = {
      id: editMode ? (params.id as string) : `R${Date.now()}`,
      date: formatDate(date),
      type,
      menu_item: menuItem,
      rating,
      notes,
      image_url: imageUrl,
      status: 'completed',
    };

    try {
      if (editMode) {
        await updateRecord(record.id, record);
        Alert.alert('成功', '記錄已更新');
      } else {
        await saveRecord(record);
        Alert.alert('成功', '記錄已新增');
      }
      router.back();
    } catch (error) {
      Alert.alert('錯誤', '儲存記錄失敗');
    }
  };

  const PickerModal = ({
    visible,
    onClose,
    options,
    onSelect,
    title,
  }: {
    visible: boolean;
    onClose: () => void;
    options: string[];
    onSelect: (value: string) => void;
    title: string;
  }) => (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.pickerModalOverlay}>
        <View style={styles.pickerModalContainer}>
          <View style={styles.pickerModalHeader}>
            <Text style={styles.pickerModalTitle}>{title}</Text>
            <TouchableOpacity onPress={onClose}>
              <Text style={styles.pickerModalClose}>✕</Text>
            </TouchableOpacity>
          </View>
          <ScrollView>
            {options.map((option) => (
              <TouchableOpacity
                key={option}
                style={styles.pickerOption}
                onPress={() => {
                  onSelect(option);
                  onClose();
                }}
              >
                <Text style={styles.pickerOptionText}>{option}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.recordContainer}>
        <View style={styles.recordHeader}>
          <View style={{ width: 40 }} />
          <Text style={styles.recordHeaderTitle}>載入中...</Text>
          <TouchableOpacity onPress={() => router.back()}>
            <Text style={styles.recordCloseButton}>✕</Text>
          </TouchableOpacity>
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
        <View style={{ width: 40 }} />
        <Text style={styles.recordHeaderTitle}>
          {editMode ? '修改記錄內容' : '新增記錄內容'}
        </Text>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.recordCloseButton}>✕</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.recordFormContainer}>
        {/* 日期 */}
        <View style={styles.formGroup}>
          <Text style={styles.formLabel}>
            日期 <Text style={styles.requiredStar}>*</Text>
          </Text>
          <TouchableOpacity
            style={styles.formInput}
            onPress={() => setShowDatePicker(true)}
          >
            <Text>{formatDate(date)}</Text>
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              value={date}
              mode="date"
              display="default"
              onChange={handleDateChange}
            />
          )}
        </View>

        {/* 記載類型 */}
        <View style={styles.formGroup}>
          <Text style={styles.formLabel}>
            要記載什麼呢？ <Text style={styles.requiredStar}>*</Text>
          </Text>
          <TouchableOpacity
            style={styles.formInput}
            onPress={() => setShowTypePicker(true)}
          >
            <Text style={type ? {} : styles.formPlaceholder}>
              {type || '請選擇類型'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* 選擇菜單 */}
        <View style={styles.formGroup}>
          <Text style={styles.formLabel}>
            請選擇菜單 <Text style={styles.requiredStar}>*</Text>
          </Text>
          <TouchableOpacity
            style={styles.formInput}
            onPress={() => setShowMenuPicker(true)}
          >
            <Text style={menuItem ? {} : styles.formPlaceholder}>
              {menuItem || '請選擇菜單項目'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* 評價 */}
        <View style={styles.formGroup}>
          <Text style={styles.formLabel}>評價</Text>
          <View style={styles.ratingContainer}>
            {[1, 2, 3, 4, 5].map((star) => (
              <TouchableOpacity key={star} onPress={() => setRating(star)}>
                <Text style={styles.ratingStar}>{star <= rating ? '★' : '☆'}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* 記錄 */}
        <View style={styles.formGroup}>
          <Text style={styles.formLabel}>記錄</Text>
          <TextInput
            style={styles.formTextArea}
            multiline
            numberOfLines={4}
            value={notes}
            onChangeText={setNotes}
            placeholder="請輸入記錄內容..."
          />
        </View>

        {/* 圖片 */}
        <View style={styles.formGroup}>
          <Text style={styles.formLabel}>圖片</Text>
          <Image source={{ uri: imageUrl }} style={styles.recordFormImage} />
        </View>

        {/* 確認按鈕 */}
        <TouchableOpacity style={styles.recordSubmitButton} onPress={handleSubmit}>
          <Text style={styles.recordSubmitButtonText}>
            {editMode ? '更新' : '確認'}
          </Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Pickers */}
      <PickerModal
        visible={showTypePicker}
        onClose={() => setShowTypePicker(false)}
        options={RECORD_TYPES}
        onSelect={setType}
        title="選擇記載類型"
      />
      <PickerModal
        visible={showMenuPicker}
        onClose={() => setShowMenuPicker(false)}
        options={MENU_ITEMS}
        onSelect={setMenuItem}
        title="選擇菜單"
      />
    </SafeAreaView>
  );
}
