import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';
import darkTheme from "../themes/darkTheme";

const SearchBar = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const navigation = useNavigation();

    return (
        <View style={{ backgroundColor: darkTheme.background }} className="mt-2">
            <View className="flex-row gap-4 px-6 py-4 border-b" style={{ borderColor: darkTheme.border }}>
                {/* Menu Button */}
                <TouchableOpacity 
                    className="flex justify-center items-center p-2 rounded-full" 
                    >
                    <Image
                        source={require('../assets/icon.png')}
                        style={{ width: 40, height: 30 }}
                    />
                    {/* <Ionicons
                        name="menu"
                        size={30}
                        color={darkTheme.primary}
                    /> */}
                </TouchableOpacity>

                {/* Search Input */}
                <TouchableOpacity 
                    className="flex-row flex-1 items-center rounded-2xl px-4 py-3 border"
                    onPress={() => navigation.navigate('Search')} 
                    style={{ backgroundColor: darkTheme.surface, borderColor: darkTheme.border }}
                    activeOpacity={0.7}
                >
                    <Ionicons name="search" size={20} color={darkTheme.textSecondary} />
                    <Text
                        className="flex-1 ml-3 text-base"
                        style={{ color: darkTheme.textSecondary }}
                    >
                        Search your mind...
                    </Text>
                    {searchQuery.length > 0 && (
                        <TouchableOpacity
                            onPress={() => setSearchQuery("")}
                            className="p-1"
                        >
                            <Ionicons
                                name="close-circle"
                                size={20}
                                color={darkTheme.textSecondary}
                            />
                        </TouchableOpacity>
                    )}
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default SearchBar;
