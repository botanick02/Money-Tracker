import React from "react";
import { Link, useLocation } from 'react-router-dom'
import { ReactComponent as BudgetsIcon } from "../../assets/icons/Budgets-icon.svg";
import { ReactComponent as TransactionsIcon } from "../../assets/icons/Transactions-icon.svg";
import { ReactComponent as StatsIcon } from "../../assets/icons/Stats-icon.svg";
import { ReactComponent as SettingsIcon } from "../../assets/icons/Settings-icon.svg";

const NavigationMenu = () => {

  const location = useLocation();
  const currentPage = location.pathname;

  return (
    <div className={"nav-menu"}>
      <Link to="/" className={`nav-menu__item ${currentPage == "/" ? "active" : ""}`}>
        <BudgetsIcon className={"nav-menu__item__icon"}/>
        <span>Transactions</span>
      </Link>
      <Link to="/budgets" className={`nav-menu__item ${currentPage == "/budgets" ? "active" : ""}`}>
        <TransactionsIcon className={"nav-menu__item__icon"}/>
        <span>Budgets</span>
      </Link>
      <Link to="/stats" className={`nav-menu__item ${currentPage == "/stats" ? "active" : ""}`}>
        <StatsIcon className={"nav-menu__item__icon"}/>
        <span>Stats</span>
      </Link>
      <Link to="/settings" className={`nav-menu__item ${currentPage == "/settings" ? "active" : ""}`}>
        <SettingsIcon className={"nav-menu__item__icon"}/>
        <span>Settings</span>
      </Link>
    </div>
  );
};

export default NavigationMenu;
