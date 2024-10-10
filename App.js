import React from "react";
import { StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Todos from "./components/Todos";

export default function App() {
  return (
    <SafeAreaView>
      <Text style={styles.header}>Todo demotus</Text>
      <Todos />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    fontSize: 24,
    fontWeight: "thin",
    padding: 12,
  },
});
