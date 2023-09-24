import { Category } from "./Category";

type TimeScope = 'monthly' | 'weekly' | 'daily' | 'yearly'
interface BudgetBase{
    limit: number
    title: string
    timeScope: TimeScope
}

export interface Budget extends BudgetBase{
    id: string,
    categories: Category[],
    spent: number,
}

export interface BudgetToEdit extends BudgetBase{
    id: string,
    categoryId: string[]
}

export interface BudgetToCreate extends BudgetBase{
    categoryId: string[]
}
