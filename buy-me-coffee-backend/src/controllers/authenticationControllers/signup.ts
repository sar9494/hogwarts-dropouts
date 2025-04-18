import prisma from "../../prismaClient";
import bcrypt from "bcrypt";
import { Request, Response } from "express";

type User = {
  username: string;
  password: string;
  email: string;
};

export const signup = async (req: Request, res: Response) => {
  const user = req.body as unknown as User;
  try {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    const users = await prisma.user.create({
      data: { ...user, password: hashedPassword },
    });
    res.send(users);
  } catch (error) {
    res.send({
      error: true,
      message: error,
    });
  } finally {
    prisma.$disconnect();
  }
};
