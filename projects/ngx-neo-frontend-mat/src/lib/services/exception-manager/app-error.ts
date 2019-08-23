export class AppError extends Error {

  handled = false;

  constructor(message?: string, public status?: number | null) {
      super(message);
      this.name = AppError.name;
      Object.setPrototypeOf(this, AppError.prototype);
  }

}
