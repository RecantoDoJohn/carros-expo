import { addCarro, getCarros, updateCarro, deleteCarro, toggleVendido } from "../database";

export const CarroService = {
  listar: async () => await getCarros(),

  salvar: async ({ id, marca, modelo, ano, preco, imagemUri }) => {
    const anoNum = parseInt(String(ano), 10);
    const precoNum = Number(String(preco).replace(",", "."));

    if (!marca || !modelo) throw new Error("Preencha marca e modelo");
    if (Number.isNaN(anoNum)) throw new Error("Ano inválido");
    if (Number.isNaN(precoNum) || precoNum <= 0) throw new Error("Preço inválido");

    if (id) return await updateCarro(id, marca, modelo, anoNum, precoNum, imagemUri);
    return await addCarro(marca, modelo, anoNum, precoNum, imagemUri);
  },

  excluir: async (id) => await deleteCarro(id),

  alternarVendido: async (id, vendidoAtual) => {
    await toggleVendido(id, vendidoAtual ? 0 : 1);
  },
};
