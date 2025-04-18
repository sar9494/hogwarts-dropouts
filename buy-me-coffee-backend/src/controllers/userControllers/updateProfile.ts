import { Response, Request } from "express";
import prisma from "../../prismaClient";
type ProfileIdType = {
  profileId: number;
  successMessage: string;
  backgroundImage: string;
  avatarImage: string;
  name: string;
  about: string;
  socialMediaURL: string;
};
export const updateProfile = async (req: Request, res: Response) => {
  const {
    profileId,
    successMessage,
    backgroundImage,
    avatarImage,
    name,
    about,
    socialMediaURL,
  } = req.body as unknown as ProfileIdType;
  try {
    const updatedProfile = await prisma.profile.update({
      where: {
        id: profileId,
      },
      data: {
        successMessage: successMessage,
        backgroundImage: backgroundImage,
        avatarImage: avatarImage,
        name: name,
        about: about,
        socialMediaURL: socialMediaURL,
      },
    });
    res.send({
      success: true,
      message: updatedProfile,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: `server error ${error}`,
    });
  }
};
