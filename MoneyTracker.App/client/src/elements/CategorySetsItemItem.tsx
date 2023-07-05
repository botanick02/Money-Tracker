import React, {FC} from 'react';

import { ICategoryType } from '../types/ICategoryType';



const CategorySetsItem: FC<{category: ICategoryType}> = ({category}) => {

    return (
        <div className={"row-item"}>
            <div className={`row-item__indicator row-item__indicator__${category.type.toLowerCase()}`}/>
            <div className={"row-item__category-icon"}>
                <img src='https://picsum.photos/50' alt="category"/>
            </div>
            <div>
                <div className={"row-item__title"}>{category.name}</div>
                
            </div>

        </div>
    );
};

export default CategorySetsItem;