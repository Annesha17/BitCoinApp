import React from 'react';

const Display =(props) =>(
    
    <div>
        {console.log(props)}
        <table className="table">
            <thead>
                <th className="text-uppercase text-center"></th>
                <th className="text-uppercase text-center">Before</th>
                <th className="text-uppercase text-center">After</th>

                </thead>
            <tbody className="table-body">
            <tr><td><i className="fa fa-usd fa-lg"></i></td><td>{props.prices.USD.previousRate}</td><td>{props.prices.USD.currentRate}</td></tr>
            <tr><td><i className="fa fa-gbp fa-lg"></i></td><td>{props.prices.GBP.previousRate}</td><td>{props.prices.GBP.currentRate}</td></tr>
            <tr><td><i className="fa fa-eur fa-lg"></i></td><td>{props.prices.EUR.previousRate}</td><td>{props.prices.GBP.currentRate}</td></tr>
            <tr><td><select name="currency"
                            id="currency"
                            className="currency form-control mx-auto" onChange={props.onCurrencyChange}>
                            {
                            props.currencies && props.currencies.map(
                                (currency)=>(
                                    <option key={currency.currency} value={currency.currency}>
                                    {currency.currency} 
                                    </option>
                                )
                            )
                            }
                            </select></td><td>{props.prices.SELECTED && props.prices.SELECTED.previousRate}</td><td>{props.prices.SELECTED && props.prices.SELECTED.currentRate}</td></tr>
            </tbody>
        </table>
    </div>
)

export default Display;
