import { ICategoryType } from "./ICategoryType";

export interface ICategorySummary {
  [categoryId: string]: {
    amount: number;
    category: ICategoryType;
    color: string; 
  };
}