import React, { useEffect, useState, useCallback } from "react";
import { View, Text, FlatList, StyleSheet, Alert } from "react-native";
import { useFocusEffect } from "expo-router";
import * as ImagePicker from "expo-image-picker";

import { COLORS } from "../../src/theme/colors";
import { initDB } from "../../src/database";
import { CarroService } from "../../src/services/carroService";

import CarroForm from "../../src/components/CarroForm";
import CarroItem from "../../src/components/CarroItem";

export default function CarrosScreen() {
  const [marca, setMarca] = useState("");
  const [modelo, setModelo] = useState("");
  const [ano, setAno] = useState("");
  const [preco, setPreco] = useState("");
  const [imagemUri, setImagemUri] = useState<string | null>(null);

  const [listaCarros, setListaCarros] = useState<any[]>([]);
  const [idEdicao, setIdEdicao] = useState<number | null>(null);

  useEffect(() => {
    (async () => {
      await initDB();
      await atualizar();
    })();
  }, []);

  useFocusEffect(
    useCallback(() => {
      atualizar(); // atualiza ao voltar pra aba
    }, [])
  );

  const atualizar = async () => {
    const carros = await CarroService.listar();
    setListaCarros(carros);
  };

  // 📷 menu câmera/galeria
  const escolherImagem = () => {
    Alert.alert("Imagem do carro", "Como você quer adicionar a imagem?", [
      { text: "Cancelar", style: "cancel" },
      { text: "Tirar foto", onPress: tirarFoto },
      { text: "Escolher da galeria", onPress: escolherDaGaleria },
    ]);
  };

  const escolherDaGaleria = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permissão", "Permita acesso às fotos para selecionar uma imagem.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
    allowsEditing: true,
    quality: 0.8,
  });


    if (!result.canceled) setImagemUri(result.assets[0].uri);
  };

  const tirarFoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permissão", "Permita acesso à câmera para tirar foto.");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 0.8,
    });

    if (!result.canceled) setImagemUri(result.assets[0].uri);
  };

  const salvar = async () => {
    try {
      await CarroService.salvar({ id: idEdicao, marca, modelo, ano, preco, imagemUri });

      Alert.alert("Sucesso", idEdicao ? "Carro atualizado!" : "Carro cadastrado!");
      setIdEdicao(null);
      setMarca(""); setModelo(""); setAno(""); setPreco(""); setImagemUri(null);

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
    setImagemUri(car.imagemUri ?? null);
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
        imagemUri={imagemUri}
        onPickImage={escolherImagem}
        onSalvar={salvar}
      />

      <Text style={styles.subtitle}>Lista:</Text>

      <FlatList
        data={listaCarros}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <CarroItem item={item} onEditar={editar} onExcluir={excluir} onToggleVendido={toggle} />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, paddingTop: 50, backgroundColor: COLORS.background },
  title: { fontSize: 26, fontWeight: "bold", textAlign: "center", color: COLORS.primaryDark, marginBottom: 10 },
  subtitle: { fontSize: 18, fontWeight: "bold", marginTop: 18, marginBottom: 10, color: COLORS.primary },
});
