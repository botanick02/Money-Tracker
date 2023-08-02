export interface CategoryToCreate {
  name: string;
  iconUrl: string;
  type: "income" | "expense";
  color: string;

}export interface Category extends CategoryToCreate{
  id: string;
}