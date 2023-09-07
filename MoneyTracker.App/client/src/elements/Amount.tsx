import React, {FC} from 'react';

const Amount: FC<{sum: number}> = ({sum}) => {
  return (
    <span className={`row-item__amount amount__${sum > 0 ? "income" : "expense"}`}>{sum} $</span>
  );
};

export default Amount;