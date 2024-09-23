import { useLocation } from "react-router-dom";
import AccountSelector from "../AccountSelector";

const Header = () => {
  const location = useLocation();

  return (
    <div className={"header"}>
      {location.pathname !== "/settings" && <AccountSelector />}
    </div>
  );
};

export default Header;
