'use client';

import { Account } from '@/domain/account';
import { create } from 'zustand'

const accountsStore = create((set) => ({
    sellectedAccount: null,
    setSelectedAccount: (account: Account) => set(() => ({ sellectedAccount: account })),
}));

export default accountsStore;