import { FC, ReactElement } from "react";

const SettingsItem: FC<{
  item: {
    title: string;
    description: string | null;
    icon: ReactElement<any, any>;
  };
}> = ({ item }) => {
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
