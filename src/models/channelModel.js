import prisma from "../../prisma/prisma.js";

class ChannelModel {
  // Obter todas os canais
  async findAll(description, bannerUrl, pagina, limite) {

    if (description) {
      where.description =  description;
     
    }

    if (bannerUrl) {
      where.bannerUrl = bannerUrl;
  }

  if (Number(limite) < 1 || Number(limite) > 100) {
    limite = 10;
  }

  if (Number(pagina) < 1) {
    pagina = 1;
  }

  const where = {};

  const skip = (Number(pagina) - 1) * Number(limite);

    const canais = await prisma.channel.findMany({
      orderBy: {
        createdAt: "desc",
      },
      where,
      skip,
    });

    return canais;
  }

  // Obter um canal pelo ID
  async findById(id) {
    const canal = await prisma.channel.findUnique({
      where: {
        id: Number(id),
      },
      include: {
        cards: true,
      },
    });

    return canal;
  }

  // Criar um novo canal
  async create(name, description, isLive) {
    const novoCanal = await prisma.channel.create({
      data: {
        name,
        description,
        isLive,
      },
    });

    return novoCanal;
  }
}

export default new ChannelModel();
