import { addVenda, getVendas, deleteVenda, updateVenda, toggleVendido } from "../database";

export const VendaService = {
  listar: async () => await getVendas(),

  salvar: async ({ id, carro_id, data, descricao }) => {
    const carroIdNum = parseInt(String(carro_id), 10);

    if (!carroIdNum || !data || !descricao) {
      throw new Error("Preencha tudo");
    }

    // EDITAR venda (não mexe no status do carro)
    if (id) {
      return await updateVenda(id, carroIdNum, data, descricao);
    }

    // NOVA venda: cadastra e marca como vendido
    const vendaId = await addVenda(carroIdNum, data, descricao);
    await toggleVendido(carroIdNum, 1);
    return vendaId;
  },

  excluir: async (id) => await deleteVenda(id),
};
