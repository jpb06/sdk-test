export class SdkError extends Error {
  constructor(message: string, options?: ErrorOptions) {
    super(message, options);

    this.message = `SDK: ${message}`;
    this.name = 'SDKError';
  }
}
