import { AppError } from "../../../../shared/errors/AppError";

export class TransferError extends AppError {
  constructor() {
    super("Unable to transfer due to insufficient account balance", 400);
  }
}
