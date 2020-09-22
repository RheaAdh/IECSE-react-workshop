import React from "react";
import "./styles.css";
import NavigationBar from "./components/NavBar";
import Home from "./components/home";
export default function App() {
  return (
    <div className="App">
      <NavigationBar />
    
        <div style={{paddingTop: "10vh"}}><Home /></div>
      
    </div>
  );
}
