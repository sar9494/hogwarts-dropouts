import prisma from "../../prismaClient";
import { Request, Response } from "express";

export const searchDonations = async (req: Request, res: Response) => {
  const { amount, date } = req.query;
  const userId = Number(req.params.userId);

  const now = new Date();
  let dateFilter = {};

  if (date === "last30") {
    dateFilter = { gte: new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000) };
  } else if (date === "last90") {
    dateFilter = { gte: new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000) };
  }

  let amountCondition = {};

  if (amount === "1" || amount === "2" || amount === "5" || amount === "10") {
    amountCondition = { amount: Number(amount) };
  } else if (amount === "other") {
    amountCondition = { amount: { notIn: [1, 2, 5, 10] } };
  }

  try {
    const donations = await prisma.donations.findMany({
      where: {
        ...amountCondition,
        ...(Object.keys(dateFilter).length > 0 && {
          createdAt: dateFilter,
          recipientId: userId,
        }),
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        donor: {
          select: {
            Profile: {
              select: {
                avatarImage: true,
                name: true,
                socialMediaURL: true,
              },
            },
          },
        },
      },
    });

    res.status(200).send({
      error: false,
      donations,
    });
  } catch (err) {
    console.error("Donation search error:", err);
    res.status(500).send({
      error: true,
      message: "An error occurred during donation search.",
    });
  } finally {
    await prisma.$disconnect();
  }
};
