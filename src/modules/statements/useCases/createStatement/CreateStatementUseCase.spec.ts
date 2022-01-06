import { InMemoryUsersRepository } from "../../../users/repositories/in-memory/InMemoryUsersRepository";
import { InMemoryStatementsRepository } from "../../repositories/in-memory/InMemoryStatementsRepository";
import { CreateStatementError } from "./CreateStatementError";
import { CreateStatementUseCase } from "./CreateStatementUseCase";

let inMemoryUsersRepository: InMemoryUsersRepository;
let statementsRepositoryInMemory: InMemoryStatementsRepository;
let createStatementUseCase: CreateStatementUseCase;

describe("Create statement", () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    statementsRepositoryInMemory = new InMemoryStatementsRepository();
    createStatementUseCase = new CreateStatementUseCase(
      inMemoryUsersRepository,
      statementsRepositoryInMemory
    );
  });

  it("Should be able to return all the statements", async () => {
    enum OperationType {
      DEPOSIT = "deposit",
      WITHDRAW = "withdraw",
    }

    const user = await inMemoryUsersRepository.create({
      email: "email@example.com",
      name: "example",
      password: "password",
    });

    const statements = await createStatementUseCase.execute({
      user_id: (await user).id,
      type: OperationType.DEPOSIT,
      amount: 100,
      description: "Description",
    });

    console.log(statements);

    expect(statements).toHaveProperty("id");
  });
});
