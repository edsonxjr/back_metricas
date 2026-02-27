import db from '../config/database';

class MetricasService {
  async listarTodas() {
    return await db('metricas_bd').select('*');
  }
}

export default new MetricasService();