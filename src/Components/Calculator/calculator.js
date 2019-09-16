import React, {Component} from 'react';
import axios from 'axios';

import {Button} from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';


export default class Calculator extends Component {
  constructor (props) {
    super (props);
    this.state = {
      priceA: [],
      priceB: [],
      lowest: [],
      highest:[],
      exchange:true,
      orderType:false
    };
    this.getSorted = this.getSorted.bind (this);
    this.onClickHandlerBuy =this.onClickHandlerBuy.bind(this);
    this.onClickHandlerSell =this.onClickHandlerSell.bind(this);
  }
  onClickHandlerBuy(){
    this.setState ({orderType :true} )
      
  }
  onClickHandlerSell(){
    this.setState ({orderType :false} )

  }

  componentDidMount () {
    this.getChartData ();
  }

  getChartData () {
    //Gather the prices
    axios
      .get (
        'https://poloniex.com/public?command=returnOrderBook&currencyPair=USDT_BTC&depth=50'
      )
      .then (res => {
        this.setState ({
          priceA: res.data.asks.map (row => row[0]),
        });
      })
      .catch (error => {
        // Error 😨
        if (error.response) {
          /*
               * The request was made and the server responded with a
               * status code that falls out of the range of 2xx
               */
          console.log (error.response.data);
          console.log (error.response.status);
          console.log (error.response.headers);
        } else if (error.request) {
          /*
               * The request was made but no response was received, `error.request`
               * is an instance of XMLHttpRequest in the browser and an instance
               * of http.ClientRequest in Node.js
               */
          console.log (error.request);
        } else {
          // Something happened in setting up the request and triggered an Error
          console.log ('Error', error.message);
        }
        console.log (error.config);
      });
    axios
      .get (
        'https://poloniex.com/public?command=returnOrderBook&currencyPair=USDC_BTC&depth=50'
      )
      .then (res => {
        this.setState ({
          priceB: res.data.asks.map (row => row[0]),
        });
      })
      .catch (error => {
        // Error 😨
        if (error.response) {
          /*
               * The request was made and the server responded with a
               * status code that falls out of the range of 2xx
               */
          console.log (error.response.data);
          console.log (error.response.status);
          console.log (error.response.headers);
        } else if (error.request) {
          /*
               * The request was made but no response was received, `error.request`
               * is an instance of XMLHttpRequest in the browser and an instance
               * of http.ClientRequest in Node.js
               */
          console.log (error.request);
        } else {
          // Something happened in setting up the request and triggered an Error
          console.log ('Error', error.message);
        }
        console.log (error.config);
      });
  }
  getSorted () {
    const lengthA = this.state.priceA.length;
    const lengthB = this.state.priceB.length;

    this.state.priceA.sort ((a, b) => a - b);
    this.state.priceB.sort ((a, b) => a - b);
    if (this.state.priceA[0] > this.state.priceB[0]) {
      this.setState ({lowest: this.state.priceB[0] , exchange:false} );
    }
    if (this.state.priceA[0] < this.state.priceB[0]) {
      this.setState ({lowest: this.state.priceA[0] , exchange: true});
    }
    if (this.state.priceA[0] === this.state.priceB[0]) {
      this.setState ({lowest: this.state.priceA[0] , exchange: true});
    }
    if (this.state.priceA[lengthA -1 ] > this.state.priceB[lengthB -1]) {
      this.setState ({highest: this.state.priceA[0] ,  exchange: true});
    }
    if (this.state.priceA[lengthA -1] < this.state.priceB[lengthB -1]) {
      this.setState ({highest: this.state.priceB[0] ,  exchange: false});
    }
    if (this.state.priceA[lengthA -1] === this.state.priceB[lengthB -1]) {
      this.setState ({highest: this.state.priceA[0],  exchange: true});
    }
  }
  render () {
    const orderType = this.state.orderType;
    const exchange = this.state.exchange;


    const styles = {
      root: {
      marginRight: 50,
      marginLeft: 50,
      marginTop: 20 ,
      overflowX: 'auto',
      overflowY: 'auto',
    },
    textField :{
     
      marginRight: 15,
  
      
    },
    headerContainer: {
      
      alignItems: 'center',
      marginTop: 20,
      marginRight:50,
      marginLeft: 50,
      marginBottom: 20,
     
    },
    table: {
      minWidth: 650,
      marginRight: 5,
      marginLeft: 5,
    },
    button :{
      marginTop:20
     
    },
    orderType:{
      display: 'flex',
      flexWrap: 'wrap',  
    }
  }
    return (
      <div>
        
        <Paper style= {styles.root}> 
        <div style = {styles.headerContainer}>
          <h1>Click on the OrderType Button You want to continue </h1>
          <Button style ={styles.orderType}onClick = {this.onClickHandlerBuy}>
            Buy
          </Button>
          <Button style ={styles.orderType} onClick = {this.onClickHandlerSell}>
            Sell
            </Button>
        <TextField
                        label="$"
                        type="text"
                        name="firstName"
                        id="edit-fname-admin"
                        style={styles.textField}
                        margin="normal"
                        variant="outlined"
                        
                      />
        <Button style={styles.button} onClick={this.getSorted}>Submit Your Desired Price for BTC </Button>
        
        { orderType ? (
        <h1>Best Price Available to Buy:${this.state.lowest}</h1>
      
      ) : (
          <h1>Best Price Available for Sell:${this.state.highest}</h1>
      )} 
          
          { exchange ? (
        <h1>Use: Exhange A</h1>
      
      ) : (
          <h1>Use: Exhange B </h1>
      )} 
      </div>
      </Paper>
      </div>
    )
  }
}