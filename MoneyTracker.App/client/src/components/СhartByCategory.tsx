import React, { useState } from 'react';
import { RadialChart } from 'react-vis';
import { useAppSelector, useAppDispatch } from '../hooks/useAppDispatch';
import SetsItem from '../elements/StatsItem';

import { SET_CURRENT_CATEGORY } from '../store/Account/Account.slice';
import { FETCH_TRANSACTIONS_INFO, } from '../store/FinancialOperation/FinancialOperation.slice';
import TransactionList from './Transaction/TransactionList';

const PieChart = () => {
    const dispatch = useAppDispatch();
    const filteredStats = useAppSelector((state) =>
        state.Stats.filter === 'income' ? state.Stats.positiveStats : state.Stats.negativeStats
    );
    const loading = useAppSelector((state) => state.Stats.loading);

    const selectedCategory = useAppSelector((state) => state.Account.currentCategoryId)
    const [showTransactionList, setShowTransactionList] = useState(false);

    const resetCurrentCategory = () => {
        dispatch({
            type: SET_CURRENT_CATEGORY,
            payload: { id: null, name: null, color: null },
        });
    };

    if (loading) {
        return <div className="category-list">Loading...</div>;
    }

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
                onValueClick={(datapoint, event) => {
                    console.log('Clicked on RadialChart:', datapoint);
                }}
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
                            if (selectedCategory !== item.categoryId) {
                         
                                dispatch({
                                    type: SET_CURRENT_CATEGORY,
                                    payload: {
                                        id: item.categoryId,
                                        name: item.categoryName,
                                        color: item.color,
                                    },
                                });
                                dispatch({
                                    type: FETCH_TRANSACTIONS_INFO,
                                });
                                setShowTransactionList(true);
                            } else {
                                dispatch({
                                    type: SET_CURRENT_CATEGORY,
                                    payload: {
                                        id: null,
                                        name: null,
                                        color: null,
                                    },
                                });
                                dispatch({
                                    type: FETCH_TRANSACTIONS_INFO,
                                });
                              
                                setShowTransactionList(false);
                                resetCurrentCategory(); 
                            }
                        }}
                    />
                ))}
            </div >

            {selectedCategory !== null && showTransactionList && <TransactionList />}
        </div>
    );
};

export default PieChart;
