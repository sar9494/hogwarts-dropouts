import { Response, Request, NextFunction } from "express";
import prisma from "../../prismaClient";
export const nameExist = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name } = req.body;
  try {
    const nameExist = await prisma.profile.findUnique({
      where: { name: name },
    });
    if (nameExist) {
      res.send({
        success: false,
        message: "Name is exist.",
      });
    } else next();
  } catch (error) {}
};
