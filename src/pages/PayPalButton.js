import React, { useRef, useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PayPalButton = ({ onSuccess }) => {
  const paypalRef = useRef();

  useEffect(() => {
    if (paypalRef.current && !paypalRef.current.hasChildNodes()) {
      window.paypal.Buttons({
        createOrder: (data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: '10.00', // Amount in USD
                },
              },
            ],
          });
        },
        onApprove: async (data, actions) => {
          const order = await actions.order.capture();
          onSuccess(order);
        },
        onError: (err) => {
          console.error(err);
          toast.error('Payment failed. Please try again.');
        },
      }).render(paypalRef.current);
    }
  }, [onSuccess]);

  return <div ref={paypalRef} />;
};

export default PayPalButton;
