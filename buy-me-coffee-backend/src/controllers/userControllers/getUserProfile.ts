import { Request, Response } from "express";
import prisma from "../../prismaClient";
export const getUserProfile = async (req: Request, res: Response) => {
  const { username } = req.params;
  try {
    const userPro = await prisma.profile.findUnique({
      where: { name: username },
    });

    res.send(userPro);
  } catch (error) {
    res.send({
      error: true,
      message: `Server error : ${error}`,
    });
  }
};
