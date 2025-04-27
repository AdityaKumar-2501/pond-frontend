import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  images: [],
};

const imageSlice = createSlice({
  name: 'images',
  initialState,
  reducers: {
    addImage: (state, action) => {
      state.images.push({
        id: Date.now().toString(),
        uri: action.payload.uri,
        description: action.payload.description || '',
        tags: action.payload.tags || [],
        timestamp: new Date().toISOString(),
      });
    },
    updateImage: (state, action) => {
      const index = state.images.findIndex(img => img.id === action.payload.id);
      if (index !== -1) {
        state.images[index] = {
          ...state.images[index],
          ...action.payload,
        };
      }
    },
    deleteImage: (state, action) => {
      state.images = state.images.filter(img => img.id !== action.payload);
    },
  },
});

export const { addImage, updateImage, deleteImage } = imageSlice.actions;
export default imageSlice.reducer; 