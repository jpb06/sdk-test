import { FramebusError } from './error';
import { events } from './events';
import type {
  FramebusEventListener,
  FramebusEventName,
  FramebusEventPayload,
} from './types';

/**
 * Class for handling a message bus that operates across iframes.
 * Author: https://github.com/fseglard
 */
export class Framebus {
  /**
   * Indicates if the Framebus instance is connected.
   */
  public isConnected = false;

  /**
   * A map of event names to their listeners.
   *
   * @private
   */
  private listeners = new Map<FramebusEventName, FramebusEventListener[]>();

  /**
   * The origin for postMessage communication.
   *
   * @private
   */
  private origin = '*';

  /**
   * The target window for postMessage communication.
   *
   * @private
   */
  private targetWindow: Window | null = null;

  /**
   * Creates an instance of Framebus.
   */
  public constructor() {
    this.handleMessage = this.handleMessage.bind(this);
  }

  /**
   * Connects the Framebus instance to a frame and sets up event listeners.
   *
   * @param frame - The iframe to connect to.
   * @param origin - The origin for postMessage communication.
   */
  public connect(frame?: HTMLIFrameElement, origin = '*') {
    this.disconnect();

    this.isConnected = true;
    this.origin = origin;
    this.targetWindow = frame ? frame.contentWindow : window.parent;

    window.addEventListener('message', this.handleMessage);
  }

  /**
   * Disconnects the Framebus instance and removes event listeners.
   */
  public disconnect() {
    this.isConnected = false;
    this.origin = '*';
    this.targetWindow = null;

    window.removeEventListener('message', this.handleMessage);
  }

  /**
   * Registers an event listener for a specific event name.
   *
   * @param eventName - The name of the event.
   * @param listener - The event handler function.
   */
  public on<TEventName extends FramebusEventName>(
    eventName: TEventName,
    listener: FramebusEventListener<TEventName>,
  ): void {
    const listeners = this.getEventListeners(eventName);

    listeners.push(listener);

    // FIXME: Avoid the assertion.
    this.listeners.set(eventName, listeners as FramebusEventListener[]);
  }

  /**
   * Unregisters an event listener for a specific event name.
   *
   * Note: If no listener is provided, all the existing listeners will be removed.
   *
   * @param eventName - The name of the event.
   * @param listener - The event handler function to remove.
   */
  public off<TEventName extends FramebusEventName>(
    eventName: TEventName,
    listener?: FramebusEventListener<TEventName>,
  ): void {
    const listeners = this.getEventListeners(eventName);

    if (listeners.length === 0) {
      return;
    }

    if (listener === undefined) {
      this.listeners.set(eventName, []);
      return;
    }

    const index = listeners.indexOf(listener);

    if (index > -1) {
      listeners.splice(index, 1);
      // FIXME: Avoid the assertion.
      this.listeners.set(eventName, listeners as FramebusEventListener[]);
    }
  }

  /**
   * Sends a message to the connected iframe or parent window.
   *
   * @param eventName - The name of the event.
   * @param payload - The payload to emit with the message.
   * @throws {FramebusError} If the framebus is not connected or the target window is null.
   */
  public emit<TEventName extends FramebusEventName>(
    eventName: TEventName,
    payload?: FramebusEventPayload<TEventName>,
  ) {
    if (!this.isConnected) {
      throw new FramebusError('The framebus is not connected');
    }

    if (!this.targetWindow) {
      throw new FramebusError('The target window is null');
    }

    const message = {
      type: eventName,
      payload: this.parsePayload(eventName, payload),
    };

    this.targetWindow.postMessage(message, '*'); //this.origin);
  }

  /**
   * Sends a message and registers a handler to listen for the response.
   *
   * @param eventName - The name of the event.
   * @param listener - The handler function for the response.
   * @param payload - The payload to emit with the message.
   * @param runOnce - Whether to remove the handler after the first response.
   */
  public fetch<TEventName extends FramebusEventName>(
    eventName: TEventName,
    listener: FramebusEventListener<TEventName>,
    payload?: FramebusEventPayload<TEventName>,
    runOnce = false,
  ) {
    const internalListener: FramebusEventListener = (payload) => {
      if (runOnce) {
        this.off(eventName, internalListener);
      }

      listener(payload);
    };

    this.on(eventName, internalListener);
    this.emit(eventName, payload);
  }

  /**
   * Registers a handler to respond to events with the specified type.
   *
   * @param eventName - The name of the event.
   * @param callback - The callback function to generate the payload.
   * @param runOnce - Whether to remove the handler after the first response.
   */
  public respond<TEventName extends FramebusEventName>(
    eventName: TEventName,
    callback: () =>
      | FramebusEventPayload<TEventName>
      | Promise<FramebusEventPayload<TEventName>>,
    runOnce = false,
  ) {
    const internalListener = async () => {
      if (runOnce) {
        this.off(eventName, internalListener);
      }

      const payload = await callback();

      this.emit(eventName, this.parsePayload(eventName, payload));
    };

    this.on(eventName, internalListener);
  }

  /**
   * Destroys the Framebus instance, disconnecting it and removing all event listeners.
   */
  public destroy() {
    this.disconnect();

    this.listeners.clear();
  }

  /**
   * Triggers an event, invoking all registered listeners for the event.
   *
   * @private
   * @param eventName - The name of the event.
   * @param payload - The payload to pass to the event listeners.
   */
  private trigger<TEventName extends FramebusEventName>(
    eventName: TEventName,
    payload?: FramebusEventPayload<TEventName>,
  ) {
    const listeners = this.getEventListeners(eventName);

    if (listeners.length === 0) {
      return;
    }

    for (const listener of listeners) {
      listener(payload);
    }
  }

  /**
   * Handles incoming messages and triggers the appropriate event listeners.
   *
   * @private
   * @param message - The message event.
   */
  private handleMessage(message: MessageEvent) {
    if (this.targetWindow !== message.source) {
      return;
    }

    if (!message.data.type) {
      return;
    }

    this.trigger(message.data.type, message.data.payload);
  }

  /**
   * Retrieves the registered event listeners for a specific event.
   *
   * @private
   * @param eventName - The name of the event.
   * @returns The registered event listeners.
   */
  private getEventListeners<TEventName extends FramebusEventName>(
    eventName: TEventName,
  ): FramebusEventListener<TEventName>[] {
    return this.listeners.get(eventName) ?? [];
  }

  /**
   * Checks if the provided event name is valid.
   *
   * @private
   * @param eventName - The name of the event to be checked.
   * @returns `true` if the event name is valid, otherwise `false`.
   */
  private isValidEventName(eventName: unknown): eventName is FramebusEventName {
    if (typeof eventName !== 'string') {
      return false;
    }

    return Object.keys(events).includes(eventName);
  }

  /**
   * Parses the provided payload based on a specific event name.
   *
   * @private
   * @param eventName - The name of the event.
   * @param payload - The payload of the event to be parsed.
   * @returns The parsed payload if it valid.
   * @throws {FramebusError} If the payload is not valid.
   */
  private parsePayload<TEventName extends FramebusEventName>(
    eventName: TEventName,
    payload?: unknown,
  ): FramebusEventPayload<TEventName> {
    if (!this.isValidEventName(eventName)) {
      throw new FramebusError(`This event name is not valid: ${eventName}.`);
    }

    const result = events[eventName].safeParse(payload);

    if (!result.success) {
      throw new FramebusError(
        `The payload format is invalid for the event: ${eventName}`,
      );
    }

    return result.data;
  }
}
