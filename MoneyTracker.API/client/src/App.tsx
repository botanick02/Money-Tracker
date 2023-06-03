import React from 'react';
import ExamplePage from "./pages/ExamplePage/ExamplePage";
import {BrowserRouter, Routes, Route} from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path={"/"} element={<ExamplePage/>}/>
        </Routes>
    </BrowserRouter>
  );
}

export default App;
