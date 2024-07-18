export class FramebusError extends Error {
  constructor(message: string, options?: ErrorOptions) {
    super(message, options);

    this.message = `Framebus: ${message}`;
    this.name = 'FramebusError';
  }
}
