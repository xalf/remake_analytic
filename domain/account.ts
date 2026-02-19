export interface Account {
  id: number;
  name: string;
  marketplace_codes: MarketplaceCode[];
}

export enum MarketplaceCode {
  WB = "WB",
  OZON = "OZON",
}

export function getMarketplaceLabel(marketplaceCode: MarketplaceCode) {
  switch (marketplaceCode) {
    case MarketplaceCode.WB:
      return "Wildberries";
    case MarketplaceCode.OZON:
      return "Ozon";
  }
}
