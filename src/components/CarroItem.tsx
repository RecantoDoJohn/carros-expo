import React from "react";
import { View, Text, Button, StyleSheet, Image } from "react-native";
import { COLORS } from "../theme/colors";

export default function CarroItem({ item, onEditar, onExcluir, onToggleVendido }) {
  return (
    <View style={styles.card}>
      {/* área da imagem (sempre reserva espaço) */}
      <View style={styles.imageContainer}>
        {item.imagemUri ? (
          <Image source={{ uri: item.imagemUri }} style={styles.image} resizeMode="cover" />
        ) : (
          <Text style={styles.imagePlaceholder}>Sem imagem</Text>
        )}

        {item.vendido ? (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>VENDIDO</Text>
          </View>
        ) : null}
      </View>

      <View style={styles.info}>
        <Text style={styles.nome} numberOfLines={1}>
          {item.marca} {item.modelo}
        </Text>

        <Text style={styles.text} numberOfLines={1}>
          ID: {item.id} | Ano: {item.ano} | Preço: R$ {Number(item.preco).toFixed(2)}
        </Text>

        <Text style={styles.text}>
          Status: {item.vendido ? "Vendido ✅" : "Disponível"}
        </Text>
      </View>

      {/* botões em linha */}
      <View style={styles.actionsRow}>
        <View style={styles.btn}>
          <Button title="Editar" color={COLORS.primary} onPress={() => onEditar(item)} />
        </View>

        <View style={styles.btn}>
          <Button
            title={item.vendido ? "Desfazer" : "Vender"}
            color={COLORS.primaryDark}
            onPress={() => onToggleVendido(item.id, item.vendido)}
          />
        </View>

        <View style={styles.btn}>
          <Button title="X" color={COLORS.danger} onPress={() => onExcluir(item.id)} />
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

  imageContainer: {
    width: "100%",
    height: 160,
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: "#f2f2f2",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    position: "relative",
  },
  image: { width: "100%", height: "100%" },
  imagePlaceholder: { color: "#999", fontStyle: "italic" },

  badge: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: COLORS.danger,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 8,
    elevation: 3,
  },
  badgeText: { color: COLORS.textLight, fontWeight: "bold", fontSize: 12 },

  info: { marginBottom: 10 },
  nome: { fontSize: 16, fontWeight: "bold", color: COLORS.primaryDark, marginBottom: 4 },
  text: { color: COLORS.text },

  actionsRow: { flexDirection: "row", gap: 8 },
  btn: { flex: 1 },
});
