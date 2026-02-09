import {
  addCliente,
  getClientes,
  deleteCliente,
  updateCliente,
} from "../database";

export const ClienteService = {
  listar: async () => await getClientes(),

  salvar: async ({ id, nome }) => {
    if (!nome || nome.trim() === "") {
      throw new Error("Nome obrigatório");
    }

    const nomeFormatado = nome.trim();

    if (id) return await updateCliente(id, nomeFormatado);
    return await addCliente(nomeFormatado);
  },

  excluir: async (id) => await deleteCliente(id),
};
