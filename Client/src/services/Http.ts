export class Http {
  private static instance: Http;

  private constructor() {}

  public static getInstance(): Http {
    if (!Http.instance) {
      Http.instance = new Http();
    }

    return Http.instance;
  }

  public async get<T>(url: string): Promise<HttpResponse<T>> {
    const response = await fetch(url);

    if (!response.ok) {
      return { ok: false, data: null };
    }

    return {
      ok: true,
      data: await response.json(),
    };
  }
}

export type HttpResponse<T> = {
  ok: boolean;
  data: T | null;
};
