import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import darkTheme from '../themes/darkTheme';

const SearchScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    // Auto focus the input when screen mounts
    // You might want to use a ref here for more precise control
  }, []);

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: darkTheme.background }}>
      {/* Search Header */}
      <View className="flex-row items-center px-4 py-2 border-b" 
        style={{ borderColor: darkTheme.border }}>
        <TouchableOpacity 
          onPress={() => navigation.goBack()}
          className="p-2 mr-2"
        >
          <Ionicons name="arrow-back" size={24} color={darkTheme.textPrimary} />
        </TouchableOpacity>
        <TextInput
          className="flex-1 px-4 py-2 rounded-xl text-base"
          style={{
            backgroundColor: darkTheme.surface,
            color: darkTheme.textPrimary,
            borderColor: darkTheme.border,
            borderWidth: 1,
          }}
          placeholder="Search your mind..."
          placeholderTextColor={darkTheme.textSecondary}
          value={searchQuery}
          onChangeText={setSearchQuery}
          autoFocus={true}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity
            onPress={() => setSearchQuery('')}
            className="p-2 ml-2"
          >
            <Ionicons name="close-circle" size={24} color={darkTheme.textSecondary} />
          </TouchableOpacity>
        )}
      </View>

      {/* Search Results */}
      <ScrollView 
        className="flex-1"
        contentContainerStyle={{ padding: 16 }}
        showsVerticalScrollIndicator={false}
      >
        {searchQuery.length > 0 ? (
          // Search results would go here
          <View className="items-center justify-center py-12">
            <View className="w-16 h-16 rounded-full items-center justify-center mb-4" 
              style={{ backgroundColor: darkTheme.surface }}>
              <Ionicons name="search" size={32} color={darkTheme.textSecondary} />
            </View>
            <Text style={{ color: darkTheme.textSecondary }} className="text-lg">No results found</Text>
            <Text style={{ color: darkTheme.textSecondary }} className="mt-2">Try different keywords</Text>
          </View>
        ) : (
          // Recent searches or suggestions
          <View>
            <Text style={{ color: darkTheme.textSecondary }} className="text-sm font-medium mb-4">Recent searches</Text>
            {['Project Ideas', 'Design Inspiration', 'Research Notes'].map((item, index) => (
              <TouchableOpacity
                key={index}
                className="flex-row items-center py-4 border-b"
                style={{ borderColor: darkTheme.border }}
                onPress={() => setSearchQuery(item)}
              >
                <View className="w-8 h-8 rounded-full items-center justify-center mr-3" 
                  style={{ backgroundColor: darkTheme.surface }}>
                  <Ionicons name="time-outline" size={16} color={darkTheme.textSecondary} />
                </View>
                <Text style={{ color: darkTheme.textPrimary }} className="text-base">{item}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default SearchScreen; 