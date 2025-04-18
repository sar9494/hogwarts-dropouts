import { Response, Request, NextFunction } from "express";
import prisma from "../../prismaClient";
export const cardNumberExist = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { cardNumber } = req.body;
  try {
    const numberExist = await prisma.bankCard.findUnique({
      where: {
        cardNumber: cardNumber,
      },
    });
    if (numberExist) {
      res.send({
        success: false,
        message: "Card number exist",
      });
    } else next();
  } catch (error) {
    res.status(500).send({
      error: true,
      message: error,
    });
  }
};
