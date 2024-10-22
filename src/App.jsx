import { useState } from "react";
import useCurrencyInfo from "./hooks/useCurrencyInfo";
import "./App.css";
import InputBox from "./components/InputBox";

function App() {
  const [amount, setAmount] = useState(1);
  const [from, setFrom] = useState("cad");
  const [to, setTo] = useState("inr");
  const [convertedAmount, setConvertedAmount] = useState(0);

  const currencyInfo = useCurrencyInfo(from);

  const options = Object.keys(currencyInfo);

  const swap = () => {
    setFrom(to);
    setTo(from);
    setConvertedAmount(amount);
    setAmount(convertedAmount);
  };

  const convert = () => {
    setConvertedAmount((amount * currencyInfo[to]).toFixed(2));
  };

  return (
    <div
      className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat"
      style={{
        backgroundImage: `url('https://static.vecteezy.com/system/resources/previews/001/966/624/non_2x/money-transfer-global-currency-stock-exchange-stock-illustration-vector.jpg')`,
      }}
    >
      <div className="w-full ">
        <div className="max-w-2xl w-full h-max mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/30 ">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              convert();
            }}
          >
            <div className="w-full mb-1">
              <InputBox
                label="From"
                amount={amount}
                OnAmountChange={(amount) => setAmount(amount)}
                currencyOptions={options}
                onCurrencyChange={(currency) => {
                  setAmount(amount);
                  setFrom(currency);
                }}
                selectCurrency={from}
              />
            </div>
            <div className="relative w-full h-0.5">
              <button
                type="button"
                onClick={swap}
                className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 text-white px-2 py-0.5"
              >
                swap
              </button>
            </div>
            <div className="w-full mt-1 mb-4">
              <InputBox
                label="To"
                amount={convertedAmount}
                currencyOptions={options}
                onCurrencyChange={(currency) => {
                  setTo(currency);
                }}
                amountDisble
                selectCurrency={to}
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg"
            >
              Convert {from.toUpperCase()} to {to.toUpperCase()}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
