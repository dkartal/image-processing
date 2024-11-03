import fs from "fs";
import path from "path";
import { getImageName, resizeImage } from "../../services/imageService";

describe("Image Processing Service", () => {
  const filename = "lion";
  const width = 100;
  const height = 100;
  const imageName = getImageName(filename, width, height);
  const thumbsDir = path.join(__dirname, "../../assets/thumbs");
  const outputFile = path.join(thumbsDir, imageName);

  beforeAll(() => {
    if (!fs.existsSync(thumbsDir)) {
      fs.mkdirSync(thumbsDir);
    }
  });

  afterAll(() => {
    if (fs.existsSync(outputFile)) {
      fs.unlinkSync(outputFile);
    }
  });

  it("should throw an error if the source image does not exist", async () => {
    await expectAsync(
      resizeImage("nonexistent.jpg", 100, 100)
    ).toBeRejectedWithError();
  });

  it("should resize an image and save it to thumbs directory", async () => {
    await resizeImage(filename, width, height);
    expect(fs.existsSync(outputFile)).toBe(true);
  });

  it("should retrieve an existing resized image without recreating it", async () => {
    await resizeImage(filename, width, height);
    const mtimeBefore = fs.statSync(outputFile).mtime;

    await resizeImage(filename, width, height);
    const mtimeAfter = fs.statSync(outputFile).mtime;

    expect(mtimeBefore).toEqual(mtimeAfter);
  });
});
