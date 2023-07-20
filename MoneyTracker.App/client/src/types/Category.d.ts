export interface Category {
  id: string;
  name: string;
  iconUrl: string;
  type: "income" | "expense";
  color: string;
}