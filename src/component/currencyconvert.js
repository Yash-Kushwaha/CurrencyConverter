import React from 'react'

export default function currencyconvert(props) {
    const {selectedCurrency,currencyOptions,amount,onChangeCurrency,onChangeAmount} = props;
    return (
        <div>
            <input className="input" type="number" value={amount} onChange={onChangeAmount}/>
            <select value={selectedCurrency} onChange={onChangeCurrency}>
    {currencyOptions.map(option => <option key={option} value={option}>{option}</option>)}
            </select>
        </div>
    )
}