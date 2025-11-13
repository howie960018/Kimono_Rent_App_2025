import { styles } from '@/styles/styles';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

const links = [
  { id: 1, icon: '🎫', label: '會員證' },
  { id: 2, icon: '⭐', label: '點' },
  { id: 3, icon: '📰', label: '最新消息' },
  { id: 4, icon: '📅', label: '預約' },
  { id: 5, icon: '🎟️', label: '優惠券' },
  { id: 6, icon: '📋', label: '菜單' },
];

export function QuickLinks() {
  return (
    <View style={styles.quickLinksContainer}>
      {links.map((link, index) => (
        <TouchableOpacity
          key={link.id}
          style={[
            styles.quickLinkButton,
            (index + 1) % 3 !== 0 && styles.quickLinkBorderRight,
            index < 3 && styles.quickLinkBorderBottom,
          ]}
        >
          <Text style={styles.quickLinkIcon}>{link.icon}</Text>
          <Text style={styles.quickLinkLabel}>{link.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}
