import React from 'react';
import { default as test } from "./testData.json";
import { Transaction } from '../../types/Transaction';
import CategoryItem from '../../elements/CategoryItem';
import { Category } from '../../types/Category';
import { PieChart } from 'react-minimal-pie-chart';

interface CategorySummary {
  [categoryId: number]: {
    amount: number;
    category: Category;
    color: string; // Добавляем поле для хранения цвета
  };
}

const CategoryesList = () => {
    const getRandomColor = () => {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
      };
  const Categoryes = test as Transaction[];

  const categorySummary: CategorySummary = {};

  Categoryes.forEach((item) => {
    const categoryId = item.category.id;
    const amount = item.amount;

    if (categoryId in categorySummary) {
      categorySummary[categoryId].amount += amount;
    } else {
      categorySummary[categoryId] = {
        amount: amount,
        category: item.category,
        color: getRandomColor() // Генерируем рандомный цвет для категории
      };
    }
  });

  const totalAmount = Object.values(categorySummary).reduce(
    (total, category) => total + category.amount,
    0
  );

 

  return (
    <div>
      <div className="chart-container">
        <div className="chart-wrapper">
          <PieChart
            data={Object.values(categorySummary).map((category) => ({
              title: category.category.name,
              value: category.amount,
              color: category.color // Используем рандомный цвет категории
            }))}
            animate
            animationDuration={500}
          />
        </div>
      </div>
      <div className="category-list">
        {Object.values(categorySummary).map((category) => {
          const percentage = parseFloat(((category.amount / totalAmount) * 100).toFixed(2));

          return (
            <CategoryItem
              key={category.category.id}
              transaction={category}
              percentage={percentage}
              color={category.color} // Передаем рандомный цвет в CategoryItem
            />
          );
        })}
      </div>
    </div>
  );
};

export default CategoryesList;
