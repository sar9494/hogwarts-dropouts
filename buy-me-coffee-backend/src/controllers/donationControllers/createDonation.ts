import prisma from "../../prismaClient";
import { Request, Response } from "express";

type Donation = {
  amount: number;
  specialMessage: string;
  socialURLOrBuyMeACoffee: string;
  recipientId: number;
  donorId: number;
};
export const donationPay = async (req: Request, res: Response) => {
  const donatater: Donation = req.body;

  try {
    const donations = await prisma.donations.create({
      data: {
        amount: donatater.amount,
        specialMessage: donatater.specialMessage,
        socialURLOrBuyMeACoffee: donatater.socialURLOrBuyMeACoffee,
        donorId: donatater.donorId,
        recipientId: donatater.recipientId,
      },
    });
    res.status(201).send(donations);
  } catch (err) {
    console.error("Error processing donation:", err);
    res.status(500).send({
      error: true,
      message: err || "An unexpected error occurred",
    });
  }
  // finally{
  //     prisma.$disconnect();
  // }
};
