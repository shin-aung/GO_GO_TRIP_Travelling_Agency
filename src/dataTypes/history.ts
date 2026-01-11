import { Package } from "./packages";

export interface History {
  id: string;
  packageId: string;
  userId: string;
  date: string;
  packageStatus: boolean;
  paymentStatus: boolean;
  packages?: Package[];
}