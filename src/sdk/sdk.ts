import { SdkError } from './error';
import type {
  FramebusEventListener,
  FramebusEventName,
  FramebusEventPayload,
} from './framebus';
import { Framebus } from './framebus';

type WidgetOptions = {
  baseUrl?: string;
  frameHeight?: number;
  frameWidth?: number;
  locale?: string;
  token?: string;
  theme: string;
  type?: string;
};

export default class WidgetSdk {
  private options: WidgetOptions;
  private framebus: Framebus;

  public constructor(options: WidgetOptions) {
    if (options.token === undefined) {
      throw new SdkError('The `token` parameter is missing.');
    }
    if (options.type === undefined) {
      throw new SdkError('The `type` parameter is missing.');
    }

    const defaults = {
      baseUrl: 'http://localhost:3000',
      frameHeight: 600,
      frameWidth: 900,
      locale: 'fr',
      theme: 'light',
    };

    this.options = Object.assign(defaults, options);
    this.framebus = new Framebus();
  }

  public init(elementId: string) {
    const element = document.querySelector(`#${elementId}`);
    if (element === null) {
      throw new SdkError(`Cannot find an element with id: ${elementId}.`);
    }

    const { baseUrl, frameHeight, frameWidth, theme, type } = this.options;

    const frame = document.createElement('iframe');

    frame.height = String(frameHeight);
    frame.src = `${baseUrl}/widgets/${type}?theme=${theme}`;
    frame.width = String(frameWidth);

    element.replaceChildren(frame);

    this.framebus.connect(frame, window.origin);
  }

  public on<TEventName extends FramebusEventName>(
    eventName: TEventName,
    listener: FramebusEventListener<TEventName>,
  ) {
    this.framebus.on(eventName, listener);
  }

  public emit<TEventName extends FramebusEventName>(
    eventName: TEventName,
    payload: FramebusEventPayload<TEventName>,
  ) {
    if (!this.framebus.isConnected) {
      throw new SdkError(
        'Cannot use the `emit()` method because the widget frame has not been initialized.',
      );
    }

    this.framebus.emit(eventName, payload);
  }
}

//window.WidgetSdk = WidgetSdk;
console.info('WidgetSdk loaded');
