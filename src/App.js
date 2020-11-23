import React,{useEffect,useState} from 'react';
import './App.css';
import Currencyconvert from './component/currencyconvert';

const BASE_URL = " https://api.exchangeratesapi.io/latest"

export default function App() {

  const [ToCurrency,setToCurrency] = useState();
  const [FromCurrency,setFromCurrency] = useState();
  const [currencyOptions,setCurrencyOption] = useState([]);
  const [amount,setAmount] = useState();
  const [exchangeRate,setExchangeRate] = useState();
  const [amoutInFromCurrency,setAmoutInFromCurrency] = useState(true);

  let toAmount, fromAmount;

  if(amoutInFromCurrency){
    fromAmount = amount;
    toAmount = amount * exchangeRate;
  }
  else{
    toAmount = amount;
    fromAmount = amount / exchangeRate;
  }

  useEffect(()=>{
    fetch(BASE_URL)
    .then(res=> res.json())
    .then(data=> {
      setCurrencyOption([data.base,...Object.keys(data.rates)])
      setToCurrency([...Object.keys(data.rates)][0])
      setFromCurrency(data.base)
      setExchangeRate(data.rates[Object.keys(data.rates)[0]])
    })
  },[])

  function handleFromAmountChange(e){
    setAmount(e.target.value);
    setAmoutInFromCurrency(true);
  }

  function handleToAmountChange(e){
    setAmount(e.target.value);
    setAmoutInFromCurrency(false);
  }

  useEffect(()=>{
    if(ToCurrency!=null && FromCurrency!= null){
      fetch(`${BASE_URL}?base=${FromCurrency}&symbols=${ToCurrency}`)
      .then(res=>res.json())
      .then(data => setExchangeRate(data.rates[ToCurrency]))
    }
  },[ToCurrency,FromCurrency])

  return (
    <div className="App">
      <h1>Convert</h1>
      <Currencyconvert 
        selectedCurrency={FromCurrency}
        currencyOptions={currencyOptions}
        amount = {fromAmount}
        onChangeCurrency={e=>setFromCurrency(e.target.value)}
        onChangeAmount={handleFromAmountChange}
      />
      <div className="App">=</div>
      <Currencyconvert 
        selectedCurrency={ToCurrency}
        currencyOptions={currencyOptions}
        amount = {toAmount}
        onChangeCurrency={e=>setToCurrency(e.target.value)}
        onChangeAmount={handleToAmountChange}
      />
    </div>
  );
}