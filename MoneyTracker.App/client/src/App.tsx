import React, { useEffect } from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "./hooks/useAppDispatch";
import SignInForm from "./pages/SignIn/SignInForm";
import BalanceComponent from "./pages/Balance/BalanceComponent";
import { RefreshTokenReducer } from "./store/Example/Reducers/RefreshTokenReducer";
import { UserReducer } from "./store/Example/Reducers/UserReducer";
import { checkTokenExpire } from "./tools/checkTokenExpire";

const { GET_ACCESS_TOKEN } = RefreshTokenReducer.actions;
const { GET_USER_INFO } = UserReducer.actions;


function App() {
  const isAuth = useAppSelector((state) => state.Authorization.isAuth);
  const accessTokenRefreshing = useAppSelector((state) => state.RefreshToken.loading);
console.log(accessTokenRefreshing)
    const dispatch = useAppDispatch();
    useEffect(() => {
      if (checkTokenExpire()) {
          if (!accessTokenRefreshing && isAuth) {
              dispatch(GET_ACCESS_TOKEN());
          }
      }
  }, []);

  useEffect(() => {
      if (isAuth) {
          dispatch(GET_USER_INFO());
      }
  }, [isAuth]);
console.log(isAuth)
  return (
    <BrowserRouter>
    
  
      <Routes>
       
        <Route path={"/"} element=  {isAuth ? <BalanceComponent /> : <SignInForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
