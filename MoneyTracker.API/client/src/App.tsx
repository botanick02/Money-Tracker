import React, { useEffect } from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useAppSelector } from "./hooks/useAppDispatch";
import SignInForm from "./pages/SignIn/SignInForm";
import BalanceComponent from "./pages/Balance/BalanceComponent";

function App() {
  const isAuth = useAppSelector((state) => state.Authorization.isAuth);

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
