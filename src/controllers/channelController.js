import ChannelModel from "../models/channelModel.js";

class ChannelController {
  // GET /canais
  async getAllChannel(req, res) {
    try {
      const canais = await ChannelModel.findAll();
      res.json(canais);
    } catch (error) {
      console.error("Erro ao buscar os canis:", error);
      res.status(500).json({ error: "Erro ao buscar os canais" });
    }
  }

  // GET /canais/:id
  async getChannelById(req, res) {
    try {
      const { id } = req.params;

      const canal = await ChannelModel.findById(id);

      if (!canal) {
        return res.status(404).json({ error: "Canal não encontrado!" });
      }

      res.json(canal);
    } catch (error) {
      console.error("Erro ao buscar canal:", error);
      res.status(500).json({ error: "Erro ao buscar canal!" });
    }
  }

  // POST /canais
  async createChannel(req, res) {
    try {
      // Validação básica
      const { name, description, isLive } = req.body;

      // Verifica se todos os campos do canal foram fornecidos
      if (!name || !description || !isLive) {
        return res.status(400).json({
          error: "Os campos nome, descrição e isLive são obrigatórios!",
        });
      }

      // Criar um novo canal
      const newChannel = await ChannelModel.create(
        name,
        description,
        isLive,
        
      );

      if (!newChannel) {
        return res.status(400).json({ error: "Erro ao criar canal" });
      }

      res.status(201).json({
        message: "Coleção criada com sucesso",
        newCollection,
      });
    } catch (error) {
      console.error("Erro ao criar coleção:", error);
      res.status(500).json({ error: "Erro ao criar coleção" });
    }
  }

}

export default new ChannelController();
