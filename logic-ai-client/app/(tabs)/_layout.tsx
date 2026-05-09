import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function TabLayout() {
  return (
    <SafeAreaProvider
      style={[{ backgroundColor: "#F8F9FE" }, { paddingTop: 60 }]}
    >
      <Tabs
        screenOptions={{ tabBarActiveTintColor: "#1A237E", headerShown: false }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: "Home",
            tabBarIcon: ({ color }) => (
              <Ionicons name="home" size={24} color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="practice"
          options={{
            title: "Tests",
            tabBarIcon: ({ color }) => (
              <Ionicons name="book" size={24} color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="analytics"
          options={{
            title: "Analysis",
            tabBarIcon: ({ color }) => (
              <Ionicons name="analytics" size={24} color={color} />
            ),
          }}
        />
         <Tabs.Screen
          name="ca"
          options={{
            title: "CA",
            tabBarIcon: ({ color }) => (
              <Ionicons name="pulse-outline" size={24} color={color} />
            ),
          }}
        />
        {/* <Tabs.Screen
          name="battle"
          options={{
            title: "Battle",
            tabBarIcon: ({ color }) => (
              <Ionicons name="war" size={24} color={color} />
            ),
          }}
        /> */}
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            tabBarIcon: ({ color }) => (
              <Ionicons name="person" size={24} color={color} />
            ),
          }}
        />
      </Tabs>
    </SafeAreaProvider>
  );
}
