"use client";

import {
  Dropdown,
  DropdownTrigger,
  Button,
  DropdownMenu,
  DropdownItem,
  SharedSelection,
} from "@heroui/react";
import { useQuery } from "@tanstack/react-query";
import { useCallback } from "react";
import { loadAccountsList } from "@/feature/selectAccount/action";
import useAccountsStore from "@/feature/selectAccount/accountsStore";

export default function SelectAccountDropdown() {
  const query = useQuery({
    queryKey: ["accountsList"],
    queryFn: loadAccountsList,
  });
  const { setSelectedAccount, sellectedAccount } = useAccountsStore(
    (state) => state,
  );

  const onSelectionChange = useCallback(
    (selected: SharedSelection) => {
      const account = query.data?.find(
        (item) => item.id.toString() === selected.currentKey,
      );
      if (account) setSelectedAccount(account);
    },
    [setSelectedAccount, query.data],
  );

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button
          className="capitalize"
          variant="bordered"
          isLoading={query.isLoading}
        >
          {sellectedAccount?.name}
        </Button>
      </DropdownTrigger>
      {query.data && (
        <DropdownMenu
          disallowEmptySelection
          aria-label="Single selection example"
          selectedKeys={sellectedAccount ? [sellectedAccount.id] : []}
          selectionMode="single"
          variant="flat"
          onSelectionChange={onSelectionChange}
        >
          {query.data.map((item) => (
            <DropdownItem key={item.id}>{item.name}</DropdownItem>
          ))}
        </DropdownMenu>
      )}
    </Dropdown>
  );
}
