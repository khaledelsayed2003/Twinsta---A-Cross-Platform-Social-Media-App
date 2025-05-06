import { View, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { styles } from '@/styles/auth.styles';
import { COLORS } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { useSSO } from '@clerk/clerk-expo';
import { useRouter } from 'expo-router';



export default function login() {

  const { startSSOFlow } = useSSO();
  const router = useRouter();


  const handleGoogleSignIn = async () => {
    try {
      const { createdSessionId, setActive } = await startSSOFlow({ strategy: "oauth_google" });
      if (setActive && createdSessionId) {
        setActive({ session: createdSessionId });
        router.replace("/(tabs)");
      }
    } catch (error) {
      console.error("OAuth error:", error);
    }
  };



  return (
    <View style={styles.container}>
        {/* Header SECTION */}
      <View style={styles.brandSection}>
        <View style={styles.logoContainer}>
          {/* <Ionicons name="logo-Twinsta-App" size={32} color={COLORS.primary which is red} /> */}
          <Image
            source={require('@/assets/images/logo.png')}
            style={styles.circularImage}
          />
        </View>
        <Text style={styles.appName}>Twinsta</Text>
        <Text style={styles.tagline}>Be the first to share 📸</Text>
      </View>

        {/* Theme SECTION */}
      <View style={styles.illustrationContainer}>
        <Image source={require('@/assets/images/auth-theme.png')} style={styles.illustration} resizeMode='cover' />
      </View>

        {/* LOGIN SECTION */}
      <View style={styles.loginSection}>
        <TouchableOpacity
          style={styles.googleButton}
          onPress={handleGoogleSignIn}
          activeOpacity={0.9}
        >
          <View style={styles.googleIconContainer}>
            <Ionicons name="logo-google" size={20} color={COLORS.surface} />
          </View>
          <Text style={styles.googleButtonText}>Continue with Google</Text>
        </TouchableOpacity>

        <Text style={styles.termsText}>
          By continuing, you agree to our Terms and Privacy Policy
        </Text>
      </View>


    </View>
  );
}