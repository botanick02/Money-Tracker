import React, { useEffect } from "react";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "./hooks/useAppDispatch";
import SignInForm from "./pages/SignIn/SignInForm";
import BalanceComponent from "./pages/Balance/BalanceComponent";
import { RefreshTokenReducer } from "./store/Example/Reducers/RefreshTokenReducer";
import { UserReducer } from "./store/Example/Reducers/UserReducer";
import { checkTokenExpire } from "./tools/checkTokenExpire";
import Registration from "./pages/Registration/Registration";
import Transactions from "./pages/Transactions/Transactions";
import Layout from "./components/common/Layout";

const { GET_ACCESS_TOKEN } = RefreshTokenReducer.actions;
const { GET_USER_INFO } = UserReducer.actions;

function App() {
  const isAuth = useAppSelector((state) => state.Authorization.isAuth);
  const accessTokenRefreshing = useAppSelector(
    (state) => state.RefreshToken.loading
  );
  console.log(accessTokenRefreshing);
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
  console.log(isAuth);
  return (
    <BrowserRouter>
      <Routes>
        {isAuth ? (
          <Route path={"/"} element={<Layout />}>
            <Route index element={<Transactions />} />
            <Route path='*' element={<Navigate to='/' />} />
          </Route>
        ) : (
          <>
           <Route
              path='SignInForm' 
              element={<SignInForm />}
            />
            <Route
              path="/registration"
              element={<Registration />}
            />
            <Route path='*' element={<Navigate to='/SignInForm' />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
