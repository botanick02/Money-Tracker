import { Category } from "./Category";

export interface Transaction {
  id: string;
  operationId: string;
  userId: string;
  title?: string;
  note?: string;
  amount: number;
  category: Category;
  createdAt: string;
  accountId: string;
}
