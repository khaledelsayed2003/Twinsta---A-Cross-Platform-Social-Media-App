import React, { useState, useEffect } from "react";
import { Modal, View, Text, TouchableOpacity, FlatList, StyleSheet } from "react-native";
import SearchBar from "./SearchBar";
import SearchResults from "./SearchResults";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { COLORS } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";


type User = {
  _id: string;
  username: string;
  imageUrl?: string;
};

type SharePostModalProps = {
  visible: boolean;
  onClose: () => void;
  onShare: (selectedUsers: User[]) => void;
};

const SharePostModal = ({ visible, onClose, onShare }: SharePostModalProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
  const searchResults = useQuery(api.users.searchUsers, { query: searchQuery });

  useEffect(() => {
    if (!visible) {
      setSearchQuery("");
      setSelectedUsers([]);
    }
  }, [visible]);

  const handleSelectUser = (user: User) => {
    if (selectedUsers.some(u => u._id === user._id)) {
      setSelectedUsers(selectedUsers.filter(u => u._id !== user._id));
    } else {
      setSelectedUsers([...selectedUsers, user]);
    }
  };

  const handleShare = () => {
    onShare(selectedUsers);
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.modalContent}>
          <View style={styles.header}>
            <Text style={styles.title}>Share Post</Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={24} color={COLORS.white} />
            </TouchableOpacity>
          </View>
          <SearchBar onClose={onClose} onSearch={setSearchQuery} />
          <FlatList
            data={searchResults || []}
            keyExtractor={item => item._id}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[
                  styles.userItem,
                  selectedUsers.some(u => u._id === item._id) && styles.selectedUserItem,
                ]}
                onPress={() => handleSelectUser(item)}
              >
                <Image
                  source={item.imageUrl || "https://ui-avatars.com/api/?name=" + encodeURIComponent(item.username)}
                  style={styles.avatar}
                  contentFit="cover"
                />
                <Text style={styles.username}>{item.username}</Text>
                {selectedUsers.some(u => u._id === item._id) && (
                  <Ionicons name="checkmark-circle" size={20} color={COLORS.primary} />
                )}
              </TouchableOpacity>
            )}
            ListEmptyComponent={
              searchQuery ? (
                <Text style={styles.noResults}>No users found</Text>
              ) : null
            }
            style={{ maxHeight: 200 }}
          />
          <TouchableOpacity
            style={[
              styles.shareButton,
              selectedUsers.length === 0 && styles.shareButtonDisabled,
            ]}
            onPress={handleShare}
            disabled={selectedUsers.length === 0}
          >
            <Text style={styles.shareButtonText}>Share</Text>
          </TouchableOpacity>
          
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(24,24,36,0.95)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "90%",
    backgroundColor: COLORS.background,
    borderRadius: 16,
    padding: 16,
    alignItems: "stretch",
    elevation: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  title: {
    color: COLORS.white,
    fontSize: 20,
    fontWeight: "bold",
  },
  userItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: COLORS.grey,
    justifyContent: "space-between",
  },
  selectedUserItem: {
    backgroundColor: COLORS.surface,
  },
  username: {
    color: COLORS.white,
    fontSize: 16,
  },
  noResults: {
    color: COLORS.primary,
    textAlign: "center",
    padding: 16,
  },
  shareButton: {
    backgroundColor: COLORS.primary,
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 16,
  },
  shareButtonDisabled: {
    backgroundColor: COLORS.grey,
  },
  shareButtonText: {
    color: COLORS.white,
    fontWeight: "bold",
    fontSize: 16,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 12,
  },
});

export default SharePostModal;