import { Link } from "react-router-dom";
import SettingsItem from "../elements/SettingsItem";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { useNavigate } from "react-router";
import { SIGN_OUT } from "../store/Auth/Auth.slice";
import { SHOW_TIME_TRAVEL_POPUP } from "../store/TimeTravel/TimeTravel.slice";
import { ReactComponent as WalletSvg } from "../assets/icons/wallet.svg";
import { ReactComponent as OptionsListSvg } from "../assets/icons/options-list.svg";
import { ReactComponent as TimeTravelSvg } from "../assets/icons/time-travel.svg";
import { ReactComponent as ImportSvg } from "../assets/icons/import.svg";
import { ReactComponent as SignOutSvg } from "../assets/icons/exit.svg";
import { ReactElement } from "react";

interface MenuItemWithPageUrl {
  title: string;
  description: string | null;
  icon: ReactElement<any, any>;
  pageUrl: string;
  style?: { [key: string]: string } | null;
  onClick?: null;
}

interface MenuItemWithOnClick {
  title: string;
  description: string | null;
  icon: ReactElement<any, any>;
  pageUrl?: null;
  style?: { [key: string]: string } | null;
  onClick: () => void;
}

type MenuItem = MenuItemWithPageUrl | MenuItemWithOnClick;

const Settings = () => {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const items: MenuItem[] = [
    {
      title: "Accounts",
      description: "Add, edit or delete accounts",
      icon: <WalletSvg className={"settings-item__icon"} fill={"#FFF"} />,
      pageUrl: "/AccountsList",
    },
    {
      title: "Categories",
      description: "Add, edit or delete categories",
      icon: (
        <OptionsListSvg className={"settings-item__icon"} stroke={"#FFF"} />
      ),
      pageUrl: "/CategoryList",
    },
    {
      title: "Time Travel",
      description: "Step back in time to see how things were in the past",
      icon: <TimeTravelSvg className={"settings-item__icon"} stroke={"#FFF"} />,
      pageUrl: null,
      onClick: () => dispatch(SHOW_TIME_TRAVEL_POPUP(true)),
    },
    {
      title: "Import Data",
      description: "Import transactions data from your bank",
      icon: <ImportSvg className={"settings-item__icon"} fill={"#FFF"} />,
      pageUrl: null,
      onClick: () => {},
    },
    {
      title: "Sign Out",
      icon: <SignOutSvg className={"settings-item__icon"} stroke={"#FFF"} />,
      description: null,
      pageUrl: null,
      style: { marginTop: "auto" },
      onClick: () => {
        dispatch(SIGN_OUT());
        navigate("/");
      },
    },
  ];

  return (
    <main className="settings">
      {items.map((item, index) =>
        item.pageUrl ? (
          <Link className={"settings-item"} key={index} to={item.pageUrl}>
            <SettingsItem item={item} />
          </Link>
        ) : (
          item.onClick && (
            <div
              style={item.style ?? undefined}
              className={"settings-item"}
              key={index}
              onClick={item.onClick}
            >
              <SettingsItem item={item} />
            </div>
          )
        )
      )}
    </main>
  );
};

export default Settings;
