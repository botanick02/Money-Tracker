import React from 'react';
import { RadialChart } from 'react-vis';
import { useAppSelector } from '../../hooks/useAppDispatch';
import SetsItem from '../../elements/StatsItem';
import { useDispatch } from 'react-redux';
import { FETCH_TRANSACTIONS_INFO, SET_CURRENT_CATEGORY_ID } from '../../store/FinancialOperation/FinancialOperation.slice';


const PieChart = () => {
  const dispatch = useDispatch();

  const filteredStats = useAppSelector((state) =>
    state.Stats.filter === 'income' ? state.Stats.positiveStats : state.Stats.negativeStats
  );
  const currentCategory = useAppSelector((state) => state.FinancialOperation.currentCategoryID
  
);
console.log(filteredStats)
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '400px' }}>
      <RadialChart
        data={filteredStats.map((item) => ({
          angle: item.percentage,
          label: `${item.categoryName} (${item.percentage.toFixed(2)}%)`,
          color: item.color,
        }))}
        width={220}
        height={220}
        colorType="literal"
        style={{ width: '100%' }}
      />

      <div className="category-list">
        {filteredStats.map((item) => (
          <SetsItem
            key={item.categoryName}
            name={item.categoryName}
            categoryId={item.categoryId}
            sum={item.sum}
            percentage={item.percentage}
            color={item.color}
            onClick={() => {
                dispatch(SET_CURRENT_CATEGORY_ID(item.categoryId));
                dispatch(FETCH_TRANSACTIONS_INFO()); 
                console.log(currentCategory)
              }}
          />
        ))}
      </div>
    </div>
  );
};

export default PieChart;
