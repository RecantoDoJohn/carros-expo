import React from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";
import { COLORS } from "../theme/colors";


export default function VendaForm({
  carroId,
  setCarroId,
  dataVenda,
  setDataVenda,
  descricao,
  setDescricao,
  onSalvar,
}) {
  return (
    <View style={styles.form}>
      <TextInput
        placeholder="ID do Carro"
        value={carroId}
        onChangeText={setCarroId}
        keyboardType="numeric"
        style={styles.input}
      />

      <TextInput
        placeholder="Data (DD/MM/AAAA)"
        value={dataVenda}
        onChangeText={setDataVenda}
        style={styles.input}
      />

      <TextInput
        placeholder="Descrição da venda"
        value={descricao}
        onChangeText={setDescricao}
        style={styles.input}
      />

      <Button title="Salvar Venda" color={COLORS.primary} onPress={onSalvar} />
    </View>
  );
}

const styles = StyleSheet.create({
  form: { backgroundColor: "#fff", padding: 15, borderRadius: 10, elevation: 3 },
  input: { borderWidth: 1, borderColor: "#ddd", padding: 10, marginBottom: 10, borderRadius: 5 },
});
