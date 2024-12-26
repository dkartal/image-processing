import path from "path";
import fs from "fs";
import sharp from "sharp";

const isTesting = process.env.NODE_ENV === "test";
/*
const fullDir = path.resolve(
  __dirname,
  "../../",
  isTesting
    ? process.env.TEST_IMAGES_PATH || "src/tests/assets/full"
    : process.env.FULL_IMAGES_PATH || "assets/full"
);

const thumbsDir = path.resolve(
  __dirname,
  "../../",
  isTesting
    ? process.env.TEST_THUMBS_PATH || "src/tests/assets/thumbs"
    : process.env.THUMBS_IMAGES_PATH || "assets/thumbs"
);
*/
const fullDir = path.resolve(
  process.cwd(),
  isTesting
    ? process.env.TEST_IMAGES_PATH || "src/tests/assets/full" // Ensure test images are used
    : process.env.FULL_IMAGES_PATH || "assets/full"
);

const thumbsDir = path.resolve(
  process.cwd(),
  isTesting
    ? process.env.TEST_THUMBS_PATH || "src/tests/assets/thumbs" // Ensure resized test images go here
    : process.env.THUMBS_IMAGES_PATH || "assets/thumbs"
);

export const resizeImage = async (
  filename: string,
  width: number,
  height: number
): Promise<string> => {
  const inputPath = path.join(fullDir, filename);
  const outputPath = path.join(
    thumbsDir,
    getImageName(filename, width, height)
  );

  if (!fs.existsSync(inputPath)) {
    return "";
  }

  if (fs.existsSync(outputPath)) {
    return outputPath;
  }

  try {
    await sharp(inputPath).resize(width, height).toFile(outputPath);
    return outputPath;
  } catch (error) {
    console.error(`Error processing image: ${error}`);
    throw new Error("Failed to process the image");
  }
};

export const getImageName = (
  filename: string,
  width: number,
  height: number
) => {
  return `${filename}-${width}x${height}.jpg`;
};
