import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import * as LocalAuthentication from "expo-local-authentication";
import * as SecureStore from "expo-secure-store";
import { useApi } from "@/hooks/useApi";
import { useToast } from "../context/ToastContext";

// Response schemas matching your backend Pydantic models
interface VerifyResponse {
  status: string;
  message: string;
  user_id: string;
  access_token?: string;
}

interface ResendResponse {
  status: string;
  message: string;
}

export default function OtpVerifyScreen() {
  const router = useRouter();
  const { email } = useLocalSearchParams<{ email: string }>(); // Explicit type mapping for route params

  // Initialize our unified API hook
  const { request, loading } = useApi();
  const { showToast } = useToast();

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
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

    // Dynamic focus shifting forward
    if (text !== "" && index < 5) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleBackspace = (index: number) => {
    if (otp[index] === "" && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  // ==========================================
  // Hook API Call: /auth/verify
  // ==========================================
  const onVerify = async () => {
    const fullOtp = otp.join("");

    if (fullOtp.length !== 6) {
      showToast("Please enter the full 6-digit verification code.", "error");
      return;
    }

    const res = await request<VerifyResponse>("/auth/verify", {
      method: "POST",
      body: {
        email: email,
        otp: fullOtp,
      },
    });

    if (res.success && res.data) {
      // Safely read out the payload access token
      const realToken =
        res.data.access_token || "fallback_token_if_not_returned";

      showToast("Verified Successfully!", "success");

      // Trigger the Biometric Handshake
      Alert.alert(
        "Verified Successfully!",
        "Would you like to enable FaceID/TouchID for faster login next time?",
        [
          {
            text: "Later",
            onPress: async () => {
              await SecureStore.setItemAsync("user_session", realToken);
              router.replace("/onboarding");
            },
          },
          {
            text: "Enable Now",
            onPress: async () => {
              try {
                const hasHardware =
                  await LocalAuthentication.hasHardwareAsync();
                const isEnrolled = await LocalAuthentication.isEnrolledAsync();

                if (hasHardware && isEnrolled) {
                  const auth = await LocalAuthentication.authenticateAsync({
                    promptMessage: "Enable Sovereign Access",
                    fallbackLabel: "Use Passcode",
                  });

                  if (auth.success) {
                    await SecureStore.setItemAsync("user_session", realToken);
                    showToast("Biometrics enabled securely.", "success");
                  } else {
                    await SecureStore.setItemAsync("user_session", realToken);
                  }
                } else {
                  await SecureStore.setItemAsync("user_session", realToken);
                  showToast(
                    "Biometrics not configured on this device.",
                    "info",
                  );
                }
              } catch (bioError) {
                console.error("Biometric Setup Error:", bioError);
                await SecureStore.setItemAsync("user_session", realToken);
              } finally {
                router.replace("/onboarding");
              }
            },
          },
        ],
      );
    }
  };

  // ==========================================
  // Hook API Call: /auth/resend-otp
  // ==========================================
  const onResendOtp = async () => {
    if (timer > 0) return; // Prevention constraint check

    const res = await request<ResendResponse>("/auth/resend-otp", {
      method: "POST",
      body: { email: email },
    });

    if (res.success && res.data) {
      showToast(res.data.message || "A fresh code has been issued.",'success')
      setTimer(60); // Reset countdown clock loop
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inner}>
        <TouchableOpacity
          onPress={() => !loading && router.back()}
          style={styles.backBtn}
          disabled={loading}
        >
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
              editable={!loading} // Lock array inputs during active operations
            />
          ))}
        </View>

        <TouchableOpacity
          style={[
            styles.primaryButton,
            (otp.join("").length < 6 || loading) && styles.disabled,
          ]}
          onPress={onVerify}
          disabled={otp.join("").length < 6 || loading}
        >
          {loading ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text style={styles.buttonText}>Verify & Continue</Text>
          )}
        </TouchableOpacity>

        <View style={styles.footer}>
          {timer > 0 ? (
            <Text style={styles.resendText}>
              Resend code in <Text style={styles.timer}>{timer}s</Text>
            </Text>
          ) : (
            <TouchableOpacity onPress={onResendOtp} disabled={loading}>
              <Text style={[styles.link, loading && styles.disabledLink]}>
                Resend OTP
              </Text>
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
    height: 56, // Fixed structural height container for crisp activity centering
    justifyContent: "center",
  },
  disabled: { backgroundColor: "#CBD5E1", shadowOpacity: 0 },
  buttonText: { color: "#FFFFFF", fontSize: 16, fontWeight: "900" },
  footer: { marginTop: 30, alignItems: "center" },
  resendText: { color: "#666", fontSize: 14 },
  timer: { color: "#1A237E", fontWeight: "700" },
  link: {
    color: "#1A237E",
    fontWeight: "800",
    textDecorationLine: "underline",
  },
  disabledLink: { color: "#CBD5E1" },
});
