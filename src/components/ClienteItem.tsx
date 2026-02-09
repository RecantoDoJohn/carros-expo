import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { COLORS } from "../theme/colors";

export default function ClienteItem({ item, onEditar, onExcluir }) {
  return (
    <View style={styles.card}>
      
      {/* INFORMAÇÕES */}
      <View style={styles.info}>
        <Text style={styles.nome}>{item.nome}</Text>

        <Text style={styles.text}>
          ID: {item.id}
        </Text>
      </View>

      {/* BOTÕES EM LINHA */}
      <View style={styles.actionsRow}>
        <View style={styles.btn}>
          <Button
            title="Editar"
            color={COLORS.primary}
            onPress={() => onEditar(item)}
          />
        </View>


        <View style={styles.btn}>
          <Button
            title="X"
            color={COLORS.danger}
            onPress={() => onExcluir(item.id)}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.card,
    borderRadius: 10,
    padding: 15,
    marginBottom: 12,
    elevation: 3,
    borderLeftWidth: 6,
    borderLeftColor: COLORS.primary,
  },

  info: {
    marginBottom: 12,
  },

  nome: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.primaryDark,
    marginBottom: 4,
  },

  text: {
    color: COLORS.text,
  },

  actionsRow: {
    flexDirection: "row",
    gap: 8,
  },

  btn: {
    flex: 1,
  },
});
