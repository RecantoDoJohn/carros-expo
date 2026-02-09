import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

export default function VendaItem({ item, onEditar, onExcluir }) {
  return (
    <View style={styles.item}>
      <View>
        <Text style={styles.nome}>Venda #{item.id}</Text>
        <Text>
          Carro: {item.marca_carro} {item.modelo_carro} ({item.ano_carro})
        </Text>
        <Text>Preço do carro: R$ {Number(item.preco_carro).toFixed(2)}</Text>
        <Text>Data: {item.data}</Text>
        <Text>Descrição: {item.descricao}</Text>
      </View>

      <View style={styles.btnRow}>
        <Button title="Editar" onPress={() => onEditar(item)} />
        <Button title="X" color="red" onPress={() => onExcluir(item.id)} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#fff",
    marginBottom: 10,
    borderRadius: 8,
    elevation: 2,
  },
  nome: { fontWeight: "bold", fontSize: 16 },
  btnRow: { flexDirection: "row", gap: 10 },
});
