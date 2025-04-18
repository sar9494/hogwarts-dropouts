import { Request, Response, NextFunction } from "express";
import prisma from "../../prismaClient";
export const cardExist = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.body;
  try {
    const isExist = await prisma.bankCard.findUnique({
      where: {
        id: id,
      },
    });
    if (isExist) {
      next();
    } else {
      res.status(404).send({
        success: false,
        message: "Card not found",
      });
    }
  } catch (error) {
    res.status(500).send({
      error: true,
      message: error,
    });
  }
};
