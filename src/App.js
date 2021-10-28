import React from 'react';
import Counter from './Counter';

class App extends React.Component {
  render() {
    return (
      <div onContextMenu={
        (e) => {
            e.preventDefault();
        }
    }>
        <Counter />
      </div>
    )
  }
}

export default App;