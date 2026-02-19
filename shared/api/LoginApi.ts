import { AuthLoginQuery, AuthResponse, AuthRefreshQuery } from "@/domain/auth";
import { User } from "@/domain/user";
import ILoginApi from "@/feature/login/ILoginApi";
import { cookies } from "next/headers";

export default class LoginApi implements ILoginApi {
  baseUrl: string;

  constructor() {
    if (!process.env.NUXT_BACKEND_BASE_URL)
      throw new Error("set NUXT_BACKEND_BASE_URL env");
    this.baseUrl = process.env.NUXT_BACKEND_BASE_URL;
  }
  async getUser(): Promise<User> {
    try {
      const cookieStore = await cookies();
      const token = cookieStore.get("X_ACCESS_TOKEN")?.value;

      const response = await fetch(this.baseUrl + "/api/v1/auth/me", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "BEARER " + token,
        },
      });
      const json = await response.json();
      return json.data as User;
    } catch (e: unknown) {
      console.error("get user api error", e);
      throw new Error("get user api error");
    }
  }
  async login(query: AuthLoginQuery): Promise<AuthResponse> {
    try {
      const response = await fetch(this.baseUrl + "/api/v1/auth/login", {
        method: "POST",
        body: JSON.stringify(query),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const json = await response.json();
      return json.data as AuthResponse;
    } catch (e: unknown) {
      console.error("login api error", e);
      throw new Error("login api error");
    }
  }
  async refresh(query: AuthRefreshQuery): Promise<AuthResponse> {
    try {
      const response = await fetch(this.baseUrl + "/api/v1/auth/refresh", {
        method: "POST",
        body: JSON.stringify(query),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const json = await response.json();
      return json.data as AuthResponse;
    } catch (e: unknown) {
      console.error("refresh api error", e);
      throw new Error("refresh api error");
    }
  }
}
