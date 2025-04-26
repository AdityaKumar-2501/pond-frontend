import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import darkTheme from '../themes/darkTheme';

const CollectionsScreen = () => {
  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: darkTheme.background }}>
      {/* Header */}
      <View className="flex-row items-center justify-between px-6 py-4 border-b" style={{ borderColor: darkTheme.border }}>
        <Text className="text-3xl font-bold" style={{ color: darkTheme.textPrimary }}>Collections</Text>
        <TouchableOpacity className="p-2 rounded-full" style={{ backgroundColor: darkTheme.surface }}>
          <Ionicons name="add-circle-outline" size={24} color={darkTheme.primary} />
        </TouchableOpacity>
      </View>

      {/* Collections List */}
      <ScrollView 
        className="flex-1"
        contentContainerStyle={{ padding: 16 }}
        showsVerticalScrollIndicator={false}
      >
        {['Inspiration', 'Work', 'Personal', 'Research'].map((collection, index) => (
          <TouchableOpacity
            key={index}
            className="flex-row items-center justify-between p-4 mb-3 rounded-2xl border"
            style={{ backgroundColor: darkTheme.surface, borderColor: darkTheme.border }}
          >
            <View className="flex-row items-center flex-1">
              <View className="w-12 h-12 rounded-xl items-center justify-center mr-4" 
                style={{ backgroundColor: darkTheme.background }}>
                <Ionicons name="folder-outline" size={24} color={darkTheme.primary} />
              </View>
              <View className="flex-1">
                <Text style={{ color: darkTheme.textPrimary }} className="text-lg font-semibold">{collection}</Text>
                <Text style={{ color: darkTheme.textSecondary }} className="text-sm">12 items</Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={20} color={darkTheme.textSecondary} />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default CollectionsScreen; 