export interface Account {
  id: number;
  name: string;
  marketplace_codes: MarketplaceCode[];
}

export enum MarketplaceCode {
  WB = 'WB',
  OZON = 'OZON',
}
