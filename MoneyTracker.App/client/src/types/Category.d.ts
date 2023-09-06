export interface CategoryToCreate {
  name: string;
  iconUrl: string;
  type: "income" | "expense" | "transfer";
  color: string;
}
export interface Category extends CategoryToCreate{
  id: string;
  isActive: boolean;
}

export interface CategoryToUpdate extends CategoryToCreate{
  id: string;
}