import { useAppDispatch } from "../../hooks/useAppDispatch";
import { AuthorizationReducer } from "../../store/Example/Reducers/AuthorizationReducer";
import "../../styles/BalanceComponent.scss";

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
    <div className="balance-component">
      <h2>Баланс на рахунку: {accountBalance} гривень</h2>
      <h3>Витрачено по категоріям:</h3>
      <ul>
        {spentCategories.map(category => (
          <li key={category.name}>
            {category.name}: {category.amount} гривень
          </li>
        ))}
      </ul>
      <button className="button danger" onClick={() => dispatch(SIGN_OUT())}>
        Sign Out
      </button>
    </div>
  );
};

export default BalanceComponent;
