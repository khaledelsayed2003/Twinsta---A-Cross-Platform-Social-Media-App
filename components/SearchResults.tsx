import { Link } from "expo-router";
import { Text, View, Image, TouchableOpacity, ScrollView } from "react-native";
import { COLORS } from "@/constants/theme";
import { useAuth } from "@clerk/clerk-expo";


interface User {
  _id: string;
  username: string;
  imageUrl?: string; // Optional image URL
}

interface SearchResultsProps {
  searchResults: User[];
}

const SearchResults = ({ searchResults }: SearchResultsProps) => {
  const { userId: currentUserId } = useAuth(); // Get the current user's ID

  return (
    <ScrollView
      style={{
        backgroundColor: COLORS.background,
        maxHeight: 300,
        position: "absolute",
        top: 60,
        left: 0,
        right: 0,
        zIndex: 1000,
      }}
    >
      {searchResults.length > 0 ? (
        searchResults.map((user) => (
          <Link
            key={user._id}
            href={
              currentUserId === user._id
                ? "/(tabs)/profile" // Navigate to the current user's profile in tabs
                : `/user/${user._id}` // Navigate to another user's profile
            }
            asChild
          >
            <TouchableOpacity
              style={{
                flexDirection: "row",
                alignItems: "center",
                padding: 12,
                borderBottomWidth: 0.5,
                borderBottomColor: COLORS.grey,
              }}
            >
              <Image
                source={{
                  uri: user.imageUrl || "https://via.placeholder.com/40", 
                }}
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  marginRight: 12,
                }}
              />
              <Text
                style={{
                  color: COLORS.white,
                  fontSize: 14,
                  fontWeight: "500",
                }}
              >
                {user.username}
              </Text>
            </TouchableOpacity>
          </Link>
        ))
      ) : (
        <View key="no-results" style={{ padding: 16 }}>
          <Text
            style={{
              color: COLORS.primary,
              fontSize: 14,
              textAlign: "center",
            }}
          >
            No users found
          </Text>
        </View>
      )}
    </ScrollView>
  );
};

export default SearchResults;

