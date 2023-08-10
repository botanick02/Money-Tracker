import { Currency } from "./Currency";

export interface Account{
    id: string;
    name: string;
    balance: number;
    currency: Currency;
}