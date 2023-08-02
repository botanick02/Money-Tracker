import React from 'react';
import { RadialChart } from 'react-vis';
import { useAppSelector } from '../../hooks/useAppDispatch';
import SetsItem from '../../elements/StatsItem';

const PieChart = () => {
    const filetr =useAppSelector((state) => state.Stats.filter)

   const filteredStats = useAppSelector((state) =>
  state.Stats.filter === "income" ? state.Stats.positiveStats : state.Stats.negativeStats
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

      <div className="category-list" > 
        {filteredStats.map((item) => (
          <SetsItem
            key={item.categoryName}
            name={item.categoryName}
            sum={item.sum}
            percentage={item.percentage}
            color={item.color}
          />
        ))}
      </div>
    </div>
  );
};

export default PieChart;
