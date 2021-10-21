import React from 'react';

class Counter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        count: 0
        };
    }
  
    // change code below this line
  
    increment() {
        this.setState({
            count: this.state.count + 1
        });
    };
    
    decrement() {
        this.setState({
            count: this.state.count - 1
        });
    };
  
    reset() {
        this.setState({
            count: 0
        });
    };
  
    // change code above this line
    render() {
        return (
            <div>
                <h1>Count: {this.state.count}</h1>
                <button className='inc' onClick={(e) => this.increment(e)}>+1</button>
                <button className='dec' onClick={(e) => this.decrement(e)}>-1</button><br/>
                <button className='reset' onClick={(e) => this.reset(e)}>Reset</button>
            </div>
        );
    }
};


export default Counter;