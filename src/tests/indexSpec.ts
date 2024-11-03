import path from "path";
import app from "../index";
import supertest from "supertest";
import fs from "fs";
import { getImageName } from "../services/imageService";

const request = supertest(app);

describe("Testing index.js", () => {
  describe("GET /api/images", () => {
    const filename = "lion";
    const width = 100;
    const height = 100;
    const imageName = getImageName(filename, width, height);
    const thumbsDir = path.resolve(__dirname, "../../assets/thumbs");
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

    it("should return 400 if required parameters are missing", async () => {
      const response = await request.get("/api/images");
      expect(response.status).toBe(400);
    });

    it("should return 404 if the source image does not exist", async () => {
      const response = await request.get(
        "/api/images?filename=nonexistent.jpg&width=100&height=100"
      );
      expect(response.status).toBe(404);
    });

    it("should resize the image and return it if parameters are valid", async () => {
      const response = await request.get(
        `/api/images?filename=${filename}&width=${width}&height=${height}`
      );
      expect(response.status).toBe(200);
      expect(response.headers["content-type"]).toBe("image/jpeg");
      expect(fs.existsSync(outputFile)).toBe(true);
    });

    it("should use the cached image if it already exists", async () => {
      await request.get(
        `/api/images?filename=${filename}&width=${width}&height=${height}`
      );
      const mtimeBefore = fs.statSync(outputFile).mtime;

      const response = await request.get(
        `/api/images?filename=${filename}&width=${width}&height=${height}`
      );
      expect(response.status).toBe(200);
      expect(response.headers["content-type"]).toBe("image/jpeg");

      const mtimeAfter = fs.statSync(outputFile).mtime;
      expect(mtimeBefore).toEqual(mtimeAfter);
    });
  });
});
