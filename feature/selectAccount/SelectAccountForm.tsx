"use client";

import { Button, Form, Radio, RadioGroup, Skeleton } from "@heroui/react";
import { useQuery } from "@tanstack/react-query";
import { loadAccountsList } from "@/feature/selectAccount/action";
import { Account } from "@/domain/account";
import { useState } from "react";
import useAccountsStore from "@/feature/selectAccount/accountsStore";
import { useRouter } from "next/navigation";
import getDashboardLink from "@/feature/selectMarketplace/getDashboardLink";

export default function SelectAccountForm() {
  const query = useQuery({
    queryKey: ["accountsList"],
    queryFn: loadAccountsList,
  });
  const [account, setAccount] = useState<Account | null>(null);
  const { setSelectedAccount } = useAccountsStore((state) => state);
  const router = useRouter();

  function select(id: number) {
    const acc = query.data?.find((item) => item.id === id) || null;
    setAccount(acc);
  }
  function onContinue() {
    if (account) {
      setSelectedAccount(account);
      router.push(getDashboardLink(account));
    }
  }

  return (
    <div className="p-6 w-68 bg-white border border-slate-200 rounded-xl ">
      <h3 className="text-lg font-semibold">Выберите кабинет</h3>
      <p className="text-sm font-normal">Вам доступны следующие аккаунты</p>
      {query.isLoading && (
        <div className="space-y-3">
          <Skeleton className="w-3/5 rounded-lg">
            <div className="h-3 w-3/5 rounded-lg bg-default-200" />
          </Skeleton>
          <Skeleton className="w-4/5 rounded-lg">
            <div className="h-3 w-4/5 rounded-lg bg-default-200" />
          </Skeleton>
          <Skeleton className="w-2/5 rounded-lg">
            <div className="h-3 w-2/5 rounded-lg bg-default-300" />
          </Skeleton>
        </div>
      )}
      {query.error && <div>{query.error.message}</div>}
      {query.data && (
        <Form>
          <RadioGroup>
            {query.data.map((item: Account) => (
              <Radio
                onChange={() => select(item.id)}
                key={item.id}
                value={item.id.toString(10)}
              >
                {item.name}
              </Radio>
            ))}
          </RadioGroup>
          <Button disabled={!account} onPress={onContinue}>
            Продолжить
          </Button>
        </Form>
      )}
    </div>
  );
}
