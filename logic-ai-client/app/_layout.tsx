import { Stack } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ToastContainer } from '../components/ToastContainer'; // Adjust this relative path
import { ToastProvider } from './context/ToastContext';

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      {/* 1. Wrap your entire layout inside the state provider */}
      <ToastProvider>
        
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(auth)" />
        </Stack>

        {/* 2. Place the rendering layer at the absolute bottom of the stack */}
        <ToastContainer />
        
      </ToastProvider>
    </SafeAreaProvider>
  );
}