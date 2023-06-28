import { useAppDispatch } from "../../hooks/useAppDispatch";
import { AuthorizationReducer } from "../../store/Example/Reducers/AuthorizationReducer";
import { useNavigate } from "react-router";




const Settings = () => {
  const { SIGN_OUT } = AuthorizationReducer.actions;
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  return (
    <main>
 <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
  <button
    className="button"
    onClick={() => {
      dispatch(SIGN_OUT());
      navigate("/");
    }}
  >
    Sign Out
  </button>
</div>
    </main>
  );
};

export default Settings;
