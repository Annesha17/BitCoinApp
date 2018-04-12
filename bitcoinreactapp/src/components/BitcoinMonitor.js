import React,{Component} from 'react';
import Display from './Display';
import { BitcoinService}  from '../services/BitcoinService';
import { CurrencyService } from '../services/CurrencyService';

const bitcoinService = new BitcoinService();
const currencyService= new CurrencyService();

const mapToPrice=(currentPrice,previousPrice)=>{
return {

code: currentPrice.code,
        description: currentPrice.description,
        currentRate: currentPrice.currentRate,
        previousRate: previousPrice ? previousPrice.currentRate : 0

};

}
class BitcoinMonitor extends Component{

constructor(props){
    super(props);

    this.state={
        prices:{},
        ready:false,
        currencies:[]
    }
    // this.loadSupportedCurrencies = this.loadSupportedCurrencies.bind(this);
     this.loadBitcoinPriceIndex=this.loadBitcoinPriceIndex.bind(this);
     this.handleCurrencyChange=this.handleCurrencyChange.bind(this);
     this.handleOnRefresh=this.handleOnRefresh.bind(this);
}


handleOnRefresh(){
    if(this.state.prices.SELECTED){
        const currency=this.state.prices.SELECTED.code;
        bitcoinService.getPrice(currency)
    .then(
        (price)=>{
            if (price) {
                        this.loadBitcoinPriceIndex(price);
                    } else {
                        this.loadBitcoinPriceIndex();
                    }
        })
    }
    else {
            this.loadBitcoinPriceIndex();
        }


}


handleCurrencyChange(event){
    const currency=event.target.value;
    
    bitcoinService.getPrice(currency)
    .then(
        (price)=>{
            if(price){
                
                        this.setState(prevState => {
                        const prices = prevState.prices;
                        prices.SELECTED = mapToPrice(price[currency], prevState.prices[currency]);
                        return { prices: prices };
                    });
                        
            }}
                )
            }
        

    




loadSupportedCurrencies(){
    this.setState({currencies:currencyService.getSupportedCurrencies()})
}

loadBitcoinPriceIndex(additionalPrice){
    bitcoinService
            .getPrices()
            .then((prices)=>{
                console.log("prices=");
                console.log(prices);
                this.setState((prevState)=>{
                        const newPrice={
                            EUR:mapToPrice(prices.EUR,prevState.prices.EUR),
                            GBP:mapToPrice(prices.GBP,prevState.prices.GBP),
                            USD:mapToPrice(prices.USD,prevState.prices.USD),

                        }

                if (additionalPrice) {
                            newPrice.SELECTED = mapToPrice(
                                Object.values(additionalPrice)[0],
                                prevState.prices.SELECTED);
                        }

                        return({prices:newPrice, ready: true})
                })
                                 
            }
            )
            
}

componentDidMount(){
    this.loadSupportedCurrencies();
    this.loadBitcoinPriceIndex();
}

    render(){
        return(
             this.state.ready === true && <div>
            
            <Display prices={this.state.prices} currencies={this.state.currencies} onCurrencyChange={this.handleCurrencyChange}/>
            <div className="mt-5 text-center">
                    <button className="btn btn-lg btn-refresh" onClick={this.handleOnRefresh}>
                        <i className="fa fa-refresh fa-lg"></i>
                    </button>
                </div>
                </div>
        )
    }

}

export default BitcoinMonitor;