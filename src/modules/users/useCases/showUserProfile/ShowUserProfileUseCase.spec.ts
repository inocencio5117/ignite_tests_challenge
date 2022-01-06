import { InMemoryUsersRepository } from "@modules/users/repositories/in-memory/InMemoryUsersRepository";
import { ShowUserProfileUseCase } from "./ShowUserProfileUseCase";
import { CreateUserUseCase } from "@modules/users/useCases/createUser/CreateUserUseCase";
import { ShowUserProfileError } from "./ShowUserProfileError";

let inMemoryUsersRepository: InMemoryUsersRepository;
let showUserProfileUseCase: ShowUserProfileUseCase;
let createUserUseCase: CreateUserUseCase;

describe("Show user profile", () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    createUserUseCase = new CreateUserUseCase(inMemoryUsersRepository);
    showUserProfileUseCase = new ShowUserProfileUseCase(
      inMemoryUsersRepository
    );
  });

  it("Should be able to show user profile", async () => {
    const user = await createUserUseCase.execute({
      email: "email@example.com",
      name: "example",
      password: "password",
    });

    const result = await showUserProfileUseCase.execute(user.id);

    expect(result).toHaveProperty("id");
  });

  it("Should not be able to show a user that dont exists", () => {
    expect(async () => {
      await showUserProfileUseCase.execute("12345");
    }).rejects.toBeInstanceOf(ShowUserProfileError);
  });
});
