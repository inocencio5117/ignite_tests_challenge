import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateTransferUseCase } from "./CreateTransferUseCase";

enum OperationType {
  DEPOSIT = "deposit",
  WITHDRAW = "withdraw",
  TRANSFER = "transfer",
}

class CreateTransferController {
  async execute(request: Request, response: Response) {
    const { id: sender_id } = request.user;
    const { receiver_id } = request.params;
    const { amount, description } = request.body;

    const splittedPath = request.originalUrl.split("/");
    const type = splittedPath[splittedPath.length - 2] as OperationType;

    const transferUseCase = container.resolve(CreateTransferUseCase);

    const transfer = await transferUseCase.execute({
      user_id: receiver_id,
      amount,
      description,
      sender_id,
      type,
    });

    return response.status(201).json(transfer);
  }
}

export { CreateTransferController };
