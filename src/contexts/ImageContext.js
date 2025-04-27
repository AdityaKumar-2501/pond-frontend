import React, { createContext, useContext, useState } from 'react';

const ImageContext = createContext();

export const ImageProvider = ({ children }) => {
  const [images, setImages] = useState([]);
  const [hasImages, setHasImages] = useState(false);

  const addImage = (image) => {
    const newImage = {
      id: Date.now().toString(),
      uri: image.uri,
      description: image.description || '',
      tags: image.tags || [],
      timestamp: new Date().toISOString(),
    };
    setImages(prevImages => [...prevImages, newImage]);
    setHasImages(true);
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
      addImage, 
      updateImage, 
      deleteImage 
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