export interface CategoryToCreate {
  name: string;
  iconUrl: string;
  type: "income" | "expense" | "service";
  color: string;

}export interface Category extends CategoryToCreate{
  id: string;
}