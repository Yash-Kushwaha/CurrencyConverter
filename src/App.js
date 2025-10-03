import { useEffect, useState } from 'react'
import Currencyconvert from './component/currencyconvert'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

const BASE_URL = 'https://api.frankfurter.dev/v1/latest'

export default function App () {
  const [currencyOptions, setCurrencyOptions] = useState([])
  const [fromCurrency, setFromCurrency] = useState('')
  const [toCurrency, setToCurrency] = useState('')
  const [amount, setAmount] = useState(1)
  const [exchangeRate, setExchangeRate] = useState(1)
  const [amountInFromCurrency, setAmountInFromCurrency] = useState(true)
  const [cardHovered, setCardHovered] = useState(false)

  let toAmount = 0,
    fromAmount = 0

  if (amountInFromCurrency) {
    fromAmount = amount
    toAmount = Number((amount * exchangeRate).toFixed(4))
  } else {
    toAmount = amount
    fromAmount = Number((amount / exchangeRate).toFixed(4))
  }

  // Fetch currency options and initial rates
  useEffect(() => {
    fetch(BASE_URL)
      .then(res => res.json())
      .then(data => {
        const firstCurrency = Object.keys(data.rates)[0]
        setCurrencyOptions([data.base, ...Object.keys(data.rates)])
        setFromCurrency(data.base)
        setToCurrency(firstCurrency)
        setExchangeRate(data.rates[firstCurrency])
      })
      .catch(() => {
        setCurrencyOptions([])
        setFromCurrency('')
        setToCurrency('')
        setExchangeRate(1)
      })
  }, [])

  // Fetch exchange rate when currencies change
  useEffect(() => {
    if (fromCurrency && toCurrency && fromCurrency !== toCurrency) {
      fetch(`${BASE_URL}?base=${fromCurrency}&symbols=${toCurrency}`)
        .then(res => res.json())
        .then(data => setExchangeRate(data.rates[toCurrency]))
        .catch(() => setExchangeRate(1))
    } else if (fromCurrency === toCurrency) {
      setExchangeRate(1)
    }
  }, [fromCurrency, toCurrency])

  function handleFromAmountChange (e) {
    setAmount(e.target.value)
    setAmountInFromCurrency(true)
  }

  function handleToAmountChange (e) {
    setAmount(e.target.value)
    setAmountInFromCurrency(false)
  }

  return (
    <div className='modern-bg min-vh-100 d-flex justify-content-center align-items-center'>
      <div className='row w-100 justify-content-center'>
        <div className={`col-12 col-sm-10 col-md-8 col-lg-6`}>
          <div
            className={`card shadow modern-card ${
              cardHovered ? 'modern-card-hover' : ''
            }`}
            onMouseEnter={() => setCardHovered(true)}
            onMouseLeave={() => setCardHovered(false)}
          >
            <div className='card-body'>
              <h2 className='card-title text-center mb-4 modern-title'>
                <span role='img' aria-label='money'>
                  💱
                </span>{' '}
                Currency Converter
              </h2>
              <Currencyconvert
                selectedCurrency={fromCurrency}
                currencyOptions={currencyOptions}
                amount={fromAmount}
                onChangeCurrency={e => setFromCurrency(e.target.value)}
                onChangeAmount={handleFromAmountChange}
                label='From'
              />
              <div className='text-center my-3 display-6 modern-equals'>=</div>
              <Currencyconvert
                selectedCurrency={toCurrency}
                currencyOptions={currencyOptions}
                amount={toAmount}
                onChangeCurrency={e => setToCurrency(e.target.value)}
                onChangeAmount={handleToAmountChange}
                label='To'
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
