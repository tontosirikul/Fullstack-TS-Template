import supertest from "supertest";
import app from "../../index";
import { User } from "../../models/User";
import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const request = supertest(app);

describe("🏁 testing endpoint (User)", () => {
  const mockUser_1: User = {
    email: "John@mail.com",
    username: "John",
    password: "17",
  };
  const mockUser_2: User = {
    email: "Jane@mail.com",
    username: "Jane",
    password: "17",
  };
  const mockUnknow: User = {
    email: "Jone@mail.com",
    username: "Jone",
    password: "200",
  };
  let token: string;
  it("should create mockUser", async () => {
    const response = await request.post("/users").send(mockUser_1).expect(200);
    token = response.body.userwithtoken;
    const granted = jwt.verify(
      token,
      process.env.TOKEN_SECRET as jwt.Secret
    ) as JwtPayload;
    expect(granted.user.username).toEqual("John");
  });
  it("should get all user (only John)", async () => {
    const response = await request
      .get("/users")
      .expect(200)
      .set("Authorization", "bearer " + token);
    expect(response.body.length).toEqual(1);
  });
  it("should acknowledge mockUser_1 (John)", async () => {
    const response = await request
      .post("/users/auth")
      .send(mockUser_1)
      .expect(200);
    token = response.body.userwithtoken;
    const granted = jwt.verify(
      token,
      process.env.TOKEN_SECRET as jwt.Secret
    ) as JwtPayload;
    expect(granted.user.username).toEqual("John");
  });
  it("should not acknowledge mockUnknow", async () => {
    const response = await request.post("/users/auth").send(mockUnknow);
    expect(response.status).toBe(401);
  });
  it("should get mockUser_1 with username John", async () => {
    const response = await request
      .get("/users/1")
      .set("Authorization", "bearer " + token);
    expect(response.body.username).toEqual("John");
  });
  it("should edit mockUser_1 (John) to be mockUser_2 (Jane)", async () => {
    const response = await request
      .put("/users/1")
      .send(mockUser_2)
      .set("Authorization", "bearer " + token);
    expect(response.body.username).toEqual("Jane");
  });
  it("should delete mockUser_1 (John has been edited to Jane)", async () => {
    const response = await request
      .delete("/users/1")
      .set("Authorization", "bearer " + token);
    expect(response.body.username).toEqual("Jane");
  });
});
