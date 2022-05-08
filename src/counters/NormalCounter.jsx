import React, { useState, useEffect } from "react";

function NormalCounter(props) {
  const [state, setState] = useState({
    amount: 1,
    cost: 100,
    multiplier: 1,
    auto: false,
  });
  let timer;
  useEffect(() => {
    if (!timer) clearInterval(timer);
    timer = setInterval(() => {
      if (state.auto && props.state.count >= state.cost) upgrade();
    }, 100);
  }, [state]);

  //화면 클릭 시 카운트
  const inc = () =>
    props.setState({
      ...props.state,
      count: props.state.count + state.amount * state.multiplier,
    });
  window.addEventListener("click", (e) => inc());
  window.addEventListener("keydown", (e) => inc());

  const upgrade = () => {
    var { amount, cost } = state;
    if (props.count >= cost) {
      props.setState({
        ...props.state,
        count: props.state.count - cost,
      });
      setState({
        ...state,
        amount: amount + 1,
        cost: Number((cost * 1.3).toFixed(0)),
      });
    } else {
      alert(`not enough count to upgrade! : ${cost} count`);
    }
  };

  return (
    <button
      className="ripple"
      onContextMenu={(e) => alert(e)}
      onClick={(e) => upgrade()}
    >
      <div>
        <b>SELF TAP</b>
        <br />
        Upgrade: {state.amount}/tap -&gt; {state.amount + 1}/tap
        <br />
        Cost: {state.cost}
      </div>
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
    </button>
  );
}
export default NormalCounter;
