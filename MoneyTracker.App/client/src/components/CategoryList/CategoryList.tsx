import React, { useEffect, useState } from 'react';


import { useAppDispatch, useAppSelector } from '../../hooks/useAppDispatch';
import CategorySetsItemItem from '../../elements/CategorySetsItemItem';
import { CategoryItemReducer } from '../../store/Example/Reducers/CategoryItemsReducer';
import { checkTokenExpire } from '../../tools/checkTokenExpire';


const CategoryList = () => {
    const items = useAppSelector((state) => state.Category.categories);
    const {  FETCH_CATEGORIES } =
    CategoryItemReducer.actions;

    const [isCreatePopupOpen, setIsCreatePopupOpen] = useState<boolean>(false);

    const dispatch = useAppDispatch();
   
    const page = 1;
    const countOfElements = 5;
  
    useEffect(() => {
      dispatch(FETCH_CATEGORIES({ page, countOfElements }));
    }, [dispatch, page, countOfElements]);
    return (
        <div className={"transaction-list"}>
            {
                items.map((item, index)=> {
                        
                    return <CategorySetsItemItem key={item.id} category={item} />;


                    }
                )
            }
        </div>
    );
};

export default CategoryList;



