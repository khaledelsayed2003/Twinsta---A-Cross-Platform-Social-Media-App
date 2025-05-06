import { useState } from "react";
import { View, TextInput, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "@/constants/theme";

interface SearchBarProps {
  onClose: () => void;
  onSearch: (query: string) => void; 
}

const SearchBar = ({ onClose, onSearch }: SearchBarProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (text: string) => {
    setSearchQuery(text); 
    onSearch(text); 
  };

  return (
    <View
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        padding: 10,
        backgroundColor: COLORS.background,
        flexDirection: "row",
        alignItems: "center",
        borderBottomWidth: 1,
        borderBottomColor: COLORS.surface,
        zIndex: 1000,
      }}
    >
      <TextInput
        placeholder="Search users..."
        placeholderTextColor={COLORS.white}
        value={searchQuery}
        onChangeText={(text) => handleSearch(text)} 
        style={{
          flex: 1,
          backgroundColor: COLORS.surface,
          borderRadius: 8,
          padding: 8,
          color: COLORS.primary,
          marginRight: 10,
          height: 40,
        }}
        autoFocus
      />

      <TouchableOpacity onPress={onClose}>
        <Ionicons name="close" size={24} color={COLORS.white} />
      </TouchableOpacity>
    </View>
  );
};

export default SearchBar;