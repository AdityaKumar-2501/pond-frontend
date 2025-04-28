import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';
import { Platform } from 'react-native';
import { useAuth } from './AuthContext';


const API_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:5001/api';

// Helper to get mime type from uri
const getMimeType = (uri) => {
  const extension = uri.split('.').pop().toLowerCase();
  const types = {
    'jpg': 'image/jpeg',
    'jpeg': 'image/jpeg',
    'png': 'image/png',
    'gif': 'image/gif',
    'heic': 'image/heic'
  };
  return types[extension] || 'image/jpeg';
};

const ImageContext = createContext();

export const ImageProvider = ({ children }) => {
  const [images, setImages] = useState([]);
  const [hasImages, setHasImages] = useState(false);
  const [loading, setLoading] = useState(false);
  const { userToken } = useAuth();

  const fetchImages = async () => {
    try {
      if (!userToken) {
        throw new Error('Authentication required');
      }
      setLoading(true);
      const response = await axios.get(`${API_URL}/images`, {
        headers: {
          'Authorization': `Bearer ${userToken}`,
        },
      });
      
      if (response.data.success) {
        const fetchedImages = response.data.images.map(img => ({
          id: img._id,
          uri: img.url,
          description: img.description || '',
          tags: img.tags || [],
          timestamp: img.createdAt,
          width: img.width,
          height: img.height
        }));
        setImages(fetchedImages);
        setHasImages(fetchedImages.length > 0);
      }
    } catch (error) {
      console.error('Error fetching images:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const uploadImage = async (imageUri) => {
    try {
      if (!userToken) {
        throw new Error('Authentication required');
      }

      const mimeType = getMimeType(imageUri);
      const fileName = imageUri.split('/').pop();

      const formData = new FormData();
      formData.append('image', {
        uri: Platform.OS === 'android' ? imageUri : imageUri.replace('file://', ''),
        name: fileName,
        type: mimeType,
      });

      const response = await axios.post(`${API_URL}/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${userToken}`,
        },
      });

      if (response.data.success) {
        return response.data.image;
      } else {
        throw new Error(response.data.message || 'Upload failed');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      if (error.response?.status === 401) {
        throw new Error('Please login to upload images');
      }
      throw error;
    }
  };

  const addImage = async (image) => {
    try {
      // Upload to backend first
      const uploadedImage = await uploadImage(image.uri);
      
      // Then add to local state
      const newImage = {
        id: uploadedImage._id,
        uri: uploadedImage.url,
        description: uploadedImage.description || '',
        tags: uploadedImage.tags || [],
        timestamp: uploadedImage.createdAt || new Date().toISOString(),
      };
      
      setImages(prevImages => [...prevImages, newImage]);
      setHasImages(true);
      
      return newImage.id;
    } catch (error) {
      console.error('Error in addImage:', error);
      throw error;
    }
  };

  const updateImage = (id, updates) => {
    setImages(prevImages => 
      prevImages.map(image => 
        image.id === id ? { ...image, ...updates } : image
      )
    );
  };

  const deleteImage = (id) => {
    setImages(prevImages => prevImages.filter(image => image.id !== id));
    if (images.length === 1) {
      setHasImages(false);
    }
  };

  return (
    <ImageContext.Provider value={{
      images,
      hasImages,
      loading,
      addImage,
      updateImage,
      deleteImage,
      fetchImages
    }}>
      {children}
    </ImageContext.Provider>
  );
};

export const useImages = () => {
  const context = useContext(ImageContext);
  if (!context) {
    throw new Error('useImages must be used within an ImageProvider');
  }
  return context;
}; 