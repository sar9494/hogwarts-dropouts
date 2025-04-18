import express from "express";
import { signup } from "../controllers/authenticationControllers/signup";
import { updateUser } from "../controllers/authenticationControllers/updateUser";
import { idValid } from "../middlewares/authMiddleware/idValid";
import { signin } from "../controllers/authenticationControllers/signin";
import { userExist } from "../middlewares/authMiddleware/userExist";
import { userNotExist } from "../middlewares/authMiddleware/userNotExist";
import { userNameExist } from "../middlewares/authMiddleware/userNameExist";
export const userRouter = express.Router();
userRouter.post("/sign-up", userNameExist, userNotExist, signup);
userRouter.put("/update/:userId", idValid, updateUser);
userRouter.post("/sign-in", userExist, signin);

