import { AccessToken, IAuthStrategy, SdkConfiguration } from "@spotify/web-api-ts-sdk";
import { cookies } from "next/headers";

export class MixAuthStrategy implements IAuthStrategy {
  private configuration: SdkConfiguration | null = null;

  constructor(
    private clientId: string,
    private secret: string,
    private scopes: string[] = []
  ) {
  }

  public setConfiguration(configuration: SdkConfiguration): void {
    this.configuration = configuration;
  }

  public async getOrCreateAccessToken(): Promise<AccessToken> {
    const token = await this.getAccessToken();
    if (token) {
      return token;
    }

    return this.getClientToken();
  }

  public async getAccessToken(): Promise<AccessToken | null> {
    const access_token = this.getUserToken();
    if (access_token) {
      return {
        access_token,
        token_type: "Bearer",
        expires_in: 3600,
        refresh_token: ""
      }
    }
    return null;
  }

  public removeAccessToken(): void {
    throw new Error("Method not implemented.");
  }

  private getUserToken(): string | undefined {
    const token = cookies().get("token");
    return token?.value;
  }

  private async getClientToken(): Promise<AccessToken> {
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        'Authorization': 'Basic ' + Buffer.from(this.clientId + ':' + this.secret).toString("base64"),
      },
      body: new URLSearchParams({
        grant_type: 'client_credentials'
      }),
      next: { revalidate: 3600 }
    });

    const token = await response.json();
    return token as AccessToken;
  }

}