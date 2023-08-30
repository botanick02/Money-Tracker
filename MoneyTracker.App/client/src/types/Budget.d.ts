import { Category } from "./Category";

interface BudgetBase{
    limit: number
    title: string
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
