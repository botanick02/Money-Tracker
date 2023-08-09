import React from 'react';
import { RadialChart } from 'react-vis';
import { useAppSelector, useAppDispatch } from '../../hooks/useAppDispatch'; // Обратите внимание на useAppDispatch
import SetsItem from '../../elements/StatsItem';
import { SET_CURRENT_CATEGORY } from '../../store/Account/Account.slice';
import { Link } from 'react-router-dom';


// ... (import statements)

const PieChart = () => {
    const dispatch = useAppDispatch();
    const filteredStats = useAppSelector((state) =>
      state.Stats.filter === 'income' ? state.Stats.positiveStats : state.Stats.negativeStats
    );

  
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
          onValueClick={(datapoint, event) => {            console.log('Clicked on RadialChart:', datapoint);
          }}
        />
      
        <Link to="/" className="category-list">
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
                    dispatch({
                        type: SET_CURRENT_CATEGORY,
                        payload: {
                          id: item.categoryId,
                          name: item.categoryName,
                          color: item.color,
                        },
                      });
                    }
                 
                }
              />
            ))}
          </div>
        </Link>
      </div>
      
    );
  };
  
  export default PieChart;
  