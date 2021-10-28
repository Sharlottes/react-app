import React from 'react';
import './Counter.css';

class Counter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 10000,
            tap: {
                amount: 1,
                cost: 100,
                multiplier: 1,
                auto: false
            },
            auto: {
                amount: 0,
                cost: 1000,
                multiplier: 1,
                auto: false
            },
            random: {
                amount: 0,
                cost: 5000,
                result: 0,
                auto: false
            }
        };

        setInterval(() => { //call every 0.1sec
            var isOverStackTap = this.state.count >= this.state.tap.cost * 3;
            var isOverStackAuto = this.state.count >= this.state.auto.cost * 2;
            var warntap = document.getElementById("warntap");
            var warnauto = document.getElementById("warnauto");

            warntap.style.display = isOverStackTap ? 'inline' : 'none';
            warnauto.style.display = isOverStackAuto ? 'inline' : 'none';

            if(this.state.tap.auto && this.state.count >= this.state.tap.cost) this.upgrade();
            if(this.state.auto.auto && this.state.count >= this.state.auto.cost) this.auto(); 
            if(this.state.random.auto && this.state.count >= this.state.random.cost) this.random(); 

            this.setState({
                count: Number((this.state.count + this.state.auto.amount * this.state.auto.multiplier).toFixed(2)),
                tap: {
                    amount: this.state.tap.amount,
                    cost: this.state.tap.cost,
                    multiplier: (isOverStackTap ? 0.5 : 1),
                    auto: this.state.tap.auto
                },
                auto: {
                    amount: this.state.auto.amount,
                    cost: this.state.auto.cost,
                    multiplier: (isOverStackAuto ? 0.5 : 1),
                    auto: this.state.auto.auto
                }
            })
        }, 100);

        //call increment when tap anywhere or press anykey.
        window.addEventListener('click', e => this.increment());
        window.addEventListener("keydown", e => this.increment());
    }

    increment() {
        this.setState({
            count: this.state.count + this.state.tap.amount * this.state.tap.multiplier
        });
    };

    upgrade() {
        if (this.state.count >= this.state.tap.cost) {
            this.setState({
                count: this.state.count - this.state.tap.cost,
                tap: {
                    amount: this.state.tap.amount + 1,
                    cost: Number((this.state.tap.cost * 1.30).toFixed(0)),
                    multiplier: this.state.tap.multiplier,
                    auto: this.state.tap.auto
                }
            })
        } else {
            alert(`not enough count to upgrade! : ${this.state.tap.cost} count`);
        }
    }

    auto() {
        if (this.state.count >= this.state.auto.cost) {
            this.setState({
                count: this.state.count - this.state.auto.cost,
                auto: {
                    amount: this.state.auto.amount + 0.1,
                    cost: Number((this.state.auto.cost * 1.75).toFixed(0)),
                    multiplier: this.state.auto.multiplier,
                    auto: this.state.auto.auto
                }
            })
        } else {
            alert(`not enough count to ${this.state.auto.amount > 0 ? 'upgrade' : 'buy'}! : ${this.state.auto.cost} count`);
        }
    }

    random() {
        if (this.state.count >= this.state.random.cost) {
            var rand = Math.random();
            var result = Number(((rand > 0.5 ? -1 : rand < 0.5 ? 1 : 0) * Math.random() * this.state.random.cost).toFixed(2));
            this.setState({
                count: this.state.count + (this.state.random.amount === 0 ? -this.state.random.cost : result),
                random: {
                    amount: 1,
                    cost: 1000,
                    result: this.state.random.amount === 0 ? 0 : result,
                    auto: this.state.random.auto
                }
            })
        } else {
            alert(`not enough count to ${this.state.random.amount > 0 ? 'start' : 'buy'}! : ${this.state.random.cost} count`);
        }
    }

    autobuy(e) {
        e.stopPropagation();
        if(e.target == document.getElementById('selfbuy')) {
            var {amount, cost, multiplier, auto} = this.state.tap;
            this.setState({
                tap: {
                    amount: amount,
                    cost: cost,
                    multiplier: multiplier,
                    auto: !auto
                }
            })
            console.log(this.state.tap.auto);
        } else if(e.target == document.getElementById('autobuy')) {
            var {amount, cost, multiplier, auto} = this.state.auto;
            this.setState({
                auto: {
                    amount: amount,
                    cost: cost,
                    multiplier: multiplier,
                    auto: !auto
                }
            })
        } else if(e.target == document.getElementById('randombuy')) {
            var {amount, cost, multiplier, auto} = this.state.random;
            this.setState({
                random: {
                    amount: amount,
                    cost: cost,
                    multiplier: multiplier,
                    auto: !auto
                }
            })
        }
    }

    render() {
        var { count, tap, auto, random } = this.state;
        return (
            <div>
                <h1>Count: {Number(count.toFixed(2))}</h1>
                <button className='ripple' onClick={(e) => this.upgrade(e)}>
                    <b>SELF TAP</b><br />
                    Upgrade: {tap.amount}/tap -&gt; {tap.amount + 1}/tap<br />
                    Cost: {tap.cost}<br />
                    <label>
                        <b>AUTO BUYING</b><br />
                        <input type="checkbox" id="selfbuy" onClick={e => this.autobuy(e)} />
                        <i />
                    </label>
                </button>

                <button className='ripple' onClick={(e) => this.auto(e)}>
                    <b>AUTO TAP</b><br />
                    {auto.amount > 0 ? "Upgrade" : 'Buy'}: {Number((auto.amount * 10).toFixed(2))}/s -&gt; {Number(((auto.amount + 0.1) * 10).toFixed(2))}/s<br />
                    Cost: {auto.cost}<br />
                    <label>
                        <b>AUTO BUYING</b><br />
                        <input type="checkbox" id="autobuy" onClick={e => this.autobuy(e)} />
                        <i />
                    </label>
                </button>

                <button className='ripple' onClick={(e) => this.random(e)}>
                    <b>RANDOM</b><br />
                    {random.amount > 0 ? "Start" : 'Buy'}<br />
                    Cost: {random.cost}<br />
                    you got: {random.result}<br />
                    <label>
                        <b>AUTO BUYING</b><br />
                        <input type="checkbox" id="randombuy" onClick={e => this.autobuy(e)} />
                        <i />
                    </label>
                </button><br /><br />

                <span id="warntap" color="red" style={{ display: count >= tap.cost * 3 ? 'inline' : 'hidden' }}>Warning: you have too many counts. self-tap efficient is decreased to <b>{this.state.tap.multiplier * 100}%</b>({this.state.tap.amount * this.state.tap.multiplier}/tap)</span><br />
                <span id="warnauto" color="red" style={{ display: count >= auto.cost * 2 ? 'inline' : 'hidden' }}>Warning: you have too many counts. auto-tap efficient is decreased to <b>{this.state.tap.multiplier * 100}%</b>({Number((this.state.auto.amount * 10).toFixed(2)) * this.state.auto.multiplier}/s)</span>
            </div>
        );
    }
};



export default Counter;