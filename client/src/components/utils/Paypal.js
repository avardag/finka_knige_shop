import React, { Component } from 'react';
import PaypalExpressBtn from 'react-paypal-express-checkout';

/**
 * @props 
 * toPay={this.state.total}
 * transactionError={(data)=> this.transactionError(data)}
 * transactioncancelled={(data)=> this.transactioncancelled(data)}
 * onSuccess={(data)=> this.transactionSuccess(data)}
 */
class Paypal extends Component {
  render() {
    const onSuccess = (payment) => {
      // Congratulation, it came here means everything's fine!
      // console.log("The payment was succeeded!", payment);
      // You can bind the "payment" object's value to your state or props or whatever here, please see below for sample returned data
      this.props.onSuccess(payment);
      // response = {
      //   address: {
      //     city: "Dubai",
      //     country_code: "AE",
      //     line1: "Free Trade Zone",
      //     postal_code: "971",
      //     recipient_name: "test buyer",
      //     state: ""
      //   },
      //   cancelled: false,
      //   email: "mike-buyer@yahoo.com",
      //   paid: true,
      //   payerID: "U53KG42JTWCPL",
      //   paymentID: "PAYID-LSE7JUY9P119479C4402520F",
      //   paymentToken: "EC-2B5618003J396400S",
      //   returnUrl: "https://www.paypal.com/checkoutnow/eKG42JTWCPL"
      // }
    }

      const onCancel = (data) => {
        // User pressed "cancel" or close Paypal's popup!
        console.log('The payment was cancelled!', data);
        // You can bind the "data" object's value to your state or props or whatever here, please see below for sample returned data
      }

      const onError = (err) => {
        // The main Paypal's script cannot be loaded or somethings block the loading of that script!
        console.log("Error!", err);
        // Because the Paypal's main script is loaded asynchronously from "https://www.paypalobjects.com/api/checkout.js"
        // => sometimes it may take about 0.5 second for everything to get set, or for the button to appear
      }

      let env = 'sandbox'; // you can set here to 'production' for production
      let currency = 'USD'; // or you can set this value from your props or state
      let total = this.props.toPay; // same as above, this is the total amount (based on currency) to be paid by using Paypal express checkout

      const client = {
        sandbox: 'AT9ZHoJH2N3JgMu7pCWml_txxQhD8SM3Cxs5TDfa69EYTnBJEy8hpjNQmMvvm_fGuBtocfPJ9XyxtEM1',
        production: 'YOUR-PRODUCTION-APP-ID',
      }
      return (
        <div>
          <PaypalExpressBtn
            env={env}
            client={client}
            currency={currency}
            total={total}
            onError={onError}
            onSuccess={onSuccess}
            onCancel={onCancel}
            style={{
              size: "large",
              color: "blue",
              shape: "rect",
              label: "checkout",
            }}
          />
        </div>
      );
    }
  }

  export default Paypal;