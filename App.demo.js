import React from "react";
import { View, Text, TouchableOpacity, ScrollView, TextInput } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Ionicons, Feather } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "./src/components/Header";

const App = () => {
  return (
    <View style={{ flex: 1, backgroundColor: "#F4F4F4", padding: 20 }}>
      <StatusBar style="dark" />
      
      {/* Header Icons */}
      {/* <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 10 }}>
        <Ionicons name="help-circle-outline" size={28} color="black" />
        <Feather name="bell" size={28} color="black" />
      </View> */}

      <Header />

      {/* Greeting Text */}
      {/* <Text style={{ fontSize: 32, fontWeight: "bold", marginTop: 20 }}>
        Hi <Text style={{ color: "#666" }}>Nixtio</Text>,
      </Text>
      <Text style={{ fontSize: 26, fontWeight: "bold" }}>How can I help you today?</Text> */}

      {/* Search Box */}
      <View style={{ marginTop: 15, backgroundColor: "#fff", borderRadius: 10, flexDirection: "row", alignItems: "center", paddingHorizontal: 15, paddingVertical: 10 }}>
        <Feather name="search" size={24} color="gray" />
        <TextInput placeholder="Search..." style={{ flex: 1, marginLeft: 10 }} />
      </View>

      {/* Features Grid */}
      <ScrollView showsVerticalScrollIndicator={false} style={{ marginTop: 20 }}>
        <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" }}>
          {[
            { icon: "scan", title: "Scan", desc: "Documents, ID cards..." },
            { icon: "edit", title: "Edit", desc: "Sign, add text, mark..." },
            { icon: "file-text", title: "Convert", desc: "PDF, DOCX, API..." },
            { icon: "help-circle", title: "Ask AI", desc: "Summarize, fix errors..." },
          ].map((item, index) => (
            <TouchableOpacity key={index} style={{ backgroundColor: "#fff", borderRadius: 15, padding: 20, width: "48%", marginBottom: 15, alignItems: "center" }}>
              <Feather name={item.icon} size={32} color="black" />
              <Text style={{ fontSize: 18, fontWeight: "bold", marginTop: 5 }}>{item.title}</Text>
              <Text style={{ fontSize: 12, color: "gray", textAlign: "center" }}>{item.desc}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Bottom Navigation (Example Placeholder) */}
      <View style={{ flexDirection: "row", justifyContent: "space-around", backgroundColor: "#fff", padding: 15, borderRadius: 15, position: "absolute", bottom: 20, left: 20, right: 20 }}>
        <Feather name="home" size={28} color="black" />
        <Feather name="grid" size={28} color="gray" />
        <Feather name="user" size={28} color="gray" />
      </View>
    </View>
  );
};


export default App;
