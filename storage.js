import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "chatHistory";

export async function getMessages() {
  const messages = await AsyncStorage.getItem(STORAGE_KEY);
  return messages ? JSON.parse(messages) : [];
}

export async function saveMessage(message) {
  const messages = await getMessages();
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify([...messages, message]));
}

export async function deleteMessage(index) {
  const messages = await getMessages();
  messages.splice(index, 1);
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
}

export async function clearMessages() {
  await AsyncStorage.removeItem(STORAGE_KEY);
}