import { View, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import darkTheme from '../themes/darkTheme';

const RevindScreen = () => {
  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: darkTheme.background }}>
      {/* Header */}
      <View className="px-6 py-4 border-b" style={{ borderColor: darkTheme.border }}>
        <Text className="text-3xl font-bold" style={{ color: darkTheme.textPrimary }}>Revind</Text>
      </View>

      {/* Main Content */}
      <View className="flex-1 justify-center items-center px-6">
        {/* Image Card */}
        <View className="w-full aspect-[4/3] rounded-3xl overflow-hidden bg-white shadow-lg">
          <Image
            source={require('../../assets/icon.png')}
            className="w-full h-full"
            resizeMode="contain"
          />
        </View>

        {/* Action Buttons */}
        <View className="flex-row justify-center items-center gap-8 mt-12">
          <TouchableOpacity 
            className="w-32 h-32 rounded-full justify-center items-center border-2"
            style={{ borderColor: 'rgba(255,255,255,0.2)' }}
          >
            <Text className="text-xl" style={{ color: darkTheme.textPrimary }}>
              Forget
            </Text>
          </TouchableOpacity>

          <TouchableOpacity 
            className="w-32 h-32 rounded-full justify-center items-center border-2"
            style={{ borderColor: 'rgba(255,255,255,0.2)' }}
          >
            <Text className="text-xl" style={{ color: darkTheme.textPrimary }}>
              Keep
            </Text>
          </TouchableOpacity>
        </View>

        {/* Progress Dots */}
        <View className="flex-row gap-1 mt-8">
          {[...Array(15)].map((_, i) => (
            <View 
              key={i} 
              className="w-2 h-2 rounded-full"
              style={{ 
                backgroundColor: i === 0 ? darkTheme.primary : 'rgba(255,255,255,0.2)'
              }}
            />
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default RevindScreen;