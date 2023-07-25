import { Category } from "./Category";

interface BudgetBase{
    id: string,
    limit: number,
    endDate: string | null,
    startDate: string | null
}

export interface Budget extends BudgetBase{
    category: Category,
    spent: number,
}

export interface BudgetWrite extends BudgetBase{
    categoryId
}
