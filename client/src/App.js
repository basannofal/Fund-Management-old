import React from "react";
import Home from "./Screen/Home";
import {Route, Routes} from 'react-router-dom'
import Addnew from "./Screen/Addnew";
import Memberdetail from "./Screen/Memberdetail";
import MemberIncome from "./Screen/MemberIncome";

function App() {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<>
          <Home />
        </>} ></Route>
      </Routes>

      <Routes>
        <Route path="/addnew/:id" element={<Addnew />} ></Route>
      </Routes>

      <Routes>
        <Route path="/memberdetail/:id/:mid" element={<Memberdetail />} ></Route>
      </Routes>

      
      <Routes>
        <Route path="/membericome/:id/:mid" element={<MemberIncome />} ></Route>
      </Routes>
    </>
  );
}

export default App;
