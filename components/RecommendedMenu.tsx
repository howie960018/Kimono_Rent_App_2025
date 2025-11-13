import { styles } from '@/styles/styles';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

const menuItems = [
  { id: 1, name: '着物 丸洗い', price: '¥4,400〜', image: 'https://via.placeholder.com/60' },
  { id: 2, name: '着物 仕立て', price: '¥12,000〜', image: 'https://via.placeholder.com/60' },
  { id: 3, name: '帯 クリーニング', price: '¥3,300〜', image: 'https://via.placeholder.com/60' },
];

export function RecommendedMenu() {
  return (
    <View style={styles.menuContainer}>
      <Text style={styles.sectionTitle}>推薦菜單</Text>
      {menuItems.map((item) => (
        <View key={item.id} style={styles.menuItem}>
          <Image source={{ uri: item.image }} style={styles.menuImage} />
          <View style={styles.menuContent}>
            <Text style={styles.menuName}>{item.name}</Text>
            <Text style={styles.menuPrice}>{item.price}</Text>
          </View>
          <TouchableOpacity>
            <Text style={styles.starIcon}>☆</Text>
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
}
