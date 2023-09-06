import React, {FC} from 'react';
import SvgFromPath from "./SvgFromPath";
import {Category} from "../types/Category";

const CategoryIcon:FC<{category: Category}> = ({category}) => {
  return (
    <div
      style={{ background: category.color }}
      className="category-icon"
    >
      <SvgFromPath
        path={category.iconUrl}
        styles={{ background: category.color }}
      />
    </div>
  );
};

export default CategoryIcon;