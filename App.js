// App.js
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from "./screens/HomeScreen";
import ChatScreen from "./screens/ChatScreen";
import HistoryScreen from "./screens/HistoryScreen";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: "Início" }} />
        <Stack.Screen name="Chat" component={ChatScreen} options={{ title: "Chat Gemini" }} />
        <Stack.Screen name="History" component={HistoryScreen} options={{ title: "Histórico" }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
