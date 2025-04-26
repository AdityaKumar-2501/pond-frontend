import React, { useRef } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, PanResponder, Animated, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import darkTheme from '../themes/darkTheme';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');
const MIN_HEIGHT = SCREEN_HEIGHT * (2/3);
const MAX_HEIGHT = SCREEN_HEIGHT;

const ImageDrawer = ({ isVisible, onClose, imageData, onDescriptionChange }) => {
  const pan = useRef(new Animated.Value(0)).current;
  const lastPanValue = useRef(0);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (_, gestureState) => {
        return Math.abs(gestureState.dy) > 5;
      },
      onPanResponderGrant: () => {
        lastPanValue.current = pan._value;
      },
      onPanResponderMove: (_, gestureState) => {
        const newValue = lastPanValue.current + gestureState.dy;
        if (newValue <= 0 && newValue >= -(MAX_HEIGHT - MIN_HEIGHT)) {
          pan.setValue(newValue);
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        const velocity = gestureState.vy;
        const currentValue = pan._value;
        const isSwipingDown = velocity > 0;
        const isSwipingUp = velocity < 0;
        const isFastSwipe = Math.abs(velocity) > 0.5;

        if (isFastSwipe) {
          if (isSwipingDown) {
            if (currentValue > -(MAX_HEIGHT - MIN_HEIGHT) * 0.3) {
              // Snap to min height
              Animated.spring(pan, {
                toValue: 0,
                useNativeDriver: false,
              }).start();
            } else {
              // Close drawer
              onClose();
            }
          } else if (isSwipingUp) {
            // Snap to max height
            Animated.spring(pan, {
              toValue: -(MAX_HEIGHT - MIN_HEIGHT),
              useNativeDriver: false,
            }).start();
          }
        } else {
          // No fast swipe, check position
          if (currentValue > -(MAX_HEIGHT - MIN_HEIGHT) * 0.5) {
            // Snap to min height
            Animated.spring(pan, {
              toValue: 0,
              useNativeDriver: false,
            }).start();
          } else {
            // Snap to max height
            Animated.spring(pan, {
              toValue: -(MAX_HEIGHT - MIN_HEIGHT),
              useNativeDriver: false,
            }).start();
          }
        }
      },
    })
  ).current;

  if (!isVisible) return null;

  return (
    <View className="absolute inset-0">
      <View className="bg-black/50 flex-1" onTouchEnd={onClose} />
      <Animated.View 
        className="bg-white rounded-t-3xl"
        style={[
          { 
            backgroundColor: darkTheme.surface,
            height: MIN_HEIGHT,
            transform: [{ translateY: pan }]
          }
        ]}
        {...panResponder.panHandlers}
      >
        <View className="w-12 h-1 bg-gray-300 rounded-full self-center my-4" />
        
        <Animated.View
          style={{
            height: Animated.add(
              MIN_HEIGHT - 24,
              Animated.multiply(pan, -1)
            )
          }}
        >
          <ScrollView 
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ padding: 24 }}
          >
            {/* Image */}
            <View className="w-full aspect-square rounded-2xl overflow-hidden mb-6" 
              style={{ backgroundColor: darkTheme.background }}>
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
                {imageData?.aiDescription || 'No description available'}
              </Text>
            </View>

            {/* Tags */}
            <View className="mb-6">
              <Text style={{ color: darkTheme.textSecondary }} className="text-sm font-medium mb-2">
                Tags
              </Text>
              <View className="flex-row flex-wrap gap-2">
                {imageData?.tags?.map((tag, index) => (
                  <View
                    key={index}
                    className="px-3 py-1 rounded-full"
                    style={{ backgroundColor: darkTheme.background }}
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
                  backgroundColor: darkTheme.background,
                  color: darkTheme.textPrimary,
                  borderColor: darkTheme.border,
                  borderWidth: 1
                }}
                placeholder="Add your description..."
                placeholderTextColor={darkTheme.textSecondary}
                value={imageData?.userDescription}
                onChangeText={onDescriptionChange}
                multiline
              />
            </View>
          </ScrollView>
        </Animated.View>
      </Animated.View>
    </View>
  );
};

export default ImageDrawer; 