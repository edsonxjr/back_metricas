import { Request, Response } from 'express';
import MetricasService from '../services/MetricasService';

class MetricasController {
  async listar(req: Request, res: Response) {
    try {
      const dados = await MetricasService.listarTodas();
      return res.json(dados);
    } catch (error) {
      return res.status(500).json({ erro: "Falha ao buscar dados", detalhes: error });
    }
  }
}

export default new MetricasController();