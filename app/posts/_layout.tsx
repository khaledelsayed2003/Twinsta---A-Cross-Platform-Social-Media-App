import { Stack } from "expo-router";

export default function PostsLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* Define the post details route */}
      <Stack.Screen name="[postId]" options={{ headerShown: false }} />
    </Stack>
  );
}
