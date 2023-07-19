export interface Category {
    id: number,
    name: string,
    iconUrl?: string,
    type: "income" | "expense"
    percentage?:number
}