import React from "react";
import ReactDOM from "react-dom";

/**
 * @props
 * toPay={this.state.total}
 * transactionError={(data)=> this.transactionError(data)}
 * transactioncancelled={(data)=> this.transactioncancelled(data)}
 * onSuccess={(data)=> this.transactionSuccess(data)}
 */

const PayPalButton = window.paypal.Buttons.driver("react", { React, ReactDOM });

export default function Paypal(props) {
  const createOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            currency_code: "EUR",
            value: props.toPay,
            breakdown: {
              item_total: { currency_code: "EUR", value: props.toPay },
              shipping: { currency_code: "EUR", value: 0 },
              tax_total: { currency_code: "EUR", value: 0 },
            },
          },
        },
      ],
    });
  };

  const onApprove = (data, actions) => {
    return actions.order.capture().then(function (details) {
      props.onSuccess(details);
    });
  };
  return (
    <PayPalButton
      style={{ color: "blue", label: "pay", height: 50, shape: "rect" }}
      createOrder={(data, actions) => createOrder(data, actions)}
      onApprove={(data, actions) => onApprove(data, actions)}
      onError={(err) => props.transactionError(err)}
    />
  );
}
