import express from "express";
import { createBankCard } from "../controllers/bankAccControllers/postBankAcc";
import { checkAllValueExist } from "../middlewares/bankCardMiddleware/checkAllValueExist";
import { updateBankCard } from "../controllers/bankAccControllers/updateBankAcc";
import { getUserId } from "../controllers/bankAccControllers/getBankAcc";
import { cardExist } from "../middlewares/bankCardMiddleware/cardExist";
import { idValid } from "../middlewares/bankCardMiddleware/checkUpdateValueExist";
import { cardNumberExist } from "../middlewares/bankCardMiddleware/cardNumberExist";
export const bankAccRouter = express.Router();
bankAccRouter.post(
  "/bank-acc",
  checkAllValueExist,
  cardNumberExist,
  createBankCard
);
bankAccRouter.put("/bank-acc", idValid, cardExist, updateBankCard);
bankAccRouter.get("/bank-acc/:userId", getUserId);
