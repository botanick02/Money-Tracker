import { useAppDispatch } from "../../hooks/useAppDispatch";
import { AuthorizationReducer } from "../../store/Example/Reducers/AuthorizationReducer";
import "../../styles/BalanceComponent.scss";
import Transactions from "../Transactions/Transactions";

const BalanceComponent = () => {
  const accountBalance = 5000;
  const spentCategories = [
    { name: 'Їжа', amount: 1000 },
    { name: 'Транспорт', amount: 500 },
    { name: 'РОзваги', amount: 200 },
  ];
  const { SIGN_OUT } = AuthorizationReducer.actions;
  const dispatch = useAppDispatch();

  return (
 
    <div>
    <Transactions />
    <button className="button danger" onClick={() => dispatch(SIGN_OUT())}>
        Sign Out
      </button>
  </div>
   
  );
};

export default BalanceComponent;
