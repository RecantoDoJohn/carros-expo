import React from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";
import { COLORS } from "../theme/colors";

export default function ClienteForm({ nome, setNome, onSalvar }) {
  return (
    <View style={styles.form}>
      <TextInput
        placeholder="Nome do Cliente"
        value={nome}
        onChangeText={setNome}
        style={styles.input}
      />

      <Button title="Salvar Cliente" color={COLORS.primary} onPress={onSalvar} />
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    backgroundColor: COLORS.card,
    padding: 15,
    borderRadius: 10,
    elevation: 3,
  },

  input: {
    borderWidth: 1,
    borderColor: COLORS.primary,
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
});
