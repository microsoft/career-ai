import { Telemetry } from "./Telemetry";

export type HttpResponse<T> = {
  ok: boolean;
  data: T | null;
};

export class Http {
  private static instance: Http;
  private readonly base_url: string;
  private readonly default_header: { [key: string]: string };
  private readonly telemetry: Telemetry;

  private constructor(
    base_url: string,
    default_header = { "Content-Type": "application/json" }
  ) {
    this.base_url = base_url;
    this.default_header = {
      ...default_header,
      "x-correlation-id": Telemetry.getInstance().getCorrelationId(),
    };
    this.telemetry = Telemetry.getInstance();
  }

  public static getInstance(): Http {
    if (!Http.instance) {
      Http.instance = new Http(
        process.env.REACT_APP_API_BASE || window.document.location.origin
      );
    }

    return Http.instance;
  }

  public async get<T>(url: string): Promise<HttpResponse<T>> {
    const response = await fetch(`${this.base_url}${url}`, {
      headers: this.default_header,
    });

    return this.createResponse(response);
  }

  public async post<T>(url: string, body: unknown): Promise<HttpResponse<T>> {
    const response = await fetch(`${this.base_url}${url}`, {
      method: "post",
      body: JSON.stringify(body),
      headers: this.default_header,
    });

    return this.createResponse(response);
  }

  private async createResponse<T>(
    response: Response
  ): Promise<HttpResponse<T>> {
    return {
      ok: response.ok,
      data: await (response.status !== 204 ? response.json() : {}),
    };
  }
}
