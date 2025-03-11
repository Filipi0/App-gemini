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
          style={styles.input}
        />
        <TouchableOpacity onPress={handleSend} style={styles.sendButton}>
          <Text style={styles.buttonText}>Enviar</Text>
        </TouchableOpacity>
      </View>

      {/* Mensagens abaixo */}
      <ScrollView style={styles.scrollView}>
        {conversation.map((msg, index) => (
          <View key={index} style={styles.messageContainer}>
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
    backgroundColor: "#f8f8f8",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10, // Adiciona espaço abaixo para não ficar colado ao ScrollView
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 8,
  },
  sendButton: {
    marginLeft: 10,
    backgroundColor: "#4caf50",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
  scrollView: {
    flex: 1, // Permite que o ScrollView ocupe o espaço restante
  },
  messageContainer: {
    padding: 10,
    borderRadius: 8,
    marginBottom: 15,
    backgroundColor: "#ffffff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    elevation: 3,
  },
  prompt: { fontWeight: "bold", marginBottom: 5 },
  response: { marginTop: 5 },
});
