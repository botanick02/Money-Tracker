import React, { FC } from "react";

interface SetsItemProps {
  name: string;
  sum: number;
  percentage: number;
  color: string | undefined;
}

const SetsItem: FC<SetsItemProps> = ({ name, percentage, color, sum }) => {
  return (
    <div className="category">
      <div className={`category__indicator`} style={{ backgroundColor: color }} />

      <div>
        <div className="category__title">{name}</div>
      </div>
      <div className="category__amount">
        {sum} $ | {percentage} %
      </div>
    </div>
  );
};

export default SetsItem;
