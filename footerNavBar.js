import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Platform } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { Feather, Ionicons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

// Placeholder Screens
const HomeScreen = () => <View style={styles.screen}><Text>Home Screen</Text></View>;
const ProfileScreen = () => <View style={styles.screen}><Text>Profile Screen</Text></View>;
const MoreScreen = () => <View style={styles.screen}><Text>More Options</Text></View>;
const ScanScreen = () => <View style={styles.screen}><Text>Scan Feature</Text></View>;

// Custom Bottom Tab Bar
const CustomTabBar = ({ state, descriptors, navigation }) => {
  return (
    <View style={styles.tabBarContainer}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const iconName = route.name === "Home" ? "home" : route.name === "More" ? "grid" : "user";
        const isFocused = state.index === index;

        // Custom Middle Button for Scan
        if (route.name === "Scan") {
          return (
            <TouchableOpacity
              key={route.key}
              style={styles.scanButton}
              onPress={() => navigation.navigate(route.name)}
            >
              <Ionicons name="scan-outline" size={30} color="#fff" />
            </TouchableOpacity>
          );
        }

        return (
          <TouchableOpacity
            key={route.key}
            onPress={() => navigation.navigate(route.name)}
            style={[styles.tabButton, isFocused && styles.tabButtonFocused]}
          >
            <Feather name={iconName} size={24} color={isFocused ? "black" : "gray"} />
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

// Bottom Tab Navigation Setup
export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{ headerShown: false }}
        tabBar={(props) => <CustomTabBar {...props} />}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        {/* <Tab.Screen name="Scan" component={ScanScreen} /> */}
        <Tab.Screen name="More" component={MoreScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

// Styles
const styles = StyleSheet.create({
  screen: { flex: 1, justifyContent: "center", alignItems: "center" },
  
  tabBarContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    borderRadius: 50,
    paddingHorizontal: 20,
    paddingVertical: 10,
    elevation: 5, // Shadow for Android
    shadowColor: "#000", // Shadow for iOS
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },

  tabButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
  },

  tabButtonFocused: {
    borderBottomWidth: 2,
    borderBottomColor: "black",
  },

  scanButton: {
    position: "absolute",
    bottom: 25,
    left: "50%",
    marginLeft: -30, // Centering
    backgroundColor: "black",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5, // Shadow for Android
    shadowColor: "#000", // Shadow for iOS
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
});
