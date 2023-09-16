export interface CategoryToCreate {
  name: string;
  iconUrl: string;
  type: "INCOME" | "EXPENSE" | "DOUBLE_SIDED";
  color: string;
}
export interface Category extends CategoryToCreate{
  id: string;
  isActive: boolean;
  isService: boolean;
}

export interface CategoryToUpdate extends CategoryToCreate{
  id: string;
}