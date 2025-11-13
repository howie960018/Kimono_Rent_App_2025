import { Carousel } from '@/components/Carousel';
import { DrawerMenu } from '@/components/DrawerMenu';
import { Header } from '@/components/Header';
import { NewsList } from '@/components/NewsList';
import { QuickLinks } from '@/components/QuickLinks';
import { RecommendedMenu } from '@/components/RecommendedMenu';
import { SocialMedia } from '@/components/SocialMedia';
import { styles } from '@/styles/styles';
import React, { useState } from 'react';
import { ScrollView, View } from 'react-native';

export function HomeScreen() {
  const [menuVisible, setMenuVisible] = useState(false);

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={styles.container}>
        <Header onMenuPress={() => setMenuVisible(true)} />
        <Carousel />
        <QuickLinks />
        <NewsList />
        <RecommendedMenu />
        <SocialMedia />
      </ScrollView>
      <DrawerMenu visible={menuVisible} onClose={() => setMenuVisible(false)} />
    </View>
  );
}
