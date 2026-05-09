import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import * as LocalAuthentication from 'expo-local-authentication';
import * as SecureStore from 'expo-secure-store';

export default function OtpVerifyScreen() {
  const router = useRouter();
  const { email } = useLocalSearchParams(); // Get email passed from Login screen
  
  const [otp, setOtp] = useState(["", "", "", "", "", ""]); // 6-digit for better security
  const [timer, setTimer] = useState(60);
  const otpRefs = useRef<Array<TextInput | null>>([]);

  useEffect(() => {
    let interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleOtpInput = (text: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    if (text !== "" && index < 5) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleBackspace = (index: number) => {
    if (otp[index] === "" && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  // --- Handshake Logic ---

  const onVerify = async () => {
    const fullOtp = otp.join("");
    router.replace("/onboarding")
    
    // API CALL: /auth/verify-otp {email, otp}
    // Assume success and receiving a JWT token
    const mockToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...";

    Alert.alert(
      "Verified Successfully!",
      "Would you like to enable FaceID/TouchID for faster login next time?",
      [
        {
          text: "Later",
          onPress: () => router.replace("/onboarding"), // Move to initial 10 questions
        },
        {
          text: "Enable Now",
          onPress: async () => {
            const auth = await LocalAuthentication.authenticateAsync({
              promptMessage: 'Enable Sovereign Access',
            });
            if (auth.success) {
              await SecureStore.setItemAsync('user_session', mockToken);
              router.replace("/onboarding");
            }
          }
        }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inner}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color="#1A237E" />
        </TouchableOpacity>

        <View style={styles.header}>
          <Text style={styles.title}>Confirm Email</Text>
          <Text style={styles.subtitle}>
            Enter the 6-digit code sent to{"\n"}
            <Text style={styles.emailHighlight}>{email}</Text>
          </Text>
        </View>

        <View style={styles.otpContainer}>
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              ref={(ref) => (otpRefs.current[index] = ref)}
              style={styles.otpBox}
              value={digit}
              onChangeText={(text) => handleOtpInput(text, index)}
              onKeyPress={({ nativeEvent }) => {
                if (nativeEvent.key === "Backspace") handleBackspace(index);
              }}
              keyboardType="number-pad"
              maxLength={1}
              selectTextOnFocus
            />
          ))}
        </View>

        <TouchableOpacity 
          style={[styles.primaryButton, otp.join("").length < 6 && styles.disabled]} 
          onPress={onVerify}
          disabled={otp.join("").length < 6}
        >
          <Text style={styles.buttonText}>Verify & Continue</Text>
        </TouchableOpacity>

        <View style={styles.footer}>
          {timer > 0 ? (
            <Text style={styles.resendText}>Resend code in <Text style={styles.timer}>{timer}s</Text></Text>
          ) : (
            <TouchableOpacity onPress={() => setTimer(60)}>
              <Text style={styles.link}>Resend OTP</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFF" },
  inner: { flex: 1, padding: 30 },
  backBtn: { marginBottom: 30 },
  header: { marginBottom: 40 },
  title: { fontSize: 32, fontWeight: "900", color: "#1A237E" },
  subtitle: { fontSize: 16, color: "#666", marginTop: 10, lineHeight: 24 },
  emailHighlight: { color: "#1A237E", fontWeight: "700" },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 40,
  },
  otpBox: {
    width: "14%",
    height: 60,
    backgroundColor: "#F8F9FE",
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#E8EAF6",
    textAlign: "center",
    fontSize: 22,
    fontWeight: "900",
    color: "#1A237E",
  },
  primaryButton: {
    backgroundColor: "#1A237E",
    borderRadius: 16,
    paddingVertical: 18,
    alignItems: "center",
    elevation: 4,
    shadowColor: "#1A237E",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  disabled: { backgroundColor: "#CBD5E1", shadowOpacity: 0 },
  buttonText: { color: "#FFFFFF", fontSize: 16, fontWeight: "900" },
  footer: { marginTop: 30, alignItems: "center" },
  resendText: { color: "#666", fontSize: 14 },
  timer: { color: "#1A237E", fontWeight: "700" },
  link: { color: "#1A237E", fontWeight: "800", textDecorationLine: "underline" },
});