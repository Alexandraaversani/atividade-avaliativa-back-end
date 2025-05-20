import prisma from "../../prisma/prisma.js";

class ChannelModel {
  // Obter todas os canais
  async findAll() {
    const canais = await prisma.channel.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        cards: true,
      },
    });

    // console.log(canais);

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
