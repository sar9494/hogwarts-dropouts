import { Request, Response } from "express";
import prisma from "../../prismaClient";
type reqType = {
  username?: string;
};
export const getAllProfile = async (req: Request, res: Response) => {
  const name = (req.query.name as string) || undefined;
  const limit = 10;
  if (name) {
    try {
      const allProfiles = await prisma.profile.findMany({
        where: name
          ? {
              name: {
                contains: name,
                mode: "insensitive", // optional: makes the search case-insensitive
              },
            }
          : undefined,
      });

      res.status(200).send(allProfiles);
    } catch (error) {
      console.error("Error fetching profiles:", error);
      res.status(500).send({
        success: false,
        message: `Server error: ${
          error instanceof Error ? error.message : error
        }`,
      });
    }
  } else {
    try {
      const allProfile = await prisma.profile.findMany();
      res.send(allProfile);
    } catch (error) {
      console.error("Error fetching profiles:", error);
      res.status(500).send({
        success: false,
        message: `Server error: ${
          error instanceof Error ? error.message : error
        }`,
      });
    }
  }
};
