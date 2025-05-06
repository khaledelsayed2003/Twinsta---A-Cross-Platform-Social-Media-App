import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useState } from "react";
import { Text, View, TextInput, TouchableOpacity, FlatList, StyleSheet, KeyboardAvoidingView, Platform } from "react-native";
import { useUser } from "@clerk/clerk-expo";
import { useLocalSearchParams } from "expo-router";
import { COLORS } from "@/constants/theme";
import { Id } from "@/convex/_generated/dataModel";

import { useRouter } from "expo-router";
import { Image } from "expo-image";
import MessageItem from "./MessageItem";


export default function ChatScreen() {
  const router = useRouter();
  const { user } = useUser();
  const { userId: partnerId } = useLocalSearchParams<{ userId: string }>();
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);

  // Fetch Convex user document for current user
  const convexUser = useQuery(
    api.users.getUserByClerkId,
    user ? { clerkId: user.id } : "skip"
  );

  if (!user || !convexUser || !partnerId) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  // Fetch messages with Convex IDs
  const messages = useQuery(api.messages.getMessages, {
    senderId: convexUser._id,
    recipientId: partnerId as Id<"users">,
  });

  const sendMessageMutation = useMutation(api.messages.sendMessage);

  const handleSendMessage = async () => {
    if (!message.trim() || isSending) return;
    try {
      setIsSending(true);
      await sendMessageMutation({
        senderId: convexUser._id,
        recipientId: partnerId as Id<"users">,
        content: message.trim(),
      });
      setMessage("");
    } catch (error) {
      console.error("Failed to send message:", error);
    } finally {
      setIsSending(false);
    }
  };

  if (!messages) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 24 : 0}
    >
      <View style={styles.gradientBackground}>
        <FlatList
          data={messages}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <MessageItem item={item} isSent={item.senderId === convexUser._id} router={router} styles={styles} />
          )}
          contentContainerStyle={{ paddingVertical: 16 }}
        />

        <View style={styles.inputContainer}>
          <TextInput
            value={message}
            onChangeText={setMessage}
            placeholder="Type a message..."
            placeholderTextColor="#b2b8c6"
            style={styles.input}
          />
          <TouchableOpacity
            style={styles.sendButton}
            onPress={handleSendMessage}
            disabled={isSending}
          >
            <Text style={styles.sendButtonText}>
              {isSending ? "Sending..." : "Send"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

// ... existing code ...
const styles = StyleSheet.create({
  gradientBackground: {
    flex: 1,
    backgroundColor: "#181824",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#181824",
  },
  loadingText: {
    color: "#fff",
    fontSize: 16,
  },
  messageRow: {
    flexDirection: "row",
    marginBottom: 10,
    alignItems: "flex-end",
  },
  sentRow: {
    justifyContent: "flex-end",
  },
  receivedRow: {
    justifyContent: "flex-start",
  },
  messageBubble: {
    maxWidth: "60%",
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 18,
    marginHorizontal: 4,
    shadowColor: "#ff4d4f",
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
    minHeight: 36,
  },
  sentBubble: {
    backgroundColor: "#ff4d4f",
    borderTopRightRadius: 8,
    alignSelf: "flex-end",
    borderWidth: 1.2,
    borderColor: "#ffb3b3",
    shadowColor: "#ff4d4f",
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 6,
  },
  receivedBubble: {
    backgroundColor: "#23243a",
    borderTopLeftRadius: 8,
    alignSelf: "flex-start",
    borderWidth: 1.2,
    borderColor: "#3a3c5a",
    shadowColor: "#00c6ff",
    shadowOpacity: 0.18,
    shadowRadius: 8,
    elevation: 4,
  },
  messageText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "600",
    letterSpacing: 0.1,
    textShadowColor: "#0008",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  timestamp: {
    fontSize: 10,
    color: "#ffb3b3",
    marginTop: 4,
    alignSelf: "flex-end",
    fontWeight: "bold",
    textShadowColor: "#0004",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 1,
    letterSpacing: 0.3,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 8,
    paddingBottom: Platform.OS === "ios" ? 14 : 8,
    borderTopWidth: 1,
    borderTopColor: "#23243a",
    backgroundColor: "#181824",
  },
  input: {
    flex: 1,
    padding: 12,
    borderRadius: 22,
    backgroundColor: "#23243a",
    color: "#fff",
    marginRight: 8,
    fontSize: 15,
    borderWidth: 1,
    borderColor: "#23243a",
    shadowColor: "#00c6ff",
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 1,
  },
  sendButton: {
    backgroundColor: "#ff4d4f",
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 22,
    shadowColor: "#ff4d4f",
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 2,
  },
  sendButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 15,
    letterSpacing: 0.5,
  },
});




