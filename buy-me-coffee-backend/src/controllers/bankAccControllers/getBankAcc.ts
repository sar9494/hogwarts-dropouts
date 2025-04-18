import prisma from "../../prismaClient";
import express, { Request, Response } from "express";

type BankCard = {
  country: string;
  firstName: string;
  lastName: string;
  cardNumber: string;
  expiryDate: string;
};

export const getUserId = async (req: Request, res: Response) => {
  const userId = Number(req.params.userId);

  //   if (!userId) {
  //     return res.status(400).json({
  //       error: true,
  //       message: "User ID is required in the query parameters or headers",
  //     });
  //   }

  try {
    const bankCards = await prisma.bankCard.findMany({
      where: {
        userId: userId,
      },
    });

    res.status(201).json(bankCards);
    return;
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: true,
      message: error instanceof Error ? error.message : "Unknown server error",
    });
  }
};
