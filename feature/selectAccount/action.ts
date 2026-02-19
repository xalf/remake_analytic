"use server";

import { Account } from "@/domain/account";
import AccountsApi from "@/shared/api/AccountsApi";

export async function loadAccountsList(): Promise<Account[]> {
  const api = new AccountsApi();

  return await api.getUserAccounts();
}
