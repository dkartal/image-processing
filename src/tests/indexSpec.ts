import { app } from "../index";
import supertest from "supertest";

const request = supertest(app);

describe("Test index.js", () => {
  it("gets the api endpoint", async () => {
    const response = await request.get("/api");
    expect(response.status).toBe(200);
    expect(response.text).toEqual("hello");
  });
});
