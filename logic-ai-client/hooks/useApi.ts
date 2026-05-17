import { useToast } from "@/app/context/ToastContext";
import { useState, useCallback } from "react";

// Define the base interface for what the hook returns to your screens
interface ApiResponse<T = any> {
  success: boolean;
  data: T | null;
}

// Configuration options type definition for fetch requests
interface RequestOptions {
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  headers?: Record<string, string>;
  body?: Record<string, any>;
  service?: "auth" | "eval";
}

// Using a fallback local IP ensures your networking layer continues working if your Expo cache clears out
const API_AUTH_URL = process.env.EXPO_PUBLIC_AUTH_URL;
const API_EVAL_URL = process.env.EXPO_PUBLIC_EVAL_URL;
console.log(API_AUTH_URL, "API_BASE_URL connected");

export const useApi = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  
  // 1. Initialize your custom global toast trigger
  const { showToast } = useToast();

  const request = useCallback(
    async <T = any>(
      endpoint: string,
      options: RequestOptions = {},
    ): Promise<ApiResponse<T>> => {
      setLoading(true);
      setError(null);

      const baseUrl = options.service === "eval" ? API_EVAL_URL : API_AUTH_URL;
      const url = `${baseUrl}${endpoint}`;

      const defaultHeaders: Record<string, string> = {
        "Content-Type": "application/json",
      };

      const config: RequestInit = {
        method: options.method || "GET",
        headers: {
          ...defaultHeaders,
          ...options.headers,
        },
      };

      if (options.body) {
        config.body = JSON.stringify(options.body);
      }

      try {
        console.log(`[API Request] sending to: ${url}`);
        const response = await fetch(url, config);
        const data = await response.json();

        if (response.ok) {
          setLoading(false);
          return { success: true, data: data as T };
        } else {
          setLoading(false);
          const errorMessage = data.detail || "An unexpected response was returned.";
          setError(errorMessage);

          // 2. Swapped system Alert with your custom stacking error toast
          showToast(errorMessage, "error");
          return { success: false, data: null };
        }
      } catch (err) {
        setLoading(false);
        const networkError = "Could not connect to the LOGIC.ai backend. Check your local network or VPN.";
        setError(networkError);

        console.error("[API Network Error]:", err);
        
        // 3. Swapped system Alert with your custom stacking network error toast
        showToast(networkError, "error");
        return { success: false, data: null };
      }
    },
    [showToast], // Added dependency tracking constraint to avoid stale references
  );

  return { request, loading, error };
};