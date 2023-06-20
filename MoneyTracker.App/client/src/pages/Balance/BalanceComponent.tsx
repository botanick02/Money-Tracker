import { useAppDispatch } from "../../hooks/useAppDispatch";
import { AuthorizationReducer } from "../../store/Example/Reducers/AuthorizationReducer";
import "../../styles/BalanceComponent.scss";
import Transactions from "../Transactions/Transactions";
import { useNavigate } from "react-router";



const BalanceComponent = () => {

  const { SIGN_OUT } = AuthorizationReducer.actions;
  const dispatch = useAppDispatch();
  const navigate = useNavigate ();


  return (
 
    <div>git
    <Transactions />
    <button className="button " onClick={() =>
        {
      dispatch(SIGN_OUT())
      navigate('/')
      }}>
        Sign Out
      </button>
  </div>
   
  );
};

export default BalanceComponent;
