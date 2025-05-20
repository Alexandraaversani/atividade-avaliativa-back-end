import ChannelModel from "../models/channelModel.js";

class ChannelController {
  // GET /canais
  async getAllChannel(req, res) {
    const { description, bannerUrl } = req.query;

    const pagina = req.query.pagina || 1;
    const limite = req.query.limite || 10;
    try {
      const canais = await ChannelModel.findAll(description, bannerUrl, pagina, limite);
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
      const { userId, name, description, isLive, bannerUrl, logoUrl } = req.body;

      // Verifica se todos os campos do canal foram fornecidos
      if (!userId || !name || !description || isLive || !bannerUrl || !logoUrl) {
        return res.status(400).json({
          error: "Os campos nome, descrição e isLive são obrigatórios!",
        });
      }

      // Criar um novo canal
      const newChannel = await ChannelModel.create(
        userId,
        name,
        description,
        isLive,
        bannerUrl,
        logoUrl
        
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
