import prisma from "../../prismaClient";
import { Response, Request } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
type User = {
  password: string;
  email: string;
};

export const signin = async (req: Request, res: Response) => {
  const decodePass = process.env.JWT_SECRET;

  const { password, email } = req.body as unknown as User;
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (user) {
      const isSigned = await bcrypt.compare(password, user.password);
      if (isSigned && decodePass) {
        const token = jwt.sign(
          {
            exp: Math.floor(Date.now() / 1000) + 60 * 60,
            data: { email: user.email, username: user.username },
          },
          decodePass
        );
        res
          .send({
            success: true,
            message: "logged in",
            token: token,
            userId: user.id,
          })
          .status(200);
      } else {
        res.send({
          success: false,
          message: "Wrong password",
        });
      }
    }
  } catch (error) {
  } finally {
    // prisma.$disconnect();
  }
};
