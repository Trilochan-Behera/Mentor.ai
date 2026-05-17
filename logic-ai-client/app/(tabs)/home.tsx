import React, { useState, useEffect } from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import { useApi } from "@/hooks/useApi";
import HomeView from "@/components/Home/HomeView";

export default function HomeTabRoot() {
  const { request } = useApi();
  const [uiSchema, setUiSchema] = useState<any>(null);
  const [pageLoading, setPageLoading] = useState(true);

  useEffect(() => {
    fetchServerDrivenLayout();
  }, []);

  const fetchServerDrivenLayout = async () => {
    const userEmail = "trilochanbeherak@gmail.com"; 
    
    setPageLoading(true);
    const res = await request<any>(`/evaluation/dashboard?email=${userEmail}`, {
      method: "GET",
      service: "eval", 
    });

    if (res.success && res.data?.ui_configuration) {
      setUiSchema(res.data.ui_configuration);
    }
    setPageLoading(false);
  };

  if (pageLoading) {
    return (
      <View style={styles.loadingWrapper}>
        <ActivityIndicator size="large" color="#1A237E" />
      </View>
    );
  }

  return uiSchema ? <HomeView uiConfig={uiSchema} /> : null;
}

const styles = StyleSheet.create({
  loadingWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F8F9FE",
  },
});