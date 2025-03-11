import React, { useState } from "react";
import { View, ScrollView, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { fetchGeminiResponse } from "../geminiApi";
import { saveMessage } from "../storage";

export default function ChatScreen() {
  const [input, setInput] = useState("");
  const [conversation, setConversation] = useState([]);

  const handleSend = async () => {
    if (input.trim() === "") return;

    const aiResponse = await fetchGeminiResponse(input);
    const conversationItem = { prompt: input, response: aiResponse };

    setConversation(prev => [...prev, conversationItem]);

    await saveMessage(conversationItem);

    setInput("");
  };

  return (
    <View style={styles.container}>
      {/* Input no topo */}
      <View style={styles.inputContainer}>
        <TextInput
          value={input}
          onChangeText={setInput}
          placeholder="Digite seu prompt..."
          placeholderTextColor="#fffaac"
          style={styles.input}
        />
        <TouchableOpacity onPress={handleSend} style={styles.sendButton} activeOpacity={0.7}>
          <Text style={styles.buttonText}>Enviar</Text>
        </TouchableOpacity>
      </View>

      {/* Mensagens abaixo */}
      <ScrollView style={styles.scrollView}>
        {conversation.map((msg, index) => (
          <View key={index} style={msg.prompt ? styles.userMessage : styles.aiMessage}>
            <Text style={styles.prompt}>Você: {msg.prompt}</Text>
            <Text style={styles.response}>IA: {msg.response}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#404467", // Fundo escuro elegante
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    borderRadius: 10,
    backgroundColor: "#5c627a", // Cinza-azulado para destacar o input
    padding: 8,
  },
  input: {
    flex: 1,
    padding: 12,
    color: "#fffaac", // Amarelo para destacar o texto do input
    fontSize: 16,
  },
  sendButton: {
    backgroundColor: "#b2ccaf", // Verde claro
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginLeft: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5, // Para Android
  },
  buttonText: {
    color: "#404467",
    fontSize: 16,
    fontWeight: "bold",
  },
  scrollView: {
    flex: 1,
  },
  userMessage: {
    alignSelf: "flex-end",
    backgroundColor: "#b2ccaf", // Verde claro para o usuário
    padding: 12,
    borderRadius: 12,
    marginBottom: 10,
    maxWidth: "80%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    elevation: 2,
  },
  aiMessage: {
    alignSelf: "flex-start",
    backgroundColor: "#a3b6a2", // Verde suave para a IA
    padding: 12,
    borderRadius: 12,
    marginBottom: 10,
    maxWidth: "80%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    elevation: 2,
  },
  prompt: {
    fontWeight: "bold",
    color: "#404467",
  },
  response: {
    marginTop: 5,
    color: "#404467",
  },
});
