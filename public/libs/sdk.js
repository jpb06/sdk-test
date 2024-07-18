"use strict";
(() => {
  // src/sdk/error.ts
  var SdkError = class extends Error {
    constructor(message, options) {
      super(message, options);
      this.message = `SDK: ${message}`;
      this.name = "SDKError";
    }
  };

  // src/sdk/sdk.ts
  var WidgetSdk = class {
    options;
    constructor(options) {
      if (options.token === void 0) {
        throw new SdkError("The `token` parameter is missing.");
      }
      if (options.type === void 0) {
        throw new SdkError("The `type` parameter is missing.");
      }
      const defaults = {
        baseUrl: "http://localhost:3000",
        frameHeight: 600,
        frameWidth: 900,
        locale: "fr",
        theme: "default"
      };
      this.options = Object.assign(defaults, options);
    }
    init(elementId) {
      const element = document.querySelector(`#${elementId}`);
      if (element === null) {
        throw new SdkError(`Cannot find an element with id: ${elementId}.`);
      }
      const { baseUrl, frameHeight, frameWidth, theme, type } = this.options;
      const frame = document.createElement("iframe");
      frame.height = String(frameHeight);
      frame.src = `${baseUrl}/widgets/${type}?theme=${theme}`;
      frame.width = String(frameWidth);
      element.replaceChildren(frame);
    }
  };
  window.WidgetSdk = WidgetSdk;
  console.info("WidgetSdk loaded");
})();
