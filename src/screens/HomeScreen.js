import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Modal, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import SearchBar from '../components/SearchBar';
import darkTheme from '../themes/darkTheme';

const HomeScreen = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [userDescription, setUserDescription] = useState('');

  const openModal = (image) => {
    setSelectedImage({
      ...image,
      aiDescription: 'This is a sample AI-generated description of the image. It provides context and details about the visual content.',
      tags: ['Nature', 'Landscape', 'Photography']
    });
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setSelectedImage(null);
    setUserDescription('');
  };

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: darkTheme.background }}>
      {/* Header */}
      <SearchBar />
      {/* <View className="flex-row items-center justify-between px-6 py-4 border-b" style={{ borderColor: darkTheme.border }}>
        <Text className="text-3xl font-bold" style={{ color: darkTheme.textPrimary }}>mymind</Text>
        <TouchableOpacity className="p-2 rounded-full" style={{ backgroundColor: darkTheme.surface }}>
          <Ionicons name="add-circle-outline" size={24} color={darkTheme.primary} />
        </TouchableOpacity>
      </View> */}

      {/* Content Grid */}
      <ScrollView 
        className="flex-1"
        contentContainerStyle={{ padding: 16 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="flex-row flex-wrap gap-4 mt-10 mb-20">
          {[
            { type: 'tall', id: 1, height: 'h-72', iconSize: 40, text: 'Featured', textSize: 'text-lg', circleSize: 'w-20 h-20' },
            { type: 'regular', id: 2, height: 'h-56', iconSize: 32, text: 'Item', textSize: 'text-base', circleSize: 'w-16 h-16' },
            { type: 'regular', id: 3, height: 'h-44', iconSize: 32, text: 'Item', textSize: 'text-base', circleSize: 'w-16 h-16' },
            { type: 'tall', id: 4, height: 'h-64', iconSize: 40, text: 'Featured', textSize: 'text-lg', circleSize: 'w-20 h-20' },
            { type: 'tall', id: 5, height: 'h-52', iconSize: 40, text: 'Featured', textSize: 'text-lg', circleSize: 'w-20 h-20' },
            { type: 'regular', id: 6, height: 'h-60', iconSize: 32, text: 'Item', textSize: 'text-base', circleSize: 'w-16 h-16' },
            { type: 'regular', id: 7, height: 'h-48', iconSize: 32, text: 'Item', textSize: 'text-base', circleSize: 'w-16 h-16' },
            { type: 'tall', id: 8, height: 'h-68', iconSize: 40, text: 'Featured', textSize: 'text-lg', circleSize: 'w-20 h-20' }
          ].map((item, index) => (
            <View key={item.id} className="w-[48%]">
              <TouchableOpacity
                className={`${item.height} rounded-2xl overflow-hidden border mb-4`}
                style={{ 
                  backgroundColor: darkTheme.surface, 
                  borderColor: darkTheme.border,
                }}
                onPress={() => openModal({ type: item.type, id: item.id })}
              >
                <View className="flex-1 items-center justify-center p-4">
                  <View className={`${item.circleSize} rounded-full items-center justify-center mb-4`}
                    style={{ backgroundColor: darkTheme.background }}>
                    <Ionicons name="image-outline" size={item.iconSize} color={darkTheme.textSecondary} />
                  </View>
                  <Text style={{ color: darkTheme.textSecondary }} className={`text-center ${item.textSize}`}>{item.text}</Text>
                </View>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Image Modal */}
      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={closeModal}
      >
        <View className="flex-1" style={{ backgroundColor: darkTheme.background }}>
          {/* Header with Close Button */}
          <View className="flex-row items-center justify-between px-6 py-4">
            <TouchableOpacity 
              onPress={closeModal}
              className="p-2 rounded-full"
              style={{ backgroundColor: darkTheme.surface }}
            >
              <Ionicons name="close" size={24} color={darkTheme.textPrimary} />
            </TouchableOpacity>
          </View>

          {/* Content */}
          <ScrollView 
            className="flex-1"
            contentContainerStyle={{ padding: 24 }}
            showsVerticalScrollIndicator={false}
          >
            {/* Image */}
            <View className="w-full aspect-square rounded-2xl overflow-hidden mb-6" 
              style={{ backgroundColor: darkTheme.surface }}>
              <View className="flex-1 items-center justify-center">
                <Ionicons name="image-outline" size={64} color={darkTheme.textSecondary} />
              </View>
            </View>

            {/* AI Description */}
            <View className="mb-6">
              <Text style={{ color: darkTheme.textSecondary }} className="text-sm font-medium mb-2">
                AI Description
              </Text>
              <Text style={{ color: darkTheme.textPrimary }} className="text-base">
                {selectedImage?.aiDescription || 'No description available'}
              </Text>
            </View>

            {/* Tags */}
            <View className="mb-6">
              <Text style={{ color: darkTheme.textSecondary }} className="text-sm font-medium mb-2">
                Tags
              </Text>
              <View className="flex-row flex-wrap gap-2">
                {selectedImage?.tags?.map((tag, index) => (
                  <View
                    key={index}
                    className="px-3 py-1 rounded-full"
                    style={{ backgroundColor: darkTheme.surface }}
                  >
                    <Text style={{ color: darkTheme.textPrimary }} className="text-sm">
                      {tag}
                    </Text>
                  </View>
                ))}
              </View>
            </View>

            {/* User Description */}
            <View>
              <Text style={{ color: darkTheme.textSecondary }} className="text-sm font-medium mb-2">
                Your Description
              </Text>
              <TextInput
                className="w-full p-4 rounded-2xl text-base"
                style={{ 
                  backgroundColor: darkTheme.surface,
                  color: darkTheme.textPrimary,
                  borderColor: darkTheme.border,
                  borderWidth: 1
                }}
                placeholder="Add your description..."
                placeholderTextColor={darkTheme.textSecondary}
                value={userDescription}
                onChangeText={setUserDescription}
                multiline
              />
            </View>
          </ScrollView>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default HomeScreen; 