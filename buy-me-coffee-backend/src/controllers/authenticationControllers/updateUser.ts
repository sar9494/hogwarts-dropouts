import { Response, Request } from "express";
import prisma from "../../prismaClient";
type User = {
  username: string;
  id: number;
  email: string;
};

export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params as unknown as User;
  const { username, email } = req.query as unknown as User;

  try {
    const updatedUser = await prisma.user.update({
      where: {
        id: id,
      },
      data: {
        username: username,
        email: email,
      },
    });
    res.send({
      success: true,
      message: updatedUser,
    });
  } catch (error) {
    res.send({
      error: true,
      message: error,
    });
  }
};
