export interface Transaction {
  operationId: string;
  userId: string;
  title: string;
  note: string | null;
  amount: number;
  categoryId: string;
  createdAt: string;
  accountId: string;
}
