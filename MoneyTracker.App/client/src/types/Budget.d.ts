import { Category } from "./Category";

interface BudgetBase{
    limit: number
    title: string | null
}

export interface Budget extends BudgetBase{
    id: string,
    category: Category,
    spent: number,
}

export interface BudgetToEdit extends BudgetBase{
    id: string,
    categoryId: string
}

export interface BudgetToCreate extends BudgetBase{
    categoryId: string
}
