import { Request, Response, NextFunction } from "express";
import prisma from "../../prismaClient";
export const userNameExist = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { username } = req.body;
  try {
    const isExist = await prisma.user.findUnique({
      where: {
        username: username,
      },
    });
    if (isExist) {
      res.send({
        success: false,
        message: "Username exist",
      });
    } else {
      next();
    }
  } catch (error) {
    res.status(500).send({
      error: true,
      message: error,
    });
  }
};
