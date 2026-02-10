import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, Alert } from "react-native";

import { COLORS } from "../../src/theme/colors";
import { initDB } from "../../src/database";
import { VendaService } from "../../src/services/vendaService";

import VendaForm from "../../src/components/VendaForm";
import VendaItem from "../../src/components/VendaItem";

export default function VendasScreen() {
  const [carroId, setCarroId] = useState("");
  const [dataVenda, setDataVenda] = useState("");
  const [descricao, setDescricao] = useState("");
  const [listaVendas, setListaVendas] = useState<any[]>([]);
  const [idEdicao, setIdEdicao] = useState<number | null>(null);

  useEffect(() => {
    (async () => {
      await initDB();
      await atualizar();
    })();
  }, []);

  const atualizar = async () => {
    const vendas = await VendaService.listar();
    setListaVendas(vendas);
  };

  const salvar = async () => {
    try {
      await VendaService.salvar({
        id: idEdicao,
        carro_id: carroId,
        data: dataVenda,
        descricao,
      });

      Alert.alert("Sucesso", idEdicao ? "Venda atualizada!" : "Venda cadastrada! (Carro vendido ✅)");
      setIdEdicao(null);
      setCarroId("");
      setDataVenda("");
      setDescricao("");
      atualizar();
    } catch (e: any) {
      Alert.alert("Erro", e.message || "Não foi possível salvar.");
    }
  };

  const editar = (v: any) => {
    setIdEdicao(v.id);
    setCarroId(String(v.carro_id));
    setDataVenda(v.data);
    setDescricao(v.descricao);
  };

  const excluir = async (id: number) => {
    await VendaService.excluir(id);
    atualizar();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Vendas</Text>

      <VendaForm
        carroId={carroId}
        setCarroId={setCarroId}
        dataVenda={dataVenda}
        setDataVenda={setDataVenda}
        descricao={descricao}
        setDescricao={setDescricao}
        onSalvar={salvar}
      />

      <Text style={styles.subtitle}>Lista:</Text>

      <FlatList
        data={listaVendas}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <VendaItem item={item} onEditar={editar} onExcluir={excluir} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, paddingTop: 50, backgroundColor: COLORS.background },
  title: { fontSize: 26, fontWeight: "bold", textAlign: "center", color: COLORS.primaryDark, marginBottom: 10 },
  subtitle: { fontSize: 18, fontWeight: "bold", marginTop: 18, marginBottom: 10, color: COLORS.primary },
});
