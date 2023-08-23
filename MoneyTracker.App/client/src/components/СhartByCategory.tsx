import React, { useState } from 'react';
import { RadialChart } from 'react-vis';
import { useAppSelector, useAppDispatch } from '../hooks/useAppDispatch';
import SetsItem from '../elements/StatsItem';
import { SET_CURRENT_CATEGORY } from '../store/Account/Account.slice';
import { FETCH_TRANSACTIONS_INFO } from '../store/FinancialOperation/FinancialOperation.slice';
import TransactionList from './Transaction/TransactionList';

const PieChart = () => {
    const dispatch = useAppDispatch();
    const filteredStats = useAppSelector((state) =>
        state.Stats.filter === 'income' ? state.Stats.positiveStats : state.Stats.negativeStats
    );
    const loading = useAppSelector((state) => state.Stats.loading);

    const selectedCategory = useAppSelector((state) => state.Account.currentCategoryId);
    const [showTransactionList, setShowTransactionList] = useState(false);
    const toggleTransactionList = () => {
        setShowTransactionList(!showTransactionList);
    };
    const { currentCategoryColor } =
    useAppSelector((state) => state.Account);
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
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100vh', overflow: 'auto' }}>
            <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                <RadialChart
                    data={filteredStats.map((item) => ({
                        angle: item.percentage,
                        label: `${item.categoryName} (${item.percentage.toFixed(2)}%)`,
                        color: item.color,
                    }))}
                    width={220}
                    height={220}
                    colorType="literal"
                    onValueClick={(datapoint, event) => {
                        console.log('Clicked on RadialChart:', datapoint);
                    }}
                />
            </div>

            <div className="category-list" style={{ maxHeight: '200px', overflowY: 'auto' }}>
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
                                    type: FETCH_TRANSACTIONS_INFO,
                                });
                                setShowTransactionList(false);
                                resetCurrentCategory();
                            }
                        }}
                    />
                ))}
            </div>

         
            {selectedCategory !== null &&showTransactionList && (
                <button
                    className="transaction-sums__filter"
                    onClick={toggleTransactionList}
                    style={{
                        ...(currentCategoryColor !== null
                          ? {
                              color: currentCategoryColor,
                            }
                          : {}),
                        width: '100%',
                        overflowX: 'auto',
                        textAlign: 'center',
                        backgroundColor: 'transparent',
                      
                      }}
                         
                >
                    <span style={{ fontSize: '20px', paddingRight: '10px' }}>▲</span>
                    Hide transaction list
                    <span style={{ fontSize: '20px', paddingLeft: '10px' }}>▲</span>
                </button>
            )}

         
            {selectedCategory !== null && showTransactionList && (
                <div style={{ width: '100%', overflowX: 'auto' }}>
                    <TransactionList />
                </div>
            )}
        </div>
    );
};

export default PieChart;
