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
                <Text style={styles.prompt} numberOfLines={expandedIndex === index ? null : 2} ellipsizeMode="tail">
                  Você: {msg.prompt}
                </Text>
                <Text style={styles.response} numberOfLines={expandedIndex === index ? null : 2} ellipsizeMode="tail">
                  IA: {msg.response}
                </Text>
              </>
            )}
            <View style={styles.buttons}>
              <TouchableOpacity onPress={() => handleDelete(index)} style={styles.deleteButton} activeOpacity={0.7}>
                <Text style={styles.buttonText}>Excluir</Text>
              </TouchableOpacity>
              {editingIndex === index ? (
                <TouchableOpacity onPress={() => handleEdit(index)} style={styles.saveButton} activeOpacity={0.7}>
                  <Text style={styles.buttonText}>Salvar</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => {
                    setEditingIndex(index);
                    setEditedPrompt(msg.prompt);
                  }}
                  style={styles.editButton}
                  activeOpacity={0.7}
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
        activeOpacity={0.7}
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
    backgroundColor: "#404467", // Fundo escuro sofisticado
  },
  scrollView: {
    flex: 1,
  },
  messageContainer: {
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    backgroundColor: "#b2ccaf", // Verde claro para mensagens do usuário
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  prompt: {
    fontWeight: "bold",
    color: "#404467",
    marginBottom: 5,
  },
  response: {
    color: "#404467",
    marginTop: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#5c627a",
    backgroundColor: "#a3b6a2", // Verde suave para destacar input
    padding: 12,
    borderRadius: 8,
    color: "#404467",
    marginBottom: 10,
  },
  saveButton: {
    backgroundColor: "#a3b6a2", // Verde suave
    padding: 10,
    borderRadius: 10,
    marginLeft: 5,
  },
  editButton: {
    backgroundColor: "#849C81",
    padding: 10,
    borderRadius: 6,
    marginLeft: 5,
  },
  deleteButton: {
    backgroundColor: "#849C81",
    padding: 10,
    borderRadius: 6,
  },
  buttonText: {
    color: "#FFFBC2",
    fontSize: 14,
    fontWeight: "bold",
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  clearHistoryButton: {
    width: "100%",
    alignSelf: "center",
    backgroundColor: "#b2ccaf",
    paddingVertical: 12,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 50,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  clearHistoryButtonText: {
    color: "#404467",
    fontSize: 16,
    fontWeight: "bold",
  },
});
