import { styles } from '@/styles/styles';
import React, { useEffect, useRef, useState } from 'react';
import { Dimensions, FlatList, Image, Text, View } from 'react-native';

const { width } = Dimensions.get('window');

const carouselItems = [
  { id: 1, title: 'カジュアル着物', image: 'https://picsum.photos/seed/kimono1/400/250' },
  { id: 2, title: 'フォーマル着物', image: 'https://picsum.photos/seed/kimono2/400/250' },
  { id: 3, title: '夏の浴衣', image: 'https://picsum.photos/seed/yukata/400/250' },
];

export function Carousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % carouselItems.length;
        flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
        return nextIndex;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const onViewableItemsChanged = useRef(({ viewableItems }: any) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index || 0);
    }
  }).current;

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50,
  }).current;

  const renderItem = ({ item }: any) => (
    <View style={styles.carouselSlide}>
      <Image source={{ uri: item.image }} style={styles.carouselImage} />
      <View style={styles.carouselTextContainer}>
        <Text style={styles.carouselText}>{item.title}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.carouselContainer}>
      <FlatList
        ref={flatListRef}
        data={carouselItems}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
      />
      <View style={styles.carouselDots}>
        {carouselItems.map((_, index) => (
          <View
            key={index}
            style={[styles.dot, currentIndex === index && styles.activeDot]}
          />
        ))}
      </View>
    </View>
  );
}
