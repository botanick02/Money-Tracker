import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";
import { FC, ReactElement, useEffect, useRef } from "react";

const SettingsItem: FC<{
  item: {
    title: string;
    description: string | null;
    icon: ReactElement<any, any>;
  };
}> = ({ item }) => {
  const url = new URL("../assets/icons/time-travel.svg", import.meta.url).href;

  return (
    <div className={"row-item"}>
      <div className={"row-item__category-icon"}>{item.icon}</div>
      <div>
        <div className={"row-item__title"}>{item.title}</div>
        <div className={"row-item__sub-title"}>{item.description}</div>
      </div>
    </div>
  );
};

export default SettingsItem;
