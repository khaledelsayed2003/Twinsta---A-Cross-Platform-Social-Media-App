import { Text, View, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import { Image } from "expo-image";
import { COLORS } from "@/constants/theme";
import { formatDistanceToNow } from 'date-fns';
import { Loader } from "@/components/Loader";

export default function MessagesScreen() {
  const router = useRouter();
  const { user } = useUser();

  // Fetch Convex user document using Clerk ID
  const convexUser = useQuery(
    api.users.getUserByClerkId,
    user ? { clerkId: user.id } : "skip"
  );

  // Fetch conversations using Convex user ID
  const conversations = useQuery(
    api.messages.getConversations,
    convexUser ? { userId: convexUser._id } : "skip"
  );

  if (!user || !convexUser || conversations === undefined) {
    return <Loader />;
  }

  if (conversations === null || conversations.length === 0) {
    return <View style={styles.container}><Text style={styles.emptyText}>No messages yet.</Text></View>;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={conversations}
        keyExtractor={(item) => item.partnerId}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.conversationItem}
            onPress={() => router.push(`/messages/${item.partnerId}`)}
          >
            <View style={styles.avatarContainer}>
              {item.partnerImage ? (
                <Image
                  source={item.partnerImage}
                  style={styles.avatar}
                  contentFit="cover"
                  cachePolicy="memory-disk"
                />
              ) : (
                <Text style={{ color: COLORS.white, fontWeight: 'bold', fontSize: 20, textAlign: 'center' }}>
                  {item.partnerUsername?.slice(0, 2).toUpperCase() || 'US'}
                </Text>  
              )}
            </View>
            <View style={styles.conversationDetails}>
              <Text style={styles.username}>{item.partnerUsername}</Text> 
              <Text style={styles.lastMessage} numberOfLines={1}>
                {item.lastMessageContent && item.lastMessageContent.trim() !== ""
                  ? item.lastMessageContent
                  : "Shared a post"}
              </Text>
            </View>
            <Text style={styles.timestamp}>
              {item.lastMessageTimestamp
                ? formatDistanceToNow(new Date(item.lastMessageTimestamp), { addSuffix: true })
                : ""}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#181824",
    paddingHorizontal: 8,
    paddingTop: 8,
  },
  emptyText: {
    color: "#aaa",
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
    letterSpacing: 0.5,
  },
  conversationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(30, 32, 48, 0.95)',
    borderRadius: 14,
    marginVertical: 7,
    padding: 10,
    shadowColor: "#00c6ff",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.18,
    shadowRadius: 10,
    elevation: 4,
    borderWidth: 1,
    borderColor: 'rgba(0,198,255,0.10)',
    borderLeftWidth: 5,
    borderLeftColor: "#00c6ff",
    minHeight: 60,
    maxHeight: 70,
  },
  avatarContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    width: 40,
    marginRight: 12,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: '#00c6ff',
    shadowColor: "#00c6ff",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.18,
    shadowRadius: 3,
    elevation: 1,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    backgroundColor: 'linear-gradient(135deg, #00c6ff 0%, #0072ff 100%)',
  },
  conversationDetails: {
    flex: 1,
    marginRight: 6,
  },
  username: {
    color: "#fff",
    fontWeight: '700',
    fontSize: 15,
    marginBottom: 1,
    letterSpacing: 0.2,
    textShadowColor: '#00c6ff33',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 1,
  },
  lastMessage: {
    color: "#b2b8c6",
    fontSize: 13,
    fontWeight: '400',
    marginTop: 0,
    letterSpacing: 0.05,
  },
  timestamp: {
    color: "#00c6ff",
    fontSize: 11,
    marginLeft: 'auto',
    alignSelf: 'flex-start',
    paddingTop: 2,
    fontWeight: '500',
    textShadowColor: '#00c6ff22',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 1,
  },
});
