export class Telemetry {
  private static instance: Telemetry;
  private defaultProps: {
    [key: string]: string | boolean | number | undefined;
  };

  private constructor() {
    this.defaultProps = {
      correlationId: this.generateCorrelationId(),
      appName: "CareerCraftUI",
      isProduction: process.env.REACT_APP_IS_PRODUCTION,
    };
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
