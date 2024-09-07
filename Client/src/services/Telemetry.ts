export class Telemetry {
  private static instance: Telemetry;

  private constructor() {}

  public static getInstance(): Telemetry {
    if (!Telemetry.instance) {
      Telemetry.instance = new Telemetry();
    }

    return Telemetry.instance;
  }
}
