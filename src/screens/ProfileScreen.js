import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import darkTheme from '../themes/darkTheme';

const ProfileScreen = () => {
  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: darkTheme.background }}>
      {/* Header */}
      <View className="px-6 py-4 border-b" style={{ borderColor: darkTheme.border }}>
        <Text className="text-3xl font-bold" style={{ color: darkTheme.textPrimary }}>Profile</Text>
      </View>

      <ScrollView 
        className="flex-1"
        showsVerticalScrollIndicator={false}
      >
        {/* User Info */}
        <View className="items-center py-8 px-6">
          <View className="w-24 h-24 rounded-full items-center justify-center mb-4 border-2" 
            style={{ backgroundColor: darkTheme.surface, borderColor: darkTheme.border }}>
            <Ionicons name="person" size={40} color={darkTheme.primary} />
          </View>
          <Text style={{ color: darkTheme.textPrimary }} className="text-2xl font-semibold">Your Name</Text>
          <Text style={{ color: darkTheme.textSecondary }} className="mt-1">@username</Text>
        </View>

        {/* Stats */}
        <View className="flex-row justify-around py-6 px-6 border-y" 
          style={{ backgroundColor: darkTheme.surface, borderColor: darkTheme.border }}>
          <View className="items-center">
            <Text style={{ color: darkTheme.textPrimary }} className="text-2xl font-bold">128</Text>
            <Text style={{ color: darkTheme.textSecondary }} className="text-sm">Items</Text>
          </View>
          <View className="items-center">
            <Text style={{ color: darkTheme.textPrimary }} className="text-2xl font-bold">12</Text>
            <Text style={{ color: darkTheme.textSecondary }} className="text-sm">Collections</Text>
          </View>
          <View className="items-center">
            <Text style={{ color: darkTheme.textPrimary }} className="text-2xl font-bold">4</Text>
            <Text style={{ color: darkTheme.textSecondary }} className="text-sm">Tags</Text>
          </View>
        </View>

        {/* Settings */}
        <View className="py-6 px-6">
          <Text style={{ color: darkTheme.textSecondary }} className="text-sm font-medium mb-4">Settings</Text>
          {[
            { icon: 'settings-outline', label: 'App Settings' },
            { icon: 'notifications-outline', label: 'Notifications' },
            { icon: 'lock-closed-outline', label: 'Privacy' },
            { icon: 'help-circle-outline', label: 'Help & Support' },
            { icon: 'information-circle-outline', label: 'About' },
          ].map((item, index) => (
            <TouchableOpacity
              key={index}
              className="flex-row items-center py-4 border-b"
              style={{ borderColor: darkTheme.border }}
            >
              <View className="w-10 h-10 rounded-xl items-center justify-center mr-4" 
                style={{ backgroundColor: darkTheme.surface }}>
                <Ionicons name={item.icon} size={20} color={darkTheme.primary} />
              </View>
              <Text style={{ color: darkTheme.textPrimary }} className="text-base flex-1">{item.label}</Text>
              <Ionicons
                name="chevron-forward"
                size={20}
                color={darkTheme.textSecondary}
              />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen; 