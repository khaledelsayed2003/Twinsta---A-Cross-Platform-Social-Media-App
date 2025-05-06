

////This file is for the messages coming soon screen. It is a simple screen that says "Coming Soon!" and a link to the feed. It is used as a placeholder for the messaging feature. But since i have applied this feauture, i will be deleting this file soon. But i will leave it here for now.







// import { View, Text, StyleSheet } from "react-native";
// import { COLORS } from "@/constants/theme";
// import { Link } from "expo-router";
// import { Ionicons } from "@expo/vector-icons";

// export default function ComingSoon() {
//   return (
//     <View style={styles.container}>
//       <Ionicons name="chatbubble-ellipses-outline" size={64} color={COLORS.primary} />
//       <Text style={styles.title}>Coming Soon!</Text>
//       <Text style={styles.text}>We're working on the messaging feature</Text>
//       <Text style={styles.text}>It will be available soon!</Text>
      
//       <Link href="/(tabs)" style={styles.backLink}>
//         <Ionicons name="arrow-back" size={20} color={COLORS.primary} />
//         <Text style={styles.backText}>Back to Feed</Text>
//       </Link>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     padding: 20,
//     backgroundColor: COLORS.background,
//     gap: 16,
//   },
//   title: {
//     fontSize: 28,
//     fontWeight: "bold",
//     color: COLORS.white,
//   },
//   text: {
//     fontSize: 16,
//     color: COLORS.grey,
//     textAlign: "center",
//   },
//   backLink: {
//     marginTop: 32,
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 8,
//   },
//   backText: {
//     color: COLORS.primary,
//     fontSize: 16,
//   },
// });