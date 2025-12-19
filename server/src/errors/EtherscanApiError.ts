export class EtherscanApiError extends Error {
  constructor(message: string, public statusCode: number = 502) {
    super(message);
    this.name = "EtherscanApiError";

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, EtherscanApiError);
    }
  }

  toJSON() {
    return {
      statusCode: this.statusCode,
      message: this.message,
    };
  }
}
