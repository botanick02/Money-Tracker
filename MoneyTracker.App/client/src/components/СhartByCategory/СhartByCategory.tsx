import React, { useEffect, useMemo, useState } from 'react';

import CategoryItem from '../../elements/CategoryItem';

import { PieChart } from 'react-minimal-pie-chart';
import { useAppDispatch, useAppSelector } from '../../hooks/useAppDispatch';
import { TransactionItemsSlice } from '../../store/FinancialOperations/FinancialOperations.slice';
import { CategoryItemReducer } from '../../store/Example/Reducers/CategoryItemsReducer';

// const ChartByCategory = () => {
//   const dispatch = useAppDispatch();
//   const { FETCH_TRANSACTIONS } = TransactionItemsReducer.actions;
//   const { FETCH_CATEGORIES } = CategoryItemReducer.actions;
//   const mocAccountSOptions = {
//     Income: "0c5c3b75-6094-4156-8c2f-6e0ac5b89fcb",
//     Expense: "7c494473-5889-4d7f-81cc-7f94f5c8cc90"
//   };

//   const dateTimeTo = useAppSelector((state) => state.DateTime.dateTime)

//   const typeOfTransactions = useAppSelector((state) => state.Account.actualTypeBalance)

//   const categories = useAppSelector((state) => state.Category.categories)
//   let transactions = useAppSelector((state) => state.TransactionItems.transactions);
//   const filteredTransactions = useMemo(() => {
//     if (typeOfTransactions === "income") {
//       return transactions.filter((transaction) => transaction.accountId !== mocAccountSOptions.Income);
//     } else if (typeOfTransactions === "expense") {
//       return transactions.filter((transaction) => transaction.accountId !== mocAccountSOptions.Expense);
//     }
//     return transactions;
//   }, [transactions, typeOfTransactions]);
  
  
//   useEffect(() => {
//     dispatch(FETCH_TRANSACTIONS());
//     dispatch(FETCH_CATEGORIES());

//   }, [typeOfTransactions]);
  
//   console.log(typeOfTransactions)
 
//   const getRandomColor = () => {
//     const letters = '0123456789ABCDEF';
//     let color = '#';
//     for (let i = 0; i < 6; i++) {
//       color += letters[Math.floor(Math.random() * 16)];
//     }
//     return color;
//   };

//   const categorySummary: ICategorySummary = filteredTransactions.reduce((summary, transaction) => {
//     const { categoryId, amount } = transaction;
  
//     const category = categories.find((cat) => cat.id === categoryId);
  
//     if (category && amount !== 0) {
//       if (summary[categoryId]) {
//         summary[categoryId].amount += amount;
//       } else {
//         summary[categoryId] = {
//           amount,
//           category,
//           color: getRandomColor(),
//         };
//       }
//     }
    
//     return summary;
//   }, {} as ICategorySummary);
  
//   console.log(categorySummary)
  

//   const totalAmount = Object.values(categorySummary).reduce(
//     (total, category) => total + category.amount,
//     0
//   );

//   const sortedCategories = Object.values(categorySummary)
//   .filter(category => category.amount !== 0)
//   .sort((a, b) => {
//     const percentageA = (a.amount / totalAmount) * 100;
//     const percentageB = (b.amount / totalAmount) * 100;
//     return percentageB - percentageA;
//   });


//   return (
//     <div>
//       <div className="chart-container">
//         <div className="chart-wrapper">
//           <PieChart
//             data={sortedCategories.map((category) => ({
//               title: category.category.name,
//               value: category.amount,
//               color: category.color 
//             }))}
//             animate
//             animationDuration={500}
//           />
//         </div>
//       </div>
//       <div className="category-list">
//         {sortedCategories.map((category) => {
//           const percentage = parseFloat(((category.amount / totalAmount) * 100).toFixed(2));

//           return (
//             <CategoryItem
//               key={category.category.id}
//               category={category}
//               percentage={percentage}
//               color={category.color} 
//             />
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default ChartByCategory;
