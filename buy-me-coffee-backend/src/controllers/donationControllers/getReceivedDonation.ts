import prisma from "../../prismaClient";
import { Request, Response } from "express";

export const getReceivedDonation = async (req: Request, res: Response) => {
  const { userId } = req.params;

  try {
    const receivedDonations = await prisma.donations.findMany({
      where: {
        recipientId: Number(userId),
      },
      include: {
        donor: {
          select: {
            Profile: {
              select: {
                avatarImage: true,
                name: true,
                socialMediaURL: true,
              },
            },
          },
        },
      },
    });

    res.status(200).send(receivedDonations);
  } catch (err) {
    console.error("Error fetching received donations:", err);
    res.status(500).send({
      error: true,
      message: err,
    });
  } finally {
    await prisma.$disconnect();
  }
};
