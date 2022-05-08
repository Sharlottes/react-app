import React, { useState } from "react";
import "./Counter.css";
import NormalCounter from "./NormalCounter";
import AutoCounter from "./AutoCounter";

function Counter() {
  const [state, setState] = useState({
    count: 10000,
  });

  return (
    <div>
      <h1>Count: {Number(state.count.toFixed(2))}</h1>
      <NormalCounter state={state} setState={setState} />
      <AutoCounter state={state} setState={setState} />
    </div>
  );
}

export default Counter;
