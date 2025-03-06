import React, { useEffect, useState } from "react";
import { View, ScrollView, Text, TouchableOpacity, TextInput, StyleSheet } from "react-native";
import { getMessages, deleteMessage, clearMessages, saveMessage } from "../storage";
import { fetchGeminiResponse } from "../geminiApi";

export default function HistoryScreen() {
  const [messages, setMessages] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editedPrompt, setEditedPrompt] = useState("");
  const [expandedIndex, setExpandedIndex] = useState(null);

  useEffect(() => {
    (async () => setMessages(await getMessages()))();
  }, []);

  const handleDelete = async (index) => {
    await deleteMessage(index);
    setMessages(await getMessages());
  };

  const handleEdit = async (index) => {
    if (editedPrompt.trim() === "") return;

    const newAiResponse = await fetchGeminiResponse(editedPrompt);
    const updatedMessage = { prompt: editedPrompt, response: newAiResponse };

    const updatedMessages = [...messages];
    updatedMessages[index] = updatedMessage;

    await clearMessages();
    for (const msg of updatedMessages) {
      await saveMessage(msg);
    }

    setMessages(updatedMessages);
    setEditingIndex(null);
  };

  const handleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {messages.map((msg, index) => (
          <TouchableOpacity key={index} onPress={() => handleExpand(index)} style={styles.messageContainer}>
            {editingIndex === index ? (
              <TextInput
                value={editedPrompt}
                onChangeText={setEditedPrompt}
                style={styles.input}
              />
            ) : (
              <>
                <Text style={styles.prompt} numberOfLines={expandedIndex === index ? null : 3} ellipsizeMode="tail">Você: {msg.prompt}</Text>
                <Text style={styles.response} numberOfLines={expandedIndex === index ? null : 3} ellipsizeMode="tail">IA: {msg.response}</Text>
              </>
            )}
            <View style={styles.buttons}>
              <TouchableOpacity onPress={() => handleDelete(index)} style={styles.deleteButton}>
                <Text style={styles.buttonText}>Excluir</Text>
              </TouchableOpacity>
              {editingIndex === index ? (
                <TouchableOpacity onPress={() => handleEdit(index)} style={styles.saveButton}>
                  <Text style={styles.buttonText}>Salvar</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => {
                    setEditingIndex(index);
                    setEditedPrompt(msg.prompt);
                  }}
                  style={styles.editButton}
                >
                  <Text style={styles.buttonText}>Editar</Text>
                </TouchableOpacity>
              )}
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <TouchableOpacity
        style={styles.clearHistoryButton}
        onPress={async () => {
          await clearMessages();
          setMessages([]);
        }}
      >
        <Text style={styles.clearHistoryButtonText}>Limpar Histórico</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f8f8f8",
  },
  messageContainer: {
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    backgroundColor: "#ffffff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  prompt: {
    fontWeight: "bold",
    marginBottom: 5,
  },
  response: {
    marginTop: 5,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  saveButton: {
    backgroundColor: "#4caf50",
    padding: 8,
    borderRadius: 8,
    marginLeft: 5,
  },
  editButton: {
    backgroundColor: "#2196f3",
    padding: 8,
    borderRadius: 8,
    marginLeft: 5,
  },
  deleteButton: {
    backgroundColor: "#ff4d4d",
    padding: 8,
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  clearHistoryButton: {
    width: "80%",
    alignSelf: "center",
    backgroundColor: "#ff5722",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 0,
    marginBottom: 50,
  },
  clearHistoryButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});