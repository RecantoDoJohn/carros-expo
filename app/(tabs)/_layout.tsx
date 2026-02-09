import { Tabs } from "expo-router";
import { COLORS } from "../../src/theme/colors";
import { Image } from "react-native";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerStyle: { backgroundColor: "#000" },
        headerTintColor: COLORS.textLight,
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: "#999",

        headerTitle: () => (
          <Image
            source={require("../../assets/dj-alma.png")}
            style={{ width: 170, height: 140 }}
            resizeMode="contain"
          />
        ),

        headerTitleContainerStyle: {
          paddingLeft: 0,
          marginLeft: 0,
        },
      }}
    >
      <Tabs.Screen name="carros" options={{ title: "Carros" }} />
      <Tabs.Screen name="clientes" options={{ title: "Clientes" }} />
      <Tabs.Screen name="vendas" options={{ title: "Vendas" }} />

    </Tabs>
  );
}
