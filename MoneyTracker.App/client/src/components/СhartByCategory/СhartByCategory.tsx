import React from 'react';
import { RadialChart } from 'react-vis';

const data = [
  {
    categoryName: 'Авто',
    sum: 122,
    percentage: 91.04,
    color: '#FF5722', // Color for "Авто"
  },
  {
    categoryName: 'My',
    sum: 12,
    percentage: 8.96,
    color: '#002000', // Color for "My"
  },
];

const PieChart = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '300px' }}>
      <RadialChart
        data={data.map((item) => ({
          angle: item.percentage,
          label: `${item.categoryName} (${item.percentage.toFixed(2)}%)`,
          color: item.color, 
        }))}
        width={300}
        height={300}
        
      />
    </div>
  );
};

export default PieChart;
