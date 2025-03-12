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
    backgroundColor: "#404467", // Fundo escuro
  },
  title: { 
    fontSize: 28, 
    marginBottom: 30,
    fontWeight: "bold",
    color: "#fffaac", // Texto amarelo claro
    textAlign: "center",
  },
  buttonContainer: {
    width: "100%",
    alignItems: "center",
    gap: 15, // Espaçamento entre os botões
  },
  chatButton: {
    backgroundColor: "#a3b6a2", // Verde suave
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 25,
    width: "70%",
    alignItems: "center",
    shadowColor: "#000", // Sombra
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 6, // Para Android
  },
  historyButton: {
    backgroundColor: "#a3b6a2", // Verde mais claro
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
    color: "#404467", // Texto escuro contrastante
    fontSize: 18,
    fontWeight: "bold",
  },
});
