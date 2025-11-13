import { styles } from '@/styles/styles';
import React from 'react';
import { Linking, Text, TouchableOpacity, View } from 'react-native';

export function SocialMedia() {
  const openLink = (url: string) => {
    Linking.openURL(url);
  };

  return (
    <View style={styles.socialContainer}>
      <Text style={styles.sectionTitle}>社交媒體</Text>
      <View style={styles.socialButtonsRow}>
        <TouchableOpacity
          style={styles.socialButton}
          onPress={() => openLink('https://www.facebook.com')}
        >
          <Text style={styles.socialButtonText}>Facebook</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.socialButton}
          onPress={() => openLink('https://www.instagram.com')}
        >
          <Text style={styles.socialButtonText}>Instagram</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.socialButton}
          onPress={() => openLink('https://line.me')}
        >
          <Text style={styles.socialButtonText}>LINE</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
