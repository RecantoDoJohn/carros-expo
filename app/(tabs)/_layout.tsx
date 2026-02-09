import { Tabs } from "expo-router";
import { COLORS } from "../../src/theme/colors";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerStyle: { backgroundColor: COLORS.primary },
        headerTintColor: COLORS.textLight,
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: "#999",
      }}
    >
      <Tabs.Screen name="carros" options={{ title: "Carros" }} />
      <Tabs.Screen name="vendas" options={{ title: "Vendas" }} />
    </Tabs>
  );
}
