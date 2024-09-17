import {
  ApplicationInsights,
  ICustomProperties,
} from "@microsoft/applicationinsights-web";

export class Telemetry {
  private static instance: Telemetry;
  private defaultProps: {
    [key: string]: string | boolean | number | undefined;
  };
  private readonly appInsights: ApplicationInsights;

  private constructor() {
    this.defaultProps = {
      correlationId: this.generateCorrelationId(),
      appName: "CareerCraftUI",
      isProduction: process.env.REACT_APP_IS_PRODUCTION,
    };
    this.appInsights = new ApplicationInsights({
      config: {
        instrumentationKey: "ec3e098b-8f7f-4a8d-8cbe-ca2048af3875",
      },
    });
    this.appInsights.loadAppInsights();
  }

  public getCorrelationId(): string {
    return this.defaultProps["correlationId"] as string;
  }

  public static getInstance(): Telemetry {
    if (!Telemetry.instance) {
      Telemetry.instance = new Telemetry();
    }

    return Telemetry.instance;
  }

  public info(message: string, properties: ICustomProperties = {}) {
    this.appInsights.trackTrace({
      message,
      properties: {
        ...this.defaultProps,
        ...properties,
      },
    });
  }

  public event(eventName: string, properties: ICustomProperties = {}) {
    this.appInsights.trackEvent({
      name: eventName,
      properties: {
        ...this.defaultProps,
        ...properties,
      },
    });
  }

  public exception(ex: Error, properties: ICustomProperties = {}) {
    this.appInsights.trackException({
      exception: ex,
      properties: {
        ...this.defaultProps,
        ...properties,
      },
    });
  }

  public startTrackPage(name: string) {
    this.appInsights.startTrackPage(name);
  }

  public stopTrackPage(name: string, properties: ICustomProperties = {}) {
    this.appInsights.stopTrackPage(name, document.location.pathname, {
      ...this.defaultProps,
      ...properties,
    });
  }

  private generateCorrelationId(): string {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
      /[xy]/g,
      function (c) {
        var r = (Math.random() * 16) | 0,
          v = c === "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      }
    );
  }
}
