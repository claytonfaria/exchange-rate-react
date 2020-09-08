import React, { useEffect, useState } from 'react';
import getCurrencyData from '../api/Api';

function Converters() {
  const [currency, setCurrency] = useState({
    one: 'USD',
    two: 'EUR',
    amount: '',
    totalAmount: '',
    rate: '',
    currencyList: [],
  });

  useEffect(() => {
    const fetchCurrencyList = async () => {
      const { currencyNamesArr } = await getCurrencyData();
      setCurrency((prevState) => ({
        ...prevState,
        currencyList: currencyNamesArr,
      }));
    };

    fetchCurrencyList();
  }, []);

  useEffect(() => {
    const calculate = async function () {
      const data = await getCurrencyData(currency.one, currency.two);
      const rate2 = data.currencyTwoRate;
      setCurrency((prevState) => ({
        ...prevState,
        rate: rate2.toFixed(2),
        totalAmount: (currency.amount * rate2).toFixed(2),
      }));
    };
    calculate();
    // eslint-disable-next-line
  }, [currency.one, currency.two]);

  const handleOnChange = async (e) => {
    const input = e.target;
    if (input.id === 'currency-one') {
      setCurrency((prevState) => ({ ...prevState, one: input.value }));
    } else if (input.id === 'currency-two') {
      setCurrency((prevState) => ({ ...prevState, two: input.value }));
    }
  };

  const handleOnType = (e) => {
    const amount = e.target.value;
    setCurrency((prevState) => ({
      ...prevState,
      amount: amount,
      totalAmount: (amount * currency.rate).toFixed(2),
    }));
  };

  const swapCurrencies = function () {
    const A = currency.one;
    const B = currency.two;

    setCurrency((prevState) => ({
      ...prevState,
      one: B,
      two: A,
    }));
  };

  return (
    <div>
      <div className='container'>
        <div className='currency'>
          <select
            value={currency.one}
            onChange={handleOnChange}
            id='currency-one'
          >
            {currency.currencyList.map((country, i) => (
              <option key={i} value={country}>
                {country}
              </option>
            ))}
          </select>
          <input
            type='number'
            id='amount-one'
            placeholder='Enter amount'
            onChange={handleOnType}
          />
        </div>

        <div className='swap-rate-container'>
          <button className='btn' id='swap' onClick={swapCurrencies}>
            Swap
          </button>
          <div
            className='rate'
            id='rate'
          >{`1 ${currency.one} = ${currency.rate} ${currency.two}`}</div>
        </div>

        <div className='currency'>
          <select
            value={currency.two}
            onChange={handleOnChange}
            id='currency-two'
          >
            {currency.currencyList.map((country, i) => (
              <option key={i} value={country}>
                {country}
              </option>
            ))}
          </select>
          <input
            type='number'
            id='amount-two'
            placeholder='0'
            disabled
            value={currency.totalAmount}
          />
        </div>
      </div>
    </div>
  );
}

export default Converters;
