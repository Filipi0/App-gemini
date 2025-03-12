import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo ao Chat!</Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.chatButton}
          onPress={() => navigation.navigate("Chat")}
          activeOpacity={0.7} // Efeito ao pressionar
        >
          <Text style={styles.buttonText}>Iniciar Chat</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.historyButton} 
          onPress={() => navigation.navigate("History")}
          activeOpacity={0.7} // Efeito ao pressionar
        >
          <Text style={styles.buttonText}>Ver Histórico</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: "center", 
    alignItems: "center", 
    padding: 20,
    backgroundColor: "#404467",
  },
  title: { 
    fontSize: 28, 
    marginBottom: 30,
    fontWeight: "bold",
    color: "#fffaac", 
    textAlign: "center",
  },
  buttonContainer: {
    width: "100%",
    alignItems: "center",
    gap: 15,
  },
  chatButton: {
    backgroundColor: "#a3b6a2", 
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 25,
    width: "70%",
    alignItems: "center",
    shadowColor: "#000", 
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 6,
  },
  historyButton: {
    backgroundColor: "#a3b6a2",
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 25,
    width: "70%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 6,
  },
  buttonText: {
    color: "#404467", 
    fontSize: 18,
    fontWeight: "bold",
  },
});
