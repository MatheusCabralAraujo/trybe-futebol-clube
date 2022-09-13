export default class ValidationsError extends Error {
  public status: number;
  public message: string;

  constructor(status: number, message: string) {
    super();
    this.message = message;
    this.status = status;
  }
}
