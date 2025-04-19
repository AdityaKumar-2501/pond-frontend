import React from "react";
import { StatusBar } from "expo-status-bar";
import { Ionicons, Feather } from "@expo/vector-icons";
import { View, Text, TouchableOpacity, ScrollView, TextInput } from "react-native";

function Header() {
    return (
        <View>
            <StatusBar style="dark" />
            {/* Header Icons */}
            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginTop: 10,
                }}  
            >
                <Ionicons name="help-circle-outline" size={28} color="black" />
                <Feather name="user" size={28} color="black" />
            </View>
        </View>
    );
}

export default Header;
