export interface Review {
  id: string;
  packageId?: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}