import { describe, test, expect } from "vitest";
import { User } from "../user.entity";

describe("User entity", () => {
  test("should be able to create a new user", async () => {
    const userTest = User.create({
      name: "Jhon",
      lastname: "Doe",
      email: "jhon.doe@email.com",
      birthday: new Date("1999-05-03"),
      password: "123123",
    });

    expect(userTest).toHaveProperty("id");
  });
});
