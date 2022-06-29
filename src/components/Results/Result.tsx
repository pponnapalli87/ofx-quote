import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import numeral from 'numeral';

import './Results.scss';

import { GlobalContext } from 'context';
import { QuoteObject } from 'model';
import { formatCurrencyAsString, isEmpty } from 'utils';

const Result = () => {
  const appContext = useContext(GlobalContext);
  const history = useHistory();
  const quotes = appContext.state.quotes as QuoteObject;
  const fromCurrency = appContext.state.fromCurrency;
  const toCurrency = appContext.state.toCurrency;
  const requestedAmount = appContext.state.amount;
  const calculatedAmount = quotes.CustomerRate * numeral(requestedAmount).value();

  useEffect(() => {
    if (isEmpty(quotes) || !requestedAmount) {
      history.push('/');
    }
  }, [quotes, requestedAmount, history]);

  const handleClick = () => {
    history.push('/');
  };

  if (isEmpty(quotes) || !requestedAmount) {
    return null;
  }

  return (
    <div className="quote-result bg-light round">
      <div className="customer_rate">
        <label className="h5">OFX Customer Rate</label>
        <p className="bold text-success text-center">{quotes.CustomerRate}</p>
      </div>
      <div className="details">
        <label className="h5">From</label>
        <p className="bold currency p-0">
          {fromCurrency} <span className="pl-2 currency-color">{formatCurrencyAsString(requestedAmount)}</span>
        </p>
        <label className="h5">To</label>
        <p className="bold currency p-0">
          {toCurrency} <span className="pl-2 currency-color">{formatCurrencyAsString(calculatedAmount.toString())}</span>
        </p>
      </div>
      <button className="btn btn-primary" onClick={handleClick}>
        Start New Quote
      </button>
    </div>
  );
};

export default Result;
