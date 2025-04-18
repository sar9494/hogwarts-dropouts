import prisma from "../../prismaClient";
import express, { Request, Response } from "express";

type BankCard = {
  country: string;
  firstName: string;
  lastName: string;
  cardNumber: string;
  expiryDate: string; // coming in as ISO string from client (e.g., "2025-12-01")
  userId: number;
};

export const createBankCard = async (req: Request, res: Response) => {
  const bankCard = req.body as BankCard;

  try {
    const newCard = await prisma.bankCard.create({
      data: {
        country: bankCard.country,
        firstName: bankCard.firstName,
        lastName: bankCard.lastName,
        cardNumber: bankCard.cardNumber,
        expiryDate: bankCard.expiryDate, // ensure it's a Date
        userId: bankCard.userId,
      },
    });
    res.status(201).json(newCard);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: true,
      message: error instanceof Error ? error.message : "Unknown server error",
    });
  }
};
