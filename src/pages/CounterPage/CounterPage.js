import React, { useState } from "react";
import { useIntl } from "react-intl";
import { useSelector, useDispatch } from "react-redux";

import "./counter-page.scss";
import {
  decrement,
  increment,
  incrementByAmount,
  incrementAsync,
} from "./slice";
import { selectCount, selectPending, selectError } from "./selectors";
import messages from "./messages";

function CounterPage() {
  const count = useSelector(selectCount);
  const intl = useIntl();
  const isPending = useSelector(selectPending);
  const error = useSelector(selectError);
  const dispatch = useDispatch();
  const [incrementAmount, setIncrementAmount] = useState("2");

  return (
    <div className="counter-page">
      <div className="counter-page__row">
        <button
          className="counter-page__button"
          aria-label={intl.formatMessage(messages.plus)}
          onClick={() => dispatch(increment())}
        >
          +
        </button>
        <span className="counter-page__value" data-testid="counter-value">
          {count}
        </span>
        <button
          className="counter-page__button"
          aria-label={intl.formatMessage(messages.minus)}
          onClick={() => dispatch(decrement())}
        >
          -
        </button>
      </div>
      <div className="counter-page__row">
        <input
          className="counter-page__textbox"
          aria-label={intl.formatMessage(messages.setIncrementAmount)}
          type="number"
          value={incrementAmount}
          onChange={(e) => setIncrementAmount(e.target.value)}
        />
        <button
          className="counter-page__button"
          onClick={() =>
            dispatch(incrementByAmount(Number(incrementAmount) || 0))
          }
        >
          {intl.formatMessage(messages.addAmount)}
        </button>
        <button
          className="counter-page__button counter-page__button--progress"
          onClick={() => dispatch(incrementAsync(Number(incrementAmount) || 0))}
        >
          {intl.formatMessage(messages.addAsync)}
        </button>
      </div>
      <div className="counter-page__row">
        {!error && <p>{intl.formatMessage(messages.errorTip)}</p>}
        {error && (
          <p className="counter-page__error">
            {intl.formatMessage(messages.error, { error })}
          </p>
        )}
      </div>
      <div className="counter-page__row">
        <code className="counter-page__debug">
          {JSON.stringify(
            {
              count,
              isPending,
              error,
            },
            null,
            2
          )}
        </code>
      </div>
    </div>
  );
}

export default CounterPage;
