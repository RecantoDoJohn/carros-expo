import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, Alert } from "react-native";
import { initDB } from "../../src/database";
import { ClienteService } from "../../src/services/clienteService";
import ClienteForm from "../../src/components/ClienteForm";
import ClienteItem from "../../src/components/ClienteItem";
import { COLORS } from "../../src/theme/colors";

export default function ClientesScreen() {
  const [nome, setNome] = useState("");
  const [listaClientes, setListaClientes] = useState([]);
  const [idEdicao, setIdEdicao] = useState(null);

  useEffect(() => {
    const setup = async () => {
      await initDB();
      await atualizar();
    };
    setup();
  }, []);

  const atualizar = async () => {
    const clientes = await ClienteService.listar();
    setListaClientes(clientes);
  };

  const salvar = async () => {
    try {
      await ClienteService.salvar({ id: idEdicao, nome });

      Alert.alert(
        "Sucesso",
        idEdicao ? "Cliente atualizado!" : "Cliente cadastrado!"
      );

      setIdEdicao(null);
      setNome("");
      atualizar();
    } catch (e) {
      Alert.alert("Erro", e.message || "Não foi possível salvar.");
    }
  };

  const editar = (cliente) => {
    setIdEdicao(cliente.id);
    setNome(cliente.nome);
  };

  const excluir = async (id) => {
    await ClienteService.excluir(id);
    atualizar();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Clientes</Text>

      <ClienteForm nome={nome} setNome={setNome} onSalvar={salvar} />

      <Text style={styles.subtitle}>Lista:</Text>

      <FlatList
        data={listaClientes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ClienteItem 
            item={item}
            onEditar={editar}
            onExcluir={excluir} />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 50,
    backgroundColor: COLORS.background,
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
    color: COLORS.primaryDark,
  },

  subtitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
    color: COLORS.primary,
  },
});
