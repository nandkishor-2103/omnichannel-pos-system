export interface DashboardSummaryDto {
  totalStores: number;
  activeStores: number;
  blockedStores: number;
  pendingStores: number;
}

export interface StoreRegistrationStatDto {
  date: string;
  count: number;
}

export interface StoreStatusDistributionDto {
  active: number;
  blocked: number;
  pending: number;
}
