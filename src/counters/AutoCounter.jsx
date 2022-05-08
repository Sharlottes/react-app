import React, { useState } from "react";

function AutoCounter(props) {
  const [state, setState] = useState({
    amount: 0,
    cost: 100,
    multiplier: 1,
    auto: false,
  });

  //0.1s마다 카운트
  setInterval(() => {
    if (state.auto && props.state.count >= state.cost) upgrade();
    props.setState({
      ...props.state,
      count: Number(
        (props.state.count + state.amount * state.multiplier).toFixed(2)
      ),
    });
  }, 100);

  const upgrade = () => {
    var { amount, cost } = state;
    if (props.count >= cost) {
      props.setState({
        ...props.state,
        count: props.state.count - cost,
      });
      setState({
        ...state,
        amount: amount + 0.1,
        cost: Number((cost * 1.75).toFixed(0)),
      });
    } else {
      alert(`not enough count to upgrade! : ${cost} count`);
    }
  };

  return (
    <button className="ripple" onClick={(e) => upgrade()}>
      <b>AUTO TAP</b>
      <br />
      {state.amount > 0 ? "Upgrade" : "Buy"}:{" "}
      {Number((state.amount * 10).toFixed(2))}/s -&gt;{" "}
      {Number(((state.amount + 0.1) * 10).toFixed(2))}/s
      <br />
      Cost: {state.cost}
      <div>
        <label>
          <b>AUTO BUYING</b>
          <input
            type="checkbox"
            onClick={(e) =>
              setState({
                tap: {
                  ...state,
                  auto: !state.auto,
                },
              })
            }
          />
          <i />
        </label>
      </div>
    </button>
  );
}
export default AutoCounter;
