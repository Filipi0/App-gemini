import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo ao Chat!</Text>
      
      <TouchableOpacity 
        style={styles.chatButton}
        onPress={() => navigation.navigate("Chat")}
      >
        <Text style={styles.buttonText}>Iniciar Chat</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.historyButton} 
        onPress={() => navigation.navigate("History")}
      >
        <Text style={styles.buttonText}>Ver Histórico</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: "center", 
    alignItems: "center", 
    padding: 20
  },
  title: { 
    fontSize: 24, 
    marginBottom: 30,
    fontWeight: "bold",
  },
  chatButton: {
    backgroundColor: "#4caf50",
    padding: 12,
    borderRadius: 16,
    marginBottom: 20,
    width: "50%",
    alignItems: "center",
  },
  historyButton: {
    backgroundColor: "#2196f3",
    padding: 12,
    borderRadius: 16,
    width: "70%",
    alignItems: "center",
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
