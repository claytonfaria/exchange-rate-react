const getCurrencyData = async (currency_one = 'USD', currency_two = 'EUR') => {
  const res = await fetch(
    `https://api.exchangeratesapi.io/latest?base=${currency_one}`
  );
  const data = await res.json();

  const currencyTwoRate = data.rates[currency_two];

  let currencyNamesArr = Object.keys(data.rates);

  currencyNamesArr.sort();

  return { currencyNamesArr, currencyTwoRate, data };
};

export default getCurrencyData;
