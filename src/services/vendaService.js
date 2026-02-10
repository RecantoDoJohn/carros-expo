import { addVenda, getVendas, updateVenda, deleteVenda, toggleVendido } from "../database";

export const VendaService = {
  listar: async () => await getVendas(),

  salvar: async ({ id, carro_id, data, descricao }) => {
    const carroIdNum = parseInt(String(carro_id), 10);
    if (!carroIdNum || !data || !descricao) throw new Error("Preencha tudo");

    if (id) {
      return await updateVenda(id, carroIdNum, data, descricao);
    }

    const vendaId = await addVenda(carroIdNum, data, descricao);
    await toggleVendido(carroIdNum, 1); // marca como vendido
    return vendaId;
  },

  excluir: async (id) => await deleteVenda(id),
};
