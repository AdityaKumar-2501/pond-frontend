import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import darkTheme from '../themes/darkTheme';

const LoginScreen = ({ setIsLoggedIn }) => {
  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: darkTheme.background }}>
      <View className="flex-1 items-center justify-center px-8">
        {/* App Logo/Icon */}
        <View className="w-32 h-32 rounded-full items-center justify-center mb-8"
          style={{ backgroundColor: darkTheme.surface }}>
          <Ionicons name="image-outline" size={64} color={darkTheme.primary} />
        </View>

        {/* Welcome Text */}
        <Text 
          className="text-4xl font-bold text-center mb-6" 
          style={{ color: darkTheme.textPrimary }}
        >
          Welcome to mymind
        </Text>

        {/* Description */}
        <Text 
          className="text-lg text-center mb-12" 
          style={{ color: darkTheme.textSecondary }}
        >
          Your personal space to organize and explore your visual memories
        </Text>

        {/* Login Button */}
        <TouchableOpacity
          className="flex-row items-center px-6 py-4 rounded-2xl mb-4"
          style={{ backgroundColor: darkTheme.primary }}
          onPress={handleLogin}
        >
          <Text 
            className="text-lg font-semibold" 
            style={{ color: darkTheme.textPrimary }}
          >
            Continue with Google
          </Text>
        </TouchableOpacity>

        {/* Privacy Policy */}
        <Text 
          className="text-sm text-center mt-8" 
          style={{ color: darkTheme.textSecondary }}
        >
          By continuing, you agree to our Terms of Service and Privacy Policy
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen; 