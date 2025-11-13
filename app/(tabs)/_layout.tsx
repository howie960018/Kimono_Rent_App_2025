import { BookingScreen } from '@/screens/BookingScreen';
import { HomeScreen } from '@/screens/HomeScreen';
import { MapScreen } from '@/screens/MapScreen';
import { ProfileScreen } from '@/screens/ProfileScreen';
import { PromoScreen } from '@/screens/PromoScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';
import { Text } from 'react-native';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#A0522D',
        headerShown: false,
      }}
    >
      <Tab.Screen 
        name="目錄" 
        component={HomeScreen} 
        options={{
          tabBarLabel: '目錄',
          tabBarIcon: ({ color, size }) => (
            <Text style={{ fontSize: size, color }}>🏠</Text>
          ),
        }}
      />
      <Tab.Screen 
        name="地圖" 
        component={MapScreen}
        options={{
          tabBarLabel: '地圖',
          tabBarIcon: ({ color, size }) => (
            <Text style={{ fontSize: size, color }}>📍</Text>
          ),
        }}
      />
      <Tab.Screen 
        name="預約" 
        component={BookingScreen} 
        options={{
          tabBarLabel: '預約',
          tabBarIcon: ({ color, size }) => (
            <Text style={{ fontSize: size, color }}>📅</Text>
          ),
        }}
      />
      <Tab.Screen 
        name="優惠" 
        component={PromoScreen} 
        options={{
          tabBarLabel: '優惠',
          tabBarIcon: ({ color, size }) => (
            <Text style={{ fontSize: size, color }}>🎟️</Text>
          ),
        }}
      />
      <Tab.Screen 
        name="我的" 
        component={ProfileScreen} 
        options={{
          tabBarLabel: '我的',
          tabBarIcon: ({ color, size }) => (
            <Text style={{ fontSize: size, color }}>👤</Text>
          ),
        }}
      />
    </Tab.Navigator>
  );
}
