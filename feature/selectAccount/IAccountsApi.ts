import { Account } from "@/domain/account";

export default interface IAccountsApi {
  getUserAccounts(): Promise<Account[]>;
}
