import { Request, Response, NextFunction } from "express";
import prisma from "../../prismaClient";
export const userExist = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userId } = req.body;
  try {
    if (!userId) {
      res.status(404).send({
        success: false,
        message: "User id required",
      });
    } else {
      const user = await prisma.user.findUnique({
        where: { id: userId },
      });
      if (!user) {
        res.status(400).send({
          success: false,
          message: "User not found",
        });
      } else {
        next();
      }
    }
  } catch (error) {
    res.status(500).send({
      error: true,
      message: error,
    });
  }
};
