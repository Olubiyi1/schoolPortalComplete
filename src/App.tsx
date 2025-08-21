import React from "react";
import "./App.css"
import { Header } from "./Reuseable/Header/Header";
// import { Homepage } from "./Pages/Homepage/Homepage";
import { Outlet } from "react-router";



const App = ()=>{
  return (
    <div>
    <Header/>
    <Outlet/>
    </div>
  )
}

export default App;