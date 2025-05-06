import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import { useRouter } from 'expo-router';
import { Image } from 'expo-image';
import { COLORS } from '@/constants/theme';
import { Loader } from './Loader';

type ConversationListItemProps = {
  userId: Id<'users'>;
};

export default function ConversationListItem({ userId }: ConversationListItemProps) {
  const router = useRouter();
  const userProfile = useQuery(api.users.getUserProfile, { id: userId });

  if (!userProfile) {
    return (
      <View style={styles.loadingItem}>
        <Loader />
      </View>
    );
  }

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => router.push(`/messages/${userId}`)}
    >
      <Image
        source={userProfile.image}
        style={styles.avatar}
        contentFit="cover"
        cachePolicy="memory-disk"
      />
      <Text style={styles.username}>{userProfile.username}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.surface,
    backgroundColor: COLORS.background,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 16,
  },
  username: {
    color: COLORS.white,
    fontSize: 16,
  },
  loadingItem: {
    padding: 16,
    height: 83,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.surface,
    backgroundColor: COLORS.background,
  }
});