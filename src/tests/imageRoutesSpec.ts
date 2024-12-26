import supertest from "supertest";
import app from "../index";

const request = supertest(app);

describe("Image API Endpoints", () => {
  it("should return 400 if parameters are missing", async () => {
    const response = await request.get("/api/images");
    expect(response.status).toBe(400);
    expect(response.text).toBe(
      "filename, width, and height are required parameters"
    );
  });

  it("should return 404 if the source image does not exist", async () => {
    const response = await request.get(
      "/api/images?filename=non-existing.jpg&width=200&height=100"
    );
    expect(response.status).toBe(404);
    expect(response.text).toBe("Source image not found!");
  });

  it("should return the resized image for valid parameters", async () => {
    const response = await request.get(
      "/api/images?filename=cat.jpg&width=200&height=100"
    );
    expect(response.status).toBe(200);
    expect(response.headers["content-type"]).toContain("image");
  });
});
