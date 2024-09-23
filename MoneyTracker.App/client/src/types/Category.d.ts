import {TransactionTypes} from "../store/FinancialOperation/FinancialOperation.slice"

export interface CategoryToCreate {
  name: string;
  iconUrl: string;
  type: string;
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

