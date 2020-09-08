import React from 'react';
import './App.css';
import logo from './components/img/money.png';
// import getCurrencyData from './api/Api';
import Converters from './components/Converters';

function App() {
  return (
    <div className='App'>
      <img src={logo} alt='' className='money-img' />
      <h1>Exchange Rate Calculator</h1>
      <p>Choose the currency and the amounts to get the exchange rate</p>
      <Converters />
    </div>
  );
}

export default App;
