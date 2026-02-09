import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, Alert } from "react-native";
import { initDB } from "../../src/database";
import { CarroService } from "../../src/services/carroService";
import CarroForm from "../../src/components/CarroForm";
import CarroItem from "../../src/components/CarroItem";
import { COLORS } from "../../src/theme/colors";



export default function CarrosScreen() {
  const [marca, setMarca] = useState("");
  const [modelo, setModelo] = useState("");
  const [ano, setAno] = useState("");
  const [preco, setPreco] = useState("");
  const [listaCarros, setListaCarros] = useState<any[]>([]);
  const [idEdicao, setIdEdicao] = useState<number | null>(null);

  useEffect(() => {
    const setup = async () => {
      await initDB();
      await atualizar();
    };
    setup();
  }, []);

  const atualizar = async () => {
    const carros = await CarroService.listar();
    setListaCarros(carros);
  };

  const salvar = async () => {
    try {
      await CarroService.salvar({ id: idEdicao, marca, modelo, ano, preco });
      Alert.alert("Sucesso", idEdicao ? "Carro atualizado!" : "Carro cadastrado!");
      setIdEdicao(null);
      setMarca(""); setModelo(""); setAno(""); setPreco("");
      atualizar();
    } catch (e: any) {
      Alert.alert("Erro", e.message || "Não foi possível salvar.");
    }
  };

  const editar = (car: any) => {
    setIdEdicao(car.id);
    setMarca(car.marca);
    setModelo(car.modelo);
    setAno(String(car.ano));
    setPreco(String(car.preco));
  };

  const excluir = async (id: number) => {
    await CarroService.excluir(id);
    atualizar();
  };

  const toggle = async (id: number, vendido: number) => {
    await CarroService.alternarVendido(id, vendido);
    atualizar();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Carros</Text>

      <CarroForm
        marca={marca} setMarca={setMarca}
        modelo={modelo} setModelo={setModelo}
        ano={ano} setAno={setAno}
        preco={preco} setPreco={setPreco}
        onSalvar={salvar}
      />

      <Text style={styles.subtitle}>Lista:</Text>

      <FlatList
        data={listaCarros}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <CarroItem
            item={item}
            onEditar={editar}
            onExcluir={excluir}
            onToggleVendido={toggle}
          />
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
