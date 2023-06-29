import {Category} from "./Category";

export interface Budget {
    id: number,
    category: Category,
    limit: number,
    spent: number,
    dateStart: string,
    dateEnd: string
}