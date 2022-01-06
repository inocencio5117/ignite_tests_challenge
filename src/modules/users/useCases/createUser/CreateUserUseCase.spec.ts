import { InMemoryUsersRepository } from "@modules/users/repositories/in-memory/InMemoryUsersRepository";
import { CreateUserError } from "./CreateUserError";
import { CreateUserUseCase } from "./CreateUserUseCase";

let createUserUseCase: CreateUserUseCase;
let usersRepositoryInMemory: InMemoryUsersRepository;

describe("Create user", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new InMemoryUsersRepository();
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
  });

  it("Should be able to create a new user", async () => {
    const user = await createUserUseCase.execute({
      email: "email@example.com",
      name: "example",
      password: "password",
    });

    expect(user).toHaveProperty("id");
  });

  it("Should not be able to create an user that already exists", () => {
    expect(async () => {
      await createUserUseCase.execute({
        email: "email@example.com",
        name: "example",
        password: "password",
      });

      await createUserUseCase.execute({
        email: "email@example.com",
        name: "example",
        password: "password",
      });
    }).rejects.toBeInstanceOf(CreateUserError);
  });
});
