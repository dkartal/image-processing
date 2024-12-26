import { Request, Response } from "express";
import { getImage } from "../controllers/imageController";

describe("Image Controller", () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let statusSpy: jasmine.Spy;
  let sendSpy: jasmine.Spy;

  beforeEach(() => {
    sendSpy = jasmine.createSpy("send");
    statusSpy = jasmine.createSpy("status").and.returnValue({ send: sendSpy });
    mockResponse = {
      status: statusSpy
    };
  });

  it("should return 400 if required parameters are missing", async () => {
    mockRequest = { query: {} };

    await getImage(mockRequest as Request, mockResponse as Response);

    expect(statusSpy).toHaveBeenCalledWith(400);
    expect(sendSpy).toHaveBeenCalledWith(
      "filename, width, and height are required parameters"
    );
  });

  it("should return 404 if the source image does not exist", async () => {
    mockRequest = {
      query: { filename: "nonexistent.jpg", width: "200", height: "100" }
    };

    await getImage(mockRequest as Request, mockResponse as Response);

    expect(statusSpy).toHaveBeenCalledWith(404);
    expect(sendSpy).toHaveBeenCalledWith("Source image not found!");
  });
});
