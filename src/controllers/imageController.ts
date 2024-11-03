import { Request, Response } from "express";

export const getImage = async (req: Request, res: Response): Promise<void> => {
  console.log(req, res);
};
