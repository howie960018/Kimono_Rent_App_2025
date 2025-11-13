import { styles } from '@/styles/styles';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

const newsItems = [
  {
    id: 1,
    date: '2025.11.10',
    title: '顧客感謝日活動',
    content: '11月15日起舉辦感謝日活動',
    image: 'https://via.placeholder.com/60',
    isNew: true,
  },
  {
    id: 2,
    date: '2025.11.5',
    title: '新品和服入貨通知',
    content: '冬季新品和服已上架',
    image: 'https://via.placeholder.com/60',
    isNew: true,
  },
  {
    id: 3,
    date: '2025.10.28',
    title: '年末年初營業時間',
    content: '12月30日～1月3日公休',
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
