import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Modal, TextInput, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import SearchBar from '../components/SearchBar';
import darkTheme from '../themes/darkTheme';
import { useImages } from '../contexts/ImageContext';

const HomeScreen = ({ route, navigation }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [userDescription, setUserDescription] = useState('');
  const [showDeletePrompt, setShowDeletePrompt] = useState(false);
  
  const { images, deleteImage } = useImages();

  useEffect(() => {
    if (route.params?.selectedImageId) {
      const image = images.find(img => img.id === route.params.selectedImageId);
      if (image) {
        setSelectedImage(image);
        setIsModalVisible(true);
        // Clear the selectedImageId from route params after opening the modal
        navigation.setParams({ selectedImageId: undefined });
      }
    }
  }, [route.params?.selectedImageId, images]);

  const openModal = (image) => {
    setSelectedImage(image);
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setSelectedImage(null);
    setUserDescription('');
    setShowDeletePrompt(false);
  };

  const handleDelete = () => {
    if (selectedImage) {
      deleteImage(selectedImage.id);
      closeModal();
    }
  };

  const navigateToUpload = () => {
    navigation.navigate('Upload');
  };

  if (images.length === 0) {
    return (
      <SafeAreaView className="flex-1" style={{ backgroundColor: darkTheme.background }}>
        <SearchBar />
        <View className="flex-1 justify-center items-center px-6">
          <View className="w-24 h-24 rounded-full justify-center items-center mb-6" 
                style={{ backgroundColor: darkTheme.surface }}>
            <Ionicons name="images-outline" size={48} color={darkTheme.textSecondary} />
          </View>
          <Text className="text-2xl font-bold text-center mb-2" style={{ color: darkTheme.textPrimary }}>
            No Images Yet
          </Text>
          <Text className="text-base text-center mb-8" style={{ color: darkTheme.textSecondary }}>
            Start by uploading your first image to begin your journey
          </Text>
          <TouchableOpacity
            className="px-6 py-3 rounded-full"
            style={{ backgroundColor: darkTheme.primary }}
            onPress={navigateToUpload}
          >
            <Text className="text-base font-medium" style={{ color: darkTheme.textPrimary }}>
              Upload Image
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: darkTheme.background }}>
      {/* Header */}
      <SearchBar />

      {/* Content Grid */}
      <ScrollView 
        className="flex-1"
        contentContainerStyle={{ padding: 16 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="flex-row flex-wrap gap-4 mt-10 mb-20">
          {images.map((image) => {
            // Calculate aspect ratio
            const aspectRatio = image.width && image.height ? image.width / image.height : 3 / 3;
            return (
              <View key={image.id} style={{ width: '48%', aspectRatio, marginBottom: 16}}>
                <TouchableOpacity
                  className="rounded-2xl overflow-hidden border"
                  style={{ 
                    backgroundColor: darkTheme.surface, 
                    borderColor: darkTheme.border,
                    paddingVertical:8,
                    paddingHorizontal:8,
                  }}
                  onPress={() => openModal(image)}
                >
                  <Image
                    source={{ uri: image.uri }}
                    className="w-full h-full"
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              </View>
            );
          })}
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
          {/* Header with Close and Delete Button */}
          <View className="flex-row items-center justify-between px-6 py-4">
            <TouchableOpacity 
              onPress={closeModal}
              className="p-2 rounded-full"
              style={{ backgroundColor: darkTheme.surface }}
            >
              <Ionicons name="close" size={24} color={darkTheme.textPrimary} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setShowDeletePrompt(true)}
              className="p-2 rounded-full"
              style={{ backgroundColor: '#e53935', marginLeft: 'auto' }}
            >
              <Ionicons name="trash" size={24} color="#fff" />
            </TouchableOpacity>
          </View>

          {/* Delete Prompt Modal */}
          <Modal
            visible={showDeletePrompt}
            transparent={true}
            animationType="fade"
            onRequestClose={() => setShowDeletePrompt(false)}
          >
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
              <View style={{ backgroundColor: darkTheme.surface, padding: 24, borderRadius: 16, width: 300, alignItems: 'center' }}>
                <Text style={{ color: darkTheme.textPrimary, fontSize: 18, fontWeight: 'bold', marginBottom: 16, textAlign: 'center' }}>
                  Are you sure want to delete the image?
                </Text>
                <View style={{ flexDirection: 'row', marginTop: 16 }}>
                  <TouchableOpacity
                    style={{ backgroundColor: '#e53935', paddingVertical: 10, paddingHorizontal: 24, borderRadius: 8, marginRight: 12 }}
                    onPress={handleDelete}
                  >
                    <Text style={{ color: '#fff', fontWeight: 'bold' }}>Yes</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{ backgroundColor: darkTheme.primary, paddingVertical: 10, paddingHorizontal: 24, borderRadius: 8 }}
                    onPress={() => setShowDeletePrompt(false)}
                  >
                    <Text style={{ color: darkTheme.textPrimary, fontWeight: 'bold' }}>No</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>

          {/* Content */}
          <ScrollView 
            className="flex-1"
            contentContainerStyle={{ padding: 24 }}
            showsVerticalScrollIndicator={false}
          >
            {/* Image */}
            <View className="w-full aspect-square rounded-2xl overflow-hidden mb-6">
              <Image
                source={{ uri: selectedImage?.uri }}
                className="w-full h-full"
                resizeMode="contain"
              />
            </View>

            {/* Description */}
            <View className="mb-6">
              <Text style={{ color: darkTheme.textSecondary }} className="text-sm font-medium mb-2">
                Description
              </Text>
              <Text style={{ color: darkTheme.textPrimary }} className="text-base">
                {selectedImage?.description || 'No description available'}
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