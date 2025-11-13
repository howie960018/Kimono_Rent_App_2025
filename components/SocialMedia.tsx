import { styles } from '@/styles/styles';
import React from 'react';
import { Linking, Text, TouchableOpacity, View } from 'react-native';

export function SocialMedia() {
  const openLink = (url: string) => {
    Linking.openURL(url);
  };

  return (
    <View style={styles.socialContainer}>
      <Text style={styles.socialTitle}>SOCIAL MEDIA</Text>
      <View style={styles.socialIcons}>
        <TouchableOpacity
          style={styles.socialButton}
          onPress={() => openLink('https://www.facebook.com')}
        >
          <Text style={styles.socialIcon}>👍</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.socialButton}
          onPress={() => openLink('https://www.instagram.com')}
        >
          <Text style={styles.socialIcon}>📷</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.socialButton}
          onPress={() => openLink('https://line.me')}
        >
          <Text style={styles.socialIcon}>💬</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
