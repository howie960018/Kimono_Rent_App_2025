import { styles } from '@/styles/styles';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface HeaderProps {
  onMenuPress?: () => void;
  title?: string;
}

export function Header({ onMenuPress, title = '川平屋' }: HeaderProps) {
  return (
    <SafeAreaView edges={['top']} style={styles.headerSafeArea}>
      <View style={styles.headerContainer}>
        <View style={{ flex: 1 }} />
        <View style={styles.logoContainer}>
          <Text style={styles.logoText}>{title}</Text>
        </View>
        <View style={styles.headerIcons}>
          <TouchableOpacity>
            <Text style={styles.iconText}>👤</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onMenuPress}>
            <Text style={styles.iconText}>☰</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
