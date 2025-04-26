import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import darkTheme from '../themes/darkTheme';

const UploadScreen = () => {
  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: darkTheme.background }}>
      {/* Header */}
      <View className="px-6 py-4 border-b" style={{ borderColor: darkTheme.border }}>
        <Text className="text-3xl font-bold" style={{ color: darkTheme.textPrimary }}>Upload</Text>
      </View>

      {/* Upload Area */}
      <View className="flex-1 justify-center items-center p-6">
        <View 
          className="w-full aspect-[4/3] rounded-3xl border-2 border-dashed justify-center items-center"
          style={{ borderColor: 'rgba(255,255,255,0.2)' }}
        >
          <View className="items-center">
            <Ionicons 
              name="cloud-upload-outline" 
              size={64} 
              color="rgba(255,255,255,0.5)" 
            />
            <Text 
              className="text-xl mt-4 mb-2" 
              style={{ color: darkTheme.textPrimary }}
            >
              Upload Image
            </Text>
            <Text 
              className="text-center text-base mb-6" 
              style={{ color: darkTheme.textSecondary }}
            >
              Tap to choose a file from your device
            </Text>
            <TouchableOpacity
              className="px-6 py-3 rounded-full"
              style={{ backgroundColor: darkTheme.primary }}
            >
              <Text className="text-base font-medium" style={{ color: darkTheme.textPrimary }}>
                Choose File
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Upload Tips */}
        <View className="mt-8">
          <Text className="text-sm mb-2" style={{ color: darkTheme.textSecondary }}>
            Supported formats:
          </Text>
          <View className="flex-row flex-wrap gap-2">
            {['JPG', 'PNG', 'GIF', 'HEIC'].map((format, index) => (
              <View
                key={index}
                className="px-3 py-1 rounded-full"
                style={{ backgroundColor: darkTheme.surface }}
              >
                <Text style={{ color: darkTheme.textPrimary }}>
                  {format}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default UploadScreen; 