import { Request, Response } from "express";
import { resizeImage } from "../services/imageService";

export const getImage = async (req: Request, res: Response): Promise<void> => {
  const { filename, width, height } = req.query;

  if (!filename || !width || !height) {
    res.status(400).send("filename, width, and height are required parameters");
    return;
  }

  try {
    const outputPath = await resizeImage(
      filename as string,
      parseInt(width as string, 10),
      parseInt(height as string, 10)
    );
    if (outputPath === "") {
      res.status(404).send("Source image not found!");
      return;
    }
    res.status(200).sendFile(outputPath);
  } catch (error) {
    res.status(500).send(error);
  }
};
