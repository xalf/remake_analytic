import { Account, MarketplaceCode } from "@/domain/account";

export default function getDashboardLink(
  account: Account,
  marketplaceCode?: MarketplaceCode,
) {
  if (
    marketplaceCode &&
    account.marketplace_codes.find((item) => item === marketplaceCode)
  ) {
    return `/dashboard/${marketplaceCode}`;
  } else {
    return `/dashboard/${account.marketplace_codes[0]}`;
  }
}
