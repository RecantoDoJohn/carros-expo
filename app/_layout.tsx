import { Stack } from "expo-router";
import { useEffect } from "react";
import { initDB } from "../src/database";

export default function RootLayout() {
  useEffect(() => {
    const setup = async () => {
      await initDB();
    };

    setup();
  }, []);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
}
