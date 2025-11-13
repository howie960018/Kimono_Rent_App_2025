import { styles } from '@/styles/styles';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

const newsItems = [
  {
    id: 1,
    date: '2025.11.10',
    title: 'お客様感謝デー開催',
    content: '11月15日より感謝デーを開催します',
    image: 'https://via.placeholder.com/60',
    isNew: true,
  },
  {
    id: 2,
    date: '2025.11.5',
    title: '新作着物入荷のお知らせ',
    content: '冬の新作着物が入荷しました',
    image: 'https://via.placeholder.com/60',
    isNew: true,
  },
  {
    id: 3,
    date: '2025.10.28',
    title: '年末年始の営業時間',
    content: '12月30日〜1月3日まで休業',
    image: 'https://via.placeholder.com/60',
    isNew: false,
  },
];

export function NewsList() {
  return (
    <View style={styles.newsContainer}>
      <View style={styles.newsTitleRow}>
        <Text style={styles.sectionTitle}>最新消息</Text>
        <TouchableOpacity style={styles.viewMoreButton}>
          <Text style={styles.viewMoreText}>查看更多</Text>
        </TouchableOpacity>
      </View>
      {newsItems.map((item) => (
        <TouchableOpacity key={item.id} style={styles.newsItem}>
          <Image source={{ uri: item.image }} style={styles.newsImage} />
          <View style={styles.newsContent}>
            <View style={styles.newsHeader}>
              {item.isNew && <View style={styles.newDot} />}
              <Text style={styles.newsDate}>{item.date}</Text>
            </View>
            <Text style={styles.newsTitle}>{item.title}</Text>
            <Text style={styles.newsDescription}>{item.content}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
}
