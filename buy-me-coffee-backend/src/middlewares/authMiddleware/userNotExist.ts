import { Response, Request, NextFunction } from "express";
import prisma from "../../prismaClient";
export const userNotExist = async (
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
    if (!isExist) {
      next();
    } else {
      res.send({
        success: false,
        message: "User email exist",
      });
    }
  } catch (error) {
    res.status(500).send({
      error: true,
      message: error,
    });
  }
};
