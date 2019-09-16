import React from 'react';
import './App.css';
import Calculator from './Components/Calculator/calculator';
import Chart from './Components/Chart/Chart';
import { Card } from '@material-ui/core';




function App() {
  return (
    <div className="App">
      <header className="App-header">
           <Card style = {{textAlign:"center"}}><h1>Slippage Tool</h1></Card>
           <Calculator />
           <Chart/>
          
      </header>
    </div>
  );
}

export default App;
