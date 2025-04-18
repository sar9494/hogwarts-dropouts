import { Request, Response } from "express";
import prisma from "../../prismaClient";
type ProfileType = {
  userId: number;
  name: string;
  about: string;
  avatarImage: string;
  socialMediaURL: string;
};
export const addProfile = async (req: Request, res: Response) => {
  const { userId, name, about, avatarImage, socialMediaURL } =
    req.body as unknown as ProfileType;
  try {
    const newProfile = await prisma.profile.create({
      data: {
        userId: userId,
        name: name,
        about: about,
        avatarImage: avatarImage,
        socialMediaURL: socialMediaURL,
      },
    });
    res.send(newProfile);
  } catch (error) {
    res.send(error);
  }
};
