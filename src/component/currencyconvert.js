export default function CurrencyConvert({
  selectedCurrency,
  currencyOptions,
  amount,
  onChangeCurrency,
  onChangeAmount,
  label
}) {
  return (
    <div className="mb-3">
      <label className="form-label fw-bold">{label} Amount</label>
      <div className="input-group">
        <input
          className="form-control"
          type="number"
          value={amount}
          min="0"
          step="any"
          onChange={onChangeAmount}
        />
        <select
          className="form-select"
          value={selectedCurrency}
          onChange={onChangeCurrency}
        >
          {currencyOptions.map(option => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      </div>
    </div>
  );
}