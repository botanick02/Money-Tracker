import { Category } from "./Category";

interface Transaction {
    id: string,
    amount: number,
    category: Category,
    dateTime: string,
    note: string | null,
    title: string
}