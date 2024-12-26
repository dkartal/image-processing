import fs from "fs";
import { resizeImage, getImageName } from "../services/imageService";

const testFullImage = "cat.jpg"; // Ensure this image exists in the full images folder
const testWidth = 200;
const testHeight = 100;
const thumbsDir = "src/tests/assets/thumbs";

describe("Image Resizing Service", () => {
  it("should generate the correct image name", () => {
    const imageName = getImageName(testFullImage, testWidth, testHeight);
    expect(imageName).toBe("cat.jpg-200x100.jpg");
  });

  it("should resize an image and save it to the thumbs directory", async () => {
    const outputPath = await resizeImage(testFullImage, testWidth, testHeight);
    expect(outputPath).toContain(thumbsDir);
    expect(fs.existsSync(outputPath)).toBeTrue();

    // Cleanup: Remove the test image from the thumbs directory
    fs.unlinkSync(outputPath);
  });

  it("should return an empty string if the source image does not exist", async () => {
    const outputPath = await resizeImage(
      "not-existing.jpg",
      testWidth,
      testHeight
    );
    expect(outputPath).toBe("");
  });
});
