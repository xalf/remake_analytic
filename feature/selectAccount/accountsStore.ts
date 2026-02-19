"use client";

import { Account } from "@/domain/account";
import { create } from "zustand";

export interface IAccountsStore {
  sellectedAccount: Account | null;
  setSelectedAccount: (account: Account) => void;
}

const useAccountsStore = create<IAccountsStore>((set) => ({
  sellectedAccount: null,
  setSelectedAccount: (account: Account) =>
    set(() => ({ sellectedAccount: account })),
}));

export default useAccountsStore;
