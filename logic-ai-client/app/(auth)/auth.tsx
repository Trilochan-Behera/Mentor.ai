import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import * as LocalAuthentication from 'expo-local-authentication';

export default function LoginScreen() {
  const router = useRouter();

  // Input States
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isNewUser, setIsNewUser] = useState(false); // Toggle for Signup vs Login
  const [showPassword, setShowPassword] = useState(false);
  
  // Biometric State
  const [isBiometricAvailable, setIsBiometricAvailable] = useState(false);

  useEffect(() => {
    checkBiometrics();
  }, []);

  const checkBiometrics = async () => {
    const hasHardware = await LocalAuthentication.hasHardwareAsync();
    const isEnrolled = await LocalAuthentication.isEnrolledAsync();
    // In a real app, also check if we have a stored token for this user
    setIsBiometricAvailable(hasHardware && isEnrolled);
  };

  // --- API Placeholder Functions ---

  const onPrimaryAction = async () => {
    if (isNewUser) {
      // API CALL: /auth/signup (Sends Email OTP)
      // On Success: router.push("/otp-verify");
      console.log("Registering and sending OTP...");
      router.push({ pathname: "/otp-verify", params: { email } });
    } else {
      // API CALL: /auth/login (Standard Password Check)
      // On Success: router.replace("/home");
      console.log("Standard Password Login");
      router.replace("/home");
    }
  };

  const onBiometricAuth = async () => {
    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: 'Login to Sovereign Hub',
      disableDeviceFallback: false,
    });

    if (result.success) {
      // API CALL: /auth/token-login (Using stored SecureStore token)
      router.replace("/home");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.inner}>
        
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>{isNewUser ? "Join the Hub" : "Welcome Back"}</Text>
          <Text style={styles.subtitle}>
            {isNewUser ? "Create your profile to start preparation" : "Sign in to continue your progress"}
          </Text>
        </View>

        <View style={styles.form}>
          {/* Email Field */}
          <View style={styles.inputContainer}>
            <Ionicons name="mail-outline" size={20} color="#666" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Email Address"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          {/* Password Field */}
          <View style={[styles.inputContainer, { marginTop: 15 }]}>
            <Ionicons name="lock-closed-outline" size={20} color="#666" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Ionicons name={showPassword ? "eye-off-outline" : "eye-outline"} size={20} color="#666" />
            </TouchableOpacity>
          </View>

          {/* Primary Submit Button */}
          <TouchableOpacity 
            style={styles.primaryButton} 
            onPress={onPrimaryAction}
          >
            <Text style={styles.buttonText}>
              {isNewUser ? "Create Profile" : "Sign In"}
            </Text>
            <Ionicons name="arrow-forward" size={20} color="#FFF" />
          </TouchableOpacity>

          {/* Biometric Shortcut */}
          {!isNewUser && isBiometricAvailable && (
            <TouchableOpacity style={styles.biometricBtn} onPress={onBiometricAuth}>
              <Ionicons name="finger-print-outline" size={40} color="#1A237E" />
              <Text style={styles.biometricText}>Quick Sign-in</Text>
            </TouchableOpacity>
          )}

          {/* Toggle Signup/Login */}
          <TouchableOpacity 
            onPress={() => setIsNewUser(!isNewUser)} 
            style={styles.switchBtn}
          >
            <Text style={styles.resendText}>
              {isNewUser ? "Already have an account? " : "New Aspirant? "}
              <Text style={styles.link}>{isNewUser ? "Sign In" : "Register Now"}</Text>
            </Text>
          </TouchableOpacity>
        </View>

      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFF" },
  inner: { flex: 1, padding: 30, justifyContent: "center" },
  header: { marginBottom: 40 },
  title: { fontSize: 32, fontWeight: "900", color: "#1A237E" },
  subtitle: { fontSize: 16, color: "#666", marginTop: 10 },
  form: { width: "100%" },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F8F9FE",
    borderRadius: 15,
    paddingHorizontal: 15,
    height: 60,
    borderWidth: 1,
    borderColor: "#E8EAF6",
  },
  icon: { marginRight: 10 },
  input: { flex: 1, fontSize: 16, color: "#1A237E", fontWeight: "600" },
  primaryButton: {
    backgroundColor: "#1A237E",
    borderRadius: 16,
    paddingVertical: 18,
    marginTop: 25,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    elevation: 4,
    shadowColor: "#1A237E",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  buttonText: { color: "#FFFFFF", fontSize: 16, fontWeight: "900", marginRight: 10 },
  biometricBtn: {
    marginTop: 30,
    alignItems: "center",
    alignSelf: "center",
  },
  biometricText: {
    color: "#1A237E",
    fontSize: 12,
    fontWeight: "700",
    marginTop: 5,
  },
  switchBtn: { marginTop: 25, alignSelf: "center" },
  resendText: { color: "#666", fontSize: 14 },
  link: { color: "#1A237E", fontWeight: "800" },
});