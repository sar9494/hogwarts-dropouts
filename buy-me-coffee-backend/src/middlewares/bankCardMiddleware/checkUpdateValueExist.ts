import { Request, Response, NextFunction } from "express";
export const idValid = (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.body;
  if (!id) {
    res.send({
      success: false,
      message: "user id missing",
    });
  } else next();
};
