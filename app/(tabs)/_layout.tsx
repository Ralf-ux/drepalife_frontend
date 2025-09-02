import React from 'react';
import { Tabs } from 'expo-router';
import { View, Image } from 'react-native';
import { Chrome as Home, Newspaper, CircleHelp as HelpCircle, User } from 'lucide-react-native';
import { Colors } from '@/constants/Colors';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.gray400,
        tabBarStyle: {
          backgroundColor: Colors.white,
          borderTopWidth: 1,
          borderTopColor: Colors.gray200,
          paddingBottom: 8,
          paddingTop: 8,
          height: 70,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontFamily: 'Inter-Medium',
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ size, color }) => (
            <Home size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="news"
        options={{
          title: 'News',
          tabBarIcon: ({ size, color }) => (
            <Newspaper size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="health-logo"
        options={{
          title: '',
          tabBarIcon: () => (
            <View style={{
              width: 50,
              height: 50,
              borderRadius: 25,
              backgroundColor: Colors.primary,
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: -10,
            }}>
              <Image
                source={require('@/assets/images/drepa.png')}
                style={{ width: 30, height: 30 }}
                resizeMode="contain"
              />
            </View>
          ),
        }}
        listeners={{
          tabPress: (e) => {
            e.preventDefault();
            // Navigate to main health dashboard or show health menu
          },
        }}
      />
      <Tabs.Screen
        name="faq"
        options={{
          title: 'FAQ',
          tabBarIcon: ({ size, color }) => (
            <HelpCircle size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ size, color }) => (
            <User size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
