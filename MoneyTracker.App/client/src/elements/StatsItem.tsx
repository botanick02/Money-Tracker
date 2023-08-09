import React, { FC } from "react";
import { Link } from "react-router-dom";

interface SetsItemProps {
  name: string;
  sum: number;
  percentage: number;
  color: string | undefined;
  categoryId: string;
  onClick: () => void;
}


const SetsItem: FC<SetsItemProps> = ({ name, percentage, color, sum, onClick }) => {
  return (
    <div className="category" onClick={onClick}> 
    
      <div className={`category__indicator`} style={{ backgroundColor: color }} />

      <div>
        <div className="category__title">{name} </div>
      </div>
      <div className="category__amount">
         {sum} $ | {percentage} % 
      </div>
     
    </div>
   
  );
};


export default SetsItem;
