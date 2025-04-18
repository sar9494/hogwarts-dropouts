import prisma from "../../prismaClient";
import { Request, Response } from "express";
type BankCard = {
  id: number;
  country?: string;
  firstName?: string;
  lastName?: string;
  cardNumber?: string;
  expiryDate?: string;
};

export const updateBankCard = async (req: Request, res: Response) => {
  const bankCardUpdates = req.body as unknown as BankCard;

  try {
    const existingCard = await prisma.bankCard.findUnique({
      where: { id: bankCardUpdates.id },
    });

    if (!existingCard) {
      res.status(404).json({
        error: true,
        message: "Bank card not found",
      });
      return;
    }

    const updatedCard = await prisma.bankCard.update({
      where: { id: bankCardUpdates.id },
      data: {
        country: bankCardUpdates.country ?? existingCard.country,
        firstName: bankCardUpdates.firstName ?? existingCard.firstName,
        lastName: bankCardUpdates.lastName ?? existingCard.lastName,
        cardNumber: bankCardUpdates.cardNumber ?? existingCard.cardNumber,
        expiryDate: bankCardUpdates.expiryDate ?? existingCard.expiryDate,
      },
    });

    res.status(200).json(updatedCard);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: true,
      message: error instanceof Error ? error.message : "Unknown server error",
    });
  }
};
