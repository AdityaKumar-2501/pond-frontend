import { View, Text } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import darkTheme from '../themes/darkTheme';

const SpacesScreen = () => {
  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: darkTheme.background }}>
      <View className="px-6 py-4 border-b" style={{ borderColor: darkTheme.border }}>
        <Text className="text-3xl font-bold" style={{ color: darkTheme.textPrimary }}>Spaces</Text>
      </View>
    </SafeAreaView>
  );
};

export default SpacesScreen; 