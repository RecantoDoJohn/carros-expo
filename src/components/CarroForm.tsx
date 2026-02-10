import React from "react";
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Image } from "react-native";
import { COLORS } from "../theme/colors";

export default function CarroForm({
  marca, setMarca,
  modelo, setModelo,
  ano, setAno,
  preco, setPreco,
  imagemUri,
  onPickImage,
  onSalvar,
}) {
  return (
    <View style={styles.form}>
      <TextInput placeholder="Marca" value={marca} onChangeText={setMarca} style={styles.input} />
      <TextInput placeholder="Modelo" value={modelo} onChangeText={setModelo} style={styles.input} />
      <TextInput placeholder="Ano" value={ano} onChangeText={setAno} keyboardType="numeric" style={styles.input} />
      <TextInput placeholder="Preço" value={preco} onChangeText={setPreco} keyboardType="numeric" style={styles.input} />

      <TouchableOpacity onPress={onPickImage} style={styles.imageBtn}>
        <Text style={styles.imageBtnText}>📷 {imagemUri ? "Trocar imagem" : "Adicionar imagem"}</Text>
      </TouchableOpacity>

      {imagemUri ? (
        <Image source={{ uri: imagemUri }} style={styles.preview} resizeMode="cover" />
      ) : null}

      <Button title="SALVAR CARRO" color={COLORS.primary} onPress={onSalvar} />
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
    padding: 12,
    marginBottom: 10,
    borderRadius: 8,
  },

  imageBtn: {
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: COLORS.primary,
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 12,
    backgroundColor: COLORS.primaryLight,
  },
  imageBtnText: {
    color: COLORS.primaryDark,
    fontWeight: "bold",
    fontSize: 16,
  },

  preview: {
    width: "100%",
    height: 160,
    borderRadius: 10,
    marginBottom: 12,
  },
});
