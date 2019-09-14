import React, { Component } from 'react'
import axios from 'axios'

export default class Calculator extends Component {
    constructor(props) {
        super(props);
        this.state = {
          price: [],
         
        };
        this.getResults = this.getResults.bind(this);
      }
    
      componentDidMount() {
        this.getChartData();
      }
     
    getChartData() {
        //Gather the prices
        axios.get('https://poloniex.com/public?command=returnOrderBook&currencyPair=USDT_BTC&depth=50').then(res => {
            this.setState({
                price : res.data.asks.slice(0)
               
              });  
        
        }).catch((error) => {
          // Error 😨
          if (error.response) {
              /*
               * The request was made and the server responded with a
               * status code that falls out of the range of 2xx
               */
              console.log(error.response.data);
              console.log(error.response.status);
              console.log(error.response.headers);
          } else if (error.request) {
              /*
               * The request was made but no response was received, `error.request`
               * is an instance of XMLHttpRequest in the browser and an instance
               * of http.ClientRequest in Node.js
               */
              console.log(error.request);
          } else {
              // Something happened in setting up the request and triggered an Error
              console.log('Error', error.message);
          }
          console.log(error.config);
      });
      }

      getResults(){
      let prices = this.state.price.map(function (subarray) {
      return subarray.slice(1)
  })}
      
    
    render() {
        return (
            <div>              {this.state.price}
            </div>
        )
    }
}
