export class ServiceUnavailableError extends Error {
  public statusCode = 503;

  constructor(message: string) {
    super(message);
    this.name = "ServiceUnavailableError";

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ServiceUnavailableError);
    }
  }

  toJSON() {
    return {
      statusCode: this.statusCode,
      message: this.message,
    };
  }
}
