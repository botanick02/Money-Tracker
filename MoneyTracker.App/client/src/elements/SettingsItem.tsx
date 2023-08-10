import React, {FC} from 'react';





const SettingsItem: FC<{ item: { title: string; description: string,iconUrl:string } }> = ({ item }) => {

    return (
        <div className={"row-item"}>
            <div className={"row-item__category-icon"}>
                <img src={item.iconUrl} alt="category"/>
            </div>
            <div>
                <div className={"row-item__title"}>{item.title}</div>
                <div className={"row-item__sub-title"}>{item.description}</div>
            </div>

        </div>
    );
};

export default SettingsItem;