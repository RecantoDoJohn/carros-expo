import * as SQLite from "expo-sqlite";

const getDB = async () => {
  return await SQLite.openDatabaseAsync("concessionaria.db");
};

export const initDB = async () => {
  const db = await getDB();

  await db.execAsync(`
    PRAGMA journal_mode = WAL;

    CREATE TABLE IF NOT EXISTS carros (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      marca TEXT NOT NULL,
      modelo TEXT NOT NULL,
      ano INTEGER NOT NULL,
      preco REAL NOT NULL,
      vendido INTEGER NOT NULL DEFAULT 0,
      imagemUri TEXT
    );

    
    CREATE TABLE IF NOT EXISTS clientes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL
      );

      CREATE TABLE IF NOT EXISTS vendas (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        carro_id INTEGER NOT NULL,
        cliente_id INTEGER NOT NULL,
        data TEXT NOT NULL,
        descricao TEXT NOT NULL,
        FOREIGN KEY (carro_id) REFERENCES carros(id),
        FOREIGN KEY (cliente_id) REFERENCES clientes(id)
      );
  `);

  // garante coluna imagemUri em bancos antigos
  const cols = await db.getAllAsync(`PRAGMA table_info(carros)`);
  const temImagem = cols.some((c) => c.name === "imagemUri");
  if (!temImagem) {
    await db.execAsync(`ALTER TABLE carros ADD COLUMN imagemUri TEXT;`);
  }
};

/* =================== CARROS =================== */

export const addCarro = async (marca, modelo, ano, preco, imagemUri) => {
  const db = await getDB();
  const result = await db.runAsync(
    "INSERT INTO carros (marca, modelo, ano, preco, vendido, imagemUri) VALUES (?, ?, ?, ?, 0, ?)",
    [marca, modelo, ano, preco, imagemUri ?? null]
  );
  return result.lastInsertRowId;
};

export const getCarros = async () => {
  const db = await getDB();
  return await db.getAllAsync("SELECT * FROM carros ORDER BY id DESC");
};

export const updateCarro = async (id, marca, modelo, ano, preco, imagemUri) => {
  const db = await getDB();
  await db.runAsync(
    "UPDATE carros SET marca = ?, modelo = ?, ano = ?, preco = ?, imagemUri = ? WHERE id = ?",
    [marca, modelo, ano, preco, imagemUri ?? null, id]
  );
};

export const deleteCarro = async (id) => {
  const db = await getDB();
  await db.runAsync("DELETE FROM carros WHERE id = ?", [id]);
};

export const toggleVendido = async (id, vendido) => {
  const db = await getDB();
  await db.runAsync("UPDATE carros SET vendido = ? WHERE id = ?", [vendido, id]);
};

// ===================== CLIENTES =====================

export const addCliente = async (nome) => {
  const db = await getDB();
  const result = await db.runAsync(
    "INSERT INTO clientes (nome) VALUES (?)",
    [nome]
  );
  return result.lastInsertRowId;
};

export const getClientes = async () => {
  const db = await getDB();
  return await db.getAllAsync("SELECT * FROM clientes ORDER BY id DESC");
};

export const deleteCliente = async (id) => {
  const db = await getDB();
  await db.runAsync("DELETE FROM clientes WHERE id = ?", [id]);
};

export const updateCliente = async (id, nome) => {
  const db = await getDB();
  await db.runAsync(
    "UPDATE clientes SET nome = ? WHERE id = ?",
    [nome, id]
  );
};

/* =================== VENDAS =================== */

export const addVenda = async (carro_id, cliente_id, data, descricao) => {
  const db = await getDB();
  const result = await db.runAsync(
    "INSERT INTO vendas (carro_id, cliente_id, data, descricao) VALUES (?, ?, ?, ?)",
    [carro_id, cliente_id, data, descricao]
  );
  return result.lastInsertRowId;
};

export const getVendas = async () => {
  const db = await getDB();
  return await db.getAllAsync(`
    SELECT
      vendas.id,
      vendas.carro_id,
      vendas.cliente_id,
      vendas.data,
      vendas.descricao,
      carros.marca AS marca_carro,
      carros.modelo AS modelo_carro,
      carros.ano AS ano_carro,
      carros.preco AS preco_carro,
      clientes.nome AS cliente_nome
    FROM vendas
    JOIN carros ON carros.id = vendas.carro_id
    JOIN clientes ON clientes.id = vendas.cliente_id
    ORDER BY vendas.id DESC
  `);
};

export const updateVenda = async (id, carro_id, cliente_id, data, descricao) => {
  const db = await getDB();
  await db.runAsync(
    "UPDATE vendas SET carro_id = ?, cliente_id = ?, data = ?, descricao = ? WHERE id = ?",
    [carro_id, cliente_id, data, descricao, id]
  );
};

export const deleteVenda = async (id) => {
  const db = await getDB();
  await db.runAsync("DELETE FROM vendas WHERE id = ?", [id]);
};
