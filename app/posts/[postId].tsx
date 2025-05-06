import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useRouter, useLocalSearchParams } from "expo-router";
import { View, Text, Image } from "react-native";
import { COLORS } from "@/constants/theme";
// ... existing code ...
import { Id } from "@/convex/_generated/dataModel";
// ... existing code ...
import { Ionicons } from "@expo/vector-icons";
import { ActivityIndicator } from "react-native";


// ... existing code ...

export default function PostDetails() {
  const { postId } = useLocalSearchParams<{ postId: string }>();
  const router = useRouter();

  const post = useQuery(api.posts.getPostById, postId ? { postId: postId as Id<"posts"> } : "skip");

  if (post === undefined) {
    return (
      <View style={{
        flex: 1,
        backgroundColor: COLORS.background,
        justifyContent: "center",
        alignItems: "center",
        padding: 24,
      }}>
        <ActivityIndicator size="large" color={COLORS.primary} style={{ marginBottom: 24 }} />
        <Text style={{
          color: COLORS.primary,
          fontSize: 24,
          fontWeight: "bold",
          marginBottom: 12,
          textAlign: "center",
        }}>
          Loading Post...
        </Text>
        <Text style={{
          color: COLORS.white,
          fontSize: 16,
          textAlign: "center",
        }}>
          Please wait while we fetch this awesome post for you!
        </Text>
      </View>
    );
  }

  // ... existing code ...
  if (!post) {
    return (
      <View style={{
        flex: 1,
        backgroundColor: COLORS.background,
        justifyContent: "center",
        alignItems: "center",
        padding: 24,
      }}>
        <Ionicons name="sad-outline" size={120} color="#FF6347" />
        <Text style={{
          color: COLORS.primary,
          fontSize: 28,
          fontWeight: "bold",
          marginBottom: 12,
          textAlign: "center",
        }}>
          Sorry!
        </Text>
        <Text style={{
          color: COLORS.white,
          fontSize: 20,
          fontWeight: "600",
          marginBottom: 8,
          textAlign: "center",
        }}>
          This post has been deleted.
        </Text>
        <Text style={{
          color: COLORS.grey,
          fontSize: 16,
          textAlign: "center",
          marginBottom: 24,
        }}>
          You weren't fast enough to watch it...
        </Text>
      </View>
    );
  }
// ... existing code ...

  // ... existing code ...
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "black",
        padding: 16,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View
        style={{
          width: "100%",
          backgroundColor: "rgba(40, 44, 52, 0.85)", // glassmorphism effect
          borderRadius: 28,
          shadowColor: "#00c6ff",
          shadowOffset: { width: 0, height: 10 },
          shadowOpacity: 0.35,
          shadowRadius: 24,
          elevation: 14,
          padding: 0,
          marginBottom: 24,
          borderWidth: 1.5,
          borderColor: "#3a3c5a",
          overflow: "hidden",
        }}
      >
        <Image
          source={{ uri: post.imageUrl }}
          style={{
            width: "100%",
            height: 300,
            borderTopLeftRadius: 28,
            borderTopRightRadius: 28,
            marginBottom: 0,
            marginTop: 0,
            borderBottomWidth: 2,
            borderColor: "#ff4d4f",
          }}
          resizeMode="cover"
        />
        <View
          style={{
            padding: 22,
            backgroundColor: "rgba(30, 32, 48, 0.7)",
            borderBottomLeftRadius: 28,
            borderBottomRightRadius: 28,
          }}
        >
          <Text
            style={{
              color: "#fff",
              fontSize: 24,
              fontWeight: "bold",
              marginBottom: 10,
              textShadowColor: "#0008",
              textShadowOffset: { width: 0, height: 2 },
              textShadowRadius: 6,
              letterSpacing: 0.5,
            }}
          >
            {post.caption}
          </Text>
          <View style={{ flexDirection: "row", alignItems: "center", marginTop: 10 }}>
            <View
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                backgroundColor: "#444",
                justifyContent: "center",
                alignItems: "center",
                marginRight: 12,
                overflow: "hidden",
                borderWidth: 2,
                borderColor: "#ff4d4f",
              }}
            >
              {post.author?.image ? (
                <Image
                  source={{ uri: post.author.image }}
                  style={{ width: 40, height: 40, borderRadius: 20 }}
                />
              ) : (
                <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 20 }}>
                  {post.author?.username?.[0]?.toUpperCase() || "?"}
                </Text>
              )}
            </View>
            <Text
              style={{
                color: "#b2b8c6",
                fontSize: 17,
                fontWeight: "600",
                textShadowColor: "#0004",
                textShadowOffset: { width: 0, height: 1 },
                textShadowRadius: 2,
              }}
            >
              Posted by{" "}
              <Text style={{ color: "#ff4d4f", fontWeight: "bold" }}>
                {post.author?.username}
              </Text>
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
// ... existing code ...
}


////////////////////////////////////////////
