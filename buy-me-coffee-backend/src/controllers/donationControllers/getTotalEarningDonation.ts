import prisma from "../../prismaClient";
import Express, { Request, Response } from "express";

export const getTotalEarnings = async (req: Request, res: Response) => {
  const userId = Number(req.params.userId);


  try {
    const total = await prisma.donations.aggregate({
      _sum: {
        amount: true,
      },
      where: {
        recipientId: userId,
      },
    });

    res.status(200).send({
      error: false,
      totalEarnings: total._sum.amount || 0,
      
    });
  } catch (err) {
    console.error("Error getting total earnings:", err);
    res.status(500).send({
      error: true,
      message: "An unexpected error occurred",
    });
  } finally {
    await prisma.$disconnect();
  }
};
