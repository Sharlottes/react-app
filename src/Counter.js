import React from 'react';

class Counter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 1000,
            tap: {
                amount: 1,
                cost: 100,
                multiplier: 1,
            },
            auto: {
                amount: 0,
                cost: 1000,
                multiplier: 1
            }
        };

        setInterval(() => {
            var isOverStackTap = this.state.count >= this.state.tap.cost * 3;
            var isOverStackAuto = this.state.count >= this.state.auto.cost * 2;
            var warntap = document.getElementById("warntap");
            var warnauto = document.getElementById("warnauto");

            //warntap.style.visibility = isOverStackTap;
            warnauto.style.visibility = isOverStackAuto;
            warntap.style.display = isOverStackTap ? 'inline' : 'none';
            warnauto.style.display = isOverStackAuto ? 'inline' : 'none';

            this.setState({
                count: Number((this.state.count + this.state.auto.amount * this.state.auto.multiplier).toFixed(2)),
                tap: {
                    amount: this.state.tap.amount,
                    cost: this.state.tap.cost,
                    multiplier: (isOverStackTap ? 0.5 : 1)
                },
                auto: {
                    amount: this.state.auto.amount,
                    cost: this.state.auto.cost,
                    multiplier: (isOverStackAuto ? 0.5 : 1)
                }
            })
        }, 100);

        document.addEventListener('click', e => this.increment());
    }

    increment() {
        this.setState({
            count: this.state.count + this.state.tap.amount * this.state.tap.multiplier
        });
    };

    auto() {
        if (this.state.count >= this.state.auto.cost) {
            this.setState({
                count: this.state.count - this.state.auto.cost,
                auto: {
                    amount: this.state.auto.amount + 0.1,
                    cost: Number((this.state.auto.cost * 1.75).toFixed(0)),
                    multiplier: this.state.auto.multiplier
                }
            })
        } else {
            alert(`not enough count to upgrade! : ${this.state.auto.cost} count`);
        }
    }

    upgrade() {
        if (this.state.count >= this.state.tap.cost) {
            this.setState({
                count: this.state.count - this.state.tap.cost,
                tap: {
                    amount: this.state.tap.amount + 1,
                    cost: Number((this.state.tap.cost * 1.30).toFixed(0)),
                    multiplier: this.state.tap.multiplier
                }
            })
        } else {
            alert(`not enough count to upgrade! : ${this.state.tap.cost} count`);
        }
    }

    render() {
        var { count, tap, auto } = this.state;
        return (
            <div>
                <h1>Count: {count}</h1>
                <button className='upgrade1' onClick={(e) => this.upgrade(e)}>
                    Upgrade: {tap.amount} -&gt; {tap.amount + 1}<br />
                    Cost: {tap.cost}</button>
                <button className='auto1' onClick={(e) => this.auto(e)}>
                    Auto: {auto.amount * 10}/s -&gt; {(auto.amount + 0.1) * 10}/s<br />
                    Cost: {auto.cost}</button><br />
                <span id="warntap" color="red">경고: 카운트가 너무 많아 탭 효율이 하락합니다: 50%</span><br/>
                <span id="warnauto" color="red">경고: 카운트가 너무 많아 자동 효율이 하락합니다: 50%</span>
            </div>
        );
    }
};



export default Counter;