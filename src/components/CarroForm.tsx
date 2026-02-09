import React from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";
import { COLORS } from "../theme/colors";


export default function CarroForm({
  marca,
  setMarca,
  modelo,
  setModelo,
  ano,
  setAno,
  preco,
  setPreco,
  onSalvar,
}) {
  return (
    <View style={styles.form}>
      <TextInput placeholder="Marca" value={marca} onChangeText={setMarca} style={styles.input} />
      <TextInput placeholder="Modelo" value={modelo} onChangeText={setModelo} style={styles.input} />
      <TextInput placeholder="Ano" value={ano} onChangeText={setAno} keyboardType="numeric" style={styles.input} />
      <TextInput placeholder="Preço" value={preco} onChangeText={setPreco} keyboardType="numeric" style={styles.input} />
      <Button title="Salvar Carro" color={COLORS.primary} onPress={onSalvar} />

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