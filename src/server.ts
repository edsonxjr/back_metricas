import express from 'express';
import db from './config/database';
import { loadControllers, scopePerRequest } from 'awilix-express';
import container from './container';

const app = express();

app.use(express.json());

app.use(scopePerRequest(container));

// AJUSTE AQUI: O caminho agora aceita tanto .ts quanto .js e garante a busca na pasta correta
app.use(loadControllers('controllers/**/*.{ts,js}', { cwd: __dirname }));

app.get('/test', (req, res) => {
  return res.json({ 
    mensagem: "API de Métricas operando normalmente",
    status: "sucesso"
  });
});

app.get('/db', async (req, res) => {
  try {
    await db.raw('SELECT 1');
    return res.json({ 
      mensagem: "Conexão com o banco de dados estabelecida com sucesso",
      status: "sucesso"
    });
  } catch (error) {
    return res.status(500).json({ 
      mensagem: "Erro interno: Não foi possível conectar ao banco de dados",
      detalhes: error 
    });
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`[INFO] Servidor Backend de Metricas rodando na porta ${PORT}`);
});