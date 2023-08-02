import React from 'react';
import { RadialChart } from 'react-vis';
import { useAppSelector } from '../../hooks/useAppDispatch';
import SetsItem from '../../elements/StatsItem';

const PieChart = () => {
  const stats = useAppSelector((state) => state.Stats.stats);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '400px' }}>
      <RadialChart
        data={stats.map((item) => ({
          angle: item.percentage,
          label: `${item.categoryName} (${item.percentage.toFixed(2)}%)`,
          color: item.color,
        }))}
        width={300}
        height={300}
        colorType="literal" 
        style={{ width: '100%' }} 
      />

      <div className="category-list" > 
        {stats.map((item) => (
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
