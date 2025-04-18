import { Response, Request } from "express";
import prisma from "../../prismaClient";
type CurrentUser = {
  currentUser: string;
};
export const getCurrentProfile = async (req: Request, res: Response) => {
  const { currentUser } = req.query as unknown as CurrentUser;
  try {
    const user = await prisma.profile.findUnique({
      where: { userId: parseInt(currentUser, 10) },
      include: {
        user: true,
      },
    });
    const bankAccs = await prisma.bankCard.findMany({
      where: {
        userId: parseInt(currentUser, 10),
      },
    });
    if (user) {
      res.send({
        ...user,
        bankCards: bankAccs,
      });
    } else {
      res.send(null);
    }
  } catch (error) {
    res.send({
      error: true,
      message: `Server error : ${error}`,
    });
  }
};
