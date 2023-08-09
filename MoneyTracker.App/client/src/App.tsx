import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "./hooks/useAppDispatch";
import SignInForm from "./pages/SignInForm";
import { checkTokenExpire } from "./tools/checkTokenExpire";
import Registration from "./pages/Registration";
import Transactions from "./pages/Transactions";
import Layout from "./components/common/Layout";
import Settings from "./pages/Settings";
import Stats from "./pages/Stats";
import Budgets from "./pages/Budgets";
import CategoryList from "./components/CategoryList/CategoryList";
import { REFRESH_ACCESS_TOKEN } from "./store/Auth/Auth.slice";

function App() {
  const isAuth = useAppSelector((state) => state.Auth.isAuth);
  const accessTokenRefreshing = useAppSelector(
    (state) => state.Auth.loading
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    const interval = setInterval(() => {
      if (checkTokenExpire()) {
        if (!accessTokenRefreshing && isAuth) {
          dispatch(REFRESH_ACCESS_TOKEN());
        }
      }
    }, 120000); 

    return () => {
      clearInterval(interval); 
    };
  }, [accessTokenRefreshing, dispatch, isAuth]);

  return (
    <BrowserRouter>
      <Routes>
        {isAuth ? (
          <Route path={"/"} element={<Layout />}>
            <Route index element={<Transactions />} />
            <Route path="/budgets" element={<Budgets/>} />
            <Route path="/stats" element={<Stats/>} />
            <Route path="/settings" element={<Settings/>}/>
            <Route path="/CategoryList" element={<CategoryList/>}/>
            <Route path="*" element={<Navigate to="/" />} />
          </Route>
        ) : (
          <>
            <Route path="SignInForm" element={<SignInForm />} />
            <Route path="/registration" element={<Registration />} />
            <Route path="*" element={<Navigate to="/SignInForm" />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
