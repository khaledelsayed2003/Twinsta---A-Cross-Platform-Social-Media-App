import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { View, Text, TouchableOpacity } from "react-native";
import { Image } from "expo-image";

type MessageItemProps = {
    item: any; 
    isSent: boolean;
    router: any; 
    styles: any;
};


export default function MessageItem({ item, isSent, router, styles } : MessageItemProps) {
  const post = item.postId
    ? useQuery(api.posts.getPostById, { postId: item.postId })
    : null;

  if (item.postId) {
    if (!post) {
      return (
        <View style={[styles.messageRow, isSent ? styles.sentRow : styles.receivedRow]}>
          <View style={[styles.messageBubble, isSent ? styles.sentBubble : styles.receivedBubble]}>
            <Text style={styles.messageText}>[Shared post unavailable]</Text>
          </View>
        </View>
      );
    }
    return (
      <View style={[styles.messageRow, isSent ? styles.sentRow : styles.receivedRow]}>
        <TouchableOpacity
          style={[
            styles.messageBubble,
            isSent ? styles.sentBubble : styles.receivedBubble,
            { padding: 0, overflow: "hidden" },
          ]}
          onPress={() => router.push({ pathname: "/(tabs)", params: { initialPostId: item.postId } })}
          activeOpacity={0.85}
        >
          <Image
            source={post.imageUrl}
            style={{ width: 180, height: 180, borderTopLeftRadius: 18, borderTopRightRadius: 18 }}
            contentFit="cover"
            cachePolicy="memory-disk"
          />
          <View style={{ padding: 10 }}>
            <Text style={[styles.messageText, { fontWeight: "bold" }]}>
              {post.caption || "Shared a post"}
            </Text>
            <Text style={{ color: "#b2b8c6", fontSize: 12, marginTop: 4 }}>
              Tap to view post
            </Text>
            <Text style={{
                        color: "#b2b8c6",
                        fontSize: 11,
                        marginTop: 6,
                        textAlign: "right"
                  }}>
                        {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </Text>
            
            
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  // Regular message
  return (
    <View style={[styles.messageRow, isSent ? styles.sentRow : styles.receivedRow]}>
      <View style={[styles.messageBubble, isSent ? styles.sentBubble : styles.receivedBubble]}>
        <Text style={styles.messageText}>{item.content}</Text>
        <Text style={styles.timestamp}>
          {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </Text>
      </View>
    </View>
  );
}