import { Response, Request, NextFunction } from "express";
export const postValuesValid = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, about, avatarImage, socialMediaURL } = req.body;
  if (!name) {
    res.status(400).send({
      success: false,
      message: "Name required",
    });
  } else if (!about) {
    res.status(400).send({
      success: false,
      message: "About required",
    });
  } else if (!avatarImage) {
    res.status(400).send({
      success: false,
      message: "Avatar image required",
    });
  } else if (!socialMediaURL) {
    res.status(400).send({
      success: false,
      message: "Social media url required",
    });
  } else next();
};
