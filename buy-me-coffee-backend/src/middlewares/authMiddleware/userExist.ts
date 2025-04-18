import { Response, Request, NextFunction } from "express";
import prisma from "../../prismaClient";
export const userExist = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email } = req.body;
  try {
    const isExist = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (isExist) {
      next();
    } else {
      res.status(404).send({
        success: false,
        message: "User not found",
      });
    }
  } catch (error) {
    res.status(500).send({
      error: true,
      message: error,
    });
  }
};
