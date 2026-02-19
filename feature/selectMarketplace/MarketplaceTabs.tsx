"use client";

import { getMarketplaceLabel, MarketplaceCode } from "@/domain/account";
import { Tab, Tabs } from "@heroui/react";
import { useParams, useRouter } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import getDashboardLink from "./getDashboardLink";
import useAccountsStore from "../selectAccount/accountsStore";

const allTabs = [
  {
    id: MarketplaceCode.WB,
  },
  {
    id: MarketplaceCode.OZON,
  },
];

export default function MarketplaceTabs() {
  const { marketplace } = useParams();
  const router = useRouter();
  const account = useAccountsStore((store) => store.sellectedAccount);
  const [selected, setSelected] = useState<MarketplaceCode>(
    marketplace as MarketplaceCode,
  );

  const tabs = useMemo(() => {
    return account
      ? allTabs.filter((tab) => account.marketplace_codes.includes(tab.id))
      : [];
  }, [account]);

  const onSelectionChange = useCallback(
    (value: string | number) => {
      if (account) {
        setSelected(value as MarketplaceCode);
        router.push(getDashboardLink(account, value as MarketplaceCode));
      }
    },
    [router, account],
  );

  if (!account) {
    return;
  }

  return (
    <Tabs
      aria-label="Marketplace tabs"
      items={tabs}
      selectedKey={selected}
      onSelectionChange={onSelectionChange}
    >
      {(item) => <Tab key={item.id} title={getMarketplaceLabel(item.id)} />}
    </Tabs>
  );
}
