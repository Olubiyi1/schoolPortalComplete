import React from "react";
import "./App.css"
import { Header } from "./Reuseable/Header/Header";
import { Homepage } from "./Pages/Homepage";


const App = ()=>{
  return (
    <div>
    <Header/>
    <Homepage/>
    </div>
  )
}

export default App;