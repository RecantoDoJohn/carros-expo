import { addVenda, getVendas, updateVenda, deleteVenda, toggleVendido } from "../database";

export const VendaService = {
  listar: async () => await getVendas(),

  salvar: async ({ id, carro_id, cliente_id, data, descricao }) => {
    const carroIdNum = parseInt(String(carro_id), 10);
    const clienteIdNum = parseInt(String(cliente_id), 10);

    if (!carroIdNum || !clienteIdNum || !data || !descricao) throw new Error("Preencha tudo");

    if (id) {
      return await updateVenda(id, carroIdNum, clienteIdNum, data, descricao);
    }

    const vendaId = await addVenda(carroIdNum, clienteIdNum, data, descricao);
    await toggleVendido(carroIdNum, 1); // marca como vendido
    return vendaId;
  },

  excluir: async (id) => await deleteVenda(id),
};
