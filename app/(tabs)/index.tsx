import { FlatList, RefreshControl, Text, TouchableOpacity, View } from "react-native";
import { styles } from "../../styles/feed.styles";
import { router, useLocalSearchParams } from "expo-router";
import { useAuth } from "@clerk/clerk-expo";
import { COLORS } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Loader } from "@/components/Loader";
import Post from "@/components/Post";
import StoriesSection from "@/components/Stories";
import { useState, useCallback, useEffect, useRef } from "react";
import SearchBar from "@/components/SearchBar";
import SearchResults from "@/components/SearchResults";
import { Id } from "@/convex/_generated/dataModel";

type SearchResult = {
  _id: Id<"users">;
  username: string;
  imageUrl: string;
};

export default function Index() {
  const { signOut } = useAuth();
  const [refreshing, setRefreshing] = useState(false);
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const flatListRef = useRef<FlatList>(null);
  const { initialPostId } = useLocalSearchParams();

  // Data fetching hooks
  const posts = useQuery(api.posts.getFeedPosts);
  const searchedUsers = useQuery(api.users.searchUsers, { query: searchQuery });

  // Callbacks
  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
    if (!query) {
      setSearchResults([]);
    }
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  // Effects
  useEffect(() => {
    if (searchedUsers) {
      setSearchResults(searchedUsers);
    }
  }, [searchedUsers]);

  // Scroll to the post if initialPostId is provided
  useEffect(() => {
    if (initialPostId && posts && flatListRef.current) {
      const index = posts.findIndex(post => post._id === initialPostId);
      if (index !== -1) {
        setTimeout(() => {
          flatListRef.current?.scrollToIndex({ index, animated: true });
        }, 300);
      }
    }
  }, [initialPostId, posts]);

  // Loading states
  if (!posts) return <Loader />;
  if (posts.length === 0) return <NoPostsFound />;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => signOut()}>
          <Ionicons name="exit-outline" size={24} color={COLORS.white} style={{ transform: [{ rotate: '180deg' }] }} />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Twinsta</Text>

        <TouchableOpacity onPress={() => setShowSearchBar(true)}>
          <Ionicons name="search" size={24} color={COLORS.white} style={styles.searchIcon} />
        </TouchableOpacity>

        <View style={styles.iconSpacing} />

        <TouchableOpacity onPress={() => router.push("/messages")}>
          <Ionicons name="chatbubble-ellipses-outline" size={24} color={COLORS.white} />
        </TouchableOpacity>
      </View>

      {showSearchBar && (
        <>
          <SearchBar onClose={() => setShowSearchBar(false)} onSearch={handleSearch} />
          <SearchResults searchResults={searchResults} />
        </>
      )}

      <FlatList
        ref={flatListRef}
        data={posts}
        renderItem={({ item }) => <Post post={item} />}
        keyExtractor={(item) => item._id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 60 }}
        ListHeaderComponent={<StoriesSection />}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={COLORS.primary}
          />
        }
      />
    </View>
  );
}

const NoPostsFound = () => (
  <View
    style={{
      flex: 1,
      backgroundColor: COLORS.background,
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <Text style={{ fontSize: 20, color: COLORS.primary }}>No posts yet</Text>
  </View>
);