import { SdkError } from './error';

interface WidgetOptions {
  baseUrl?: string;
  frameHeight?: number;
  frameWidth?: number;
  locale?: string;
  token?: string;
  theme: string;
  type?: string;
}

export default class WidgetSdk {
  private readonly options: WidgetOptions;

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
      theme: 'default',
    };

    this.options = Object.assign(defaults, options);
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
  }
}

window.WidgetSdk = WidgetSdk;
console.info('WidgetSdk loaded');
