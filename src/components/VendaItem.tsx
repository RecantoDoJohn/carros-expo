import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { COLORS } from "../theme/colors";

export default function VendaItem({ item, onEditar, onExcluir }) {
  return (
    <View style={styles.card}>
      <View style={{ flex: 1, paddingRight: 10 }}>
        <Text style={styles.nome}>Venda #{item.id}</Text>
        <Text style={styles.text}>Carro: {item.marca_carro} {item.modelo_carro} ({item.ano_carro})</Text>
        <Text style={styles.text}>Carro: {item.cliente_nome}</Text>
        <Text style={styles.text}>Preço do carro: R$ {Number(item.preco_carro).toFixed(2)}</Text>
        <Text style={styles.text}>Data: {item.data}</Text>
        <Text style={styles.text}>Descrição: {item.descricao}</Text>
      </View>

      <View style={styles.actions}>
        <Button title="Editar" color={COLORS.primary} onPress={() => onEditar(item)} />
        <View style={{ height: 8 }} />
        <Button title="X" color={COLORS.danger} onPress={() => onExcluir(item.id)} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: COLORS.card, borderRadius: 10, padding: 15, marginBottom: 12, elevation: 3 },
  nome: { fontSize: 16, fontWeight: "bold", marginBottom: 6, color: COLORS.primaryDark },
  text: { color: COLORS.text, marginBottom: 2 },
  actions: { width: 110, justifyContent: "flex-start" },
});
