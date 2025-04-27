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
  const [showAddTagPrompt, setShowAddTagPrompt] = useState(false);
  const [newTag, setNewTag] = useState('');
  const [tagColors, setTagColors] = useState({});
  
  const { images, deleteImage, updateImage } = useImages();

  // Generate random color for tags
  const getRandomColor = () => {
    const colors = [
      '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEEAD',
      '#D4A5A5', '#9B59B6', '#3498DB', '#E74C3C', '#2ECC71',
      '#F1C40F', '#E67E22', '#1ABC9C', '#34495E', '#7F8C8D'
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  // Initialize or update tag colors when modal opens
  useEffect(() => {
    if (selectedImage && selectedImage.tags) {
      const newColors = {};
      selectedImage.tags.forEach(tag => {
        if (!tagColors[tag]) {
          newColors[tag] = getRandomColor();
        }
      });
      setTagColors(prev => ({ ...prev, ...newColors }));
    }
  }, [selectedImage]);

  useEffect(() => {
    if (route.params?.selectedImageId) {
      const image = images.find(img => img.id === route.params.selectedImageId);
      if (image) {
        setSelectedImage(image);
        setIsModalVisible(true);
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
    setShowAddTagPrompt(false);
    setNewTag('');
  };

  const handleDelete = () => {
    if (selectedImage) {
      deleteImage(selectedImage.id);
      closeModal();
    }
  };

  const handleAddTag = () => {
    if (newTag.trim() && selectedImage) {
      const updatedTags = [...(selectedImage.tags || []), newTag.trim()];
      const updatedImage = { ...selectedImage, tags: updatedTags };
      setSelectedImage(updatedImage);
      updateImage(selectedImage.id, { tags: updatedTags });
      setNewTag('');
      setShowAddTagPrompt(false);
      // Add color for the new tag
      setTagColors(prev => ({
        ...prev,
        [newTag.trim()]: getRandomColor()
      }));
    }
  };

  const handleDeleteTag = (tagToDelete) => {
    if (selectedImage) {
      const updatedTags = selectedImage.tags.filter(tag => tag !== tagToDelete);
      const updatedImage = { ...selectedImage, tags: updatedTags };
      setSelectedImage(updatedImage);
      updateImage(selectedImage.id, { tags: updatedTags });
      // Remove the color for the deleted tag
      setTagColors(prev => {
        const newColors = { ...prev };
        delete newColors[tagToDelete];
        return newColors;
      });
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
              
              {/* Add Tag Button */}
              <View className="flex-row items-center mb-4">
                <TouchableOpacity
                  className="py-3 px-1 rounded-xl items-center justify-center"
                  style={{ 
                    backgroundColor: darkTheme.primary,
                    width: '30%'
                  }}
                  onPress={() => setShowAddTagPrompt(true)}
                >
                  <View className="flex-row items-center">
                    <Ionicons name="add-circle-outline" size={16} color={darkTheme.textPrimary} />
                    <Text style={{ color: darkTheme.textPrimary }} className="text-base font-medium ml-2">
                      Add Tag
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>

              {/* Tags List */}
              <View className="flex-row flex-wrap gap-2">
                {selectedImage?.tags?.map((tag, index) => (
                  <View
                    key={index}
                    className="flex-row items-center px-3 py-1 rounded-full"
                    style={{ 
                      backgroundColor: tagColors[tag] || getRandomColor(),
                      opacity: 0.8
                    }}
                  >
                    <Text style={{ color: '#fff', fontWeight: '500' }} className="text-sm">
                      {tag}
                    </Text>
                    <TouchableOpacity
                      className="ml-2"
                      onPress={() => handleDeleteTag(tag)}
                    >
                      <Ionicons name="close-circle" size={16} color="#fff" />
                    </TouchableOpacity>
                  </View>
                ))}
              </View>

              {/* Add Tag Prompt Modal */}
              <Modal
                visible={showAddTagPrompt}
                transparent={true}
                animationType="fade"
                onRequestClose={() => setShowAddTagPrompt(false)}
              >
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
                  <View style={{ backgroundColor: darkTheme.surface, padding: 24, borderRadius: 16, width: 300 }}>
                    <Text style={{ color: darkTheme.textPrimary, fontSize: 18, fontWeight: 'bold', marginBottom: 16, textAlign: 'center' }}>
                      Add New Tag
                    </Text>
                    <TextInput
                      className="w-full p-3 rounded-xl text-base mb-4"
                      style={{
                        backgroundColor: darkTheme.background,
                        color: darkTheme.textPrimary,
                        borderColor: darkTheme.border,
                        borderWidth: 1
                      }}
                      placeholder="Enter tag name..."
                      placeholderTextColor={darkTheme.textSecondary}
                      value={newTag}
                      onChangeText={setNewTag}
                      autoFocus={true}
                    />
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                      <TouchableOpacity
                        style={{ 
                          backgroundColor: darkTheme.background, 
                          paddingVertical: 10, 
                          paddingHorizontal: 24, 
                          borderRadius: 8,
                          flex: 1,
                          marginRight: 8
                        }}
                        onPress={() => {
                          setShowAddTagPrompt(false);
                          setNewTag('');
                        }}
                      >
                        <Text style={{ color: darkTheme.textPrimary, textAlign: 'center', fontWeight: 'bold' }}>
                          Cancel
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={{ 
                          backgroundColor: darkTheme.primary, 
                          paddingVertical: 10, 
                          paddingHorizontal: 24, 
                          borderRadius: 8,
                          flex: 1,
                          marginLeft: 8
                        }}
                        onPress={handleAddTag}
                      >
                        <Text style={{ color: darkTheme.textPrimary, textAlign: 'center', fontWeight: 'bold' }}>
                          Save
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </Modal>
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