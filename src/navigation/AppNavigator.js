import React from 'react';
import { View, Text, Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from '../screens/HomeScreen';
import UploadScreen from '../screens/UploadScreen';
import RevindScreen from '../screens/RevindScreen';
import SearchScreen from '../screens/SearchScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const TabIcon = ({ focused, icon, label }) => (
  <View style={{ alignItems: 'center', justifyContent: 'center', width:100,}}>
    <Ionicons 
      name={icon} 
      size={24} 
      color={focused ? '#fff' : 'rgba(255, 255, 255, 0.5)'} 
    />
    <Text style={{
      marginTop: 4,
      fontSize: 12,
      color: focused ? '#fff' : 'rgba(255, 255, 255, 0.5)',
    }}>
      {label}
    </Text>
  </View>
);

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#000',
          borderTopWidth: 0,
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: 80,
          elevation: 0,
          shadowOpacity: 0,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          paddingTop: 20
        },
        tabBarShowLabel: false,
        tabBarHideOnKeyboard: true
      }}
    >
      <Tab.Screen 
        name="Everything" 
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon 
              focused={focused} 
              icon="grid-outline" 
              label="Everything"
            />
          ),
        }}
      />
      <Tab.Screen 
        name="Upload" 
        component={UploadScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon 
              focused={focused} 
              icon="add-circle-outline" 
              label="Upload"
            />
          ),
        }}
      />
      <Tab.Screen 
        name="Revisit" 
        component={RevindScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon 
              focused={focused} 
              icon="time-outline" 
              label="Revisit"
              color={focused ? '#FF5733' : 'rgba(255, 255, 255, 0.5)'}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const AppNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="MainTabs" component={TabNavigator} />
      <Stack.Screen name="Search" component={SearchScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigator; 