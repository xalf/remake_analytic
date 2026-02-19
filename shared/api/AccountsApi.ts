import { Account } from "@/domain/account";
import IAccountsApi from "@/feature/selectAccount/IAccountsApi";
import { cookies } from "next/headers";

export default class AccountsApi implements IAccountsApi {
  baseUrl: string;

  constructor() {
    if (!process.env.NUXT_BACKEND_BASE_URL)
      throw new Error("set NUXT_BACKEND_BASE_URL env");
    this.baseUrl = process.env.NUXT_BACKEND_BASE_URL;
  }

  async getUserAccounts(): Promise<Account[]> {
    try {
      const cookieStore = await cookies();
      const token = cookieStore.get("X_ACCESS_TOKEN")?.value;

      const response = await fetch(this.baseUrl + "/api/v1/accounts", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "BEARER " + token,
        },
      });
      const json = await response.json();
      return json.data as Account[];
    } catch (e: unknown) {
      console.error("get accounts api error", e);
      throw new Error("get accounts api error");
    }
  }
}
