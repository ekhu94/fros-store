import React, { useEffect, useRef } from 'react';

const Paypal = ({ total }) => {

    const paypal = useRef();

    useEffect(() => {
        const subTotal = parseFloat(total)
        //! right now, total being passed into value crashes the Paypal window
        window.paypal.Buttons({
            createOrder: (data, actions, err) => {
                return actions.order.create({
                    intent: 'CAPTURE',
                    purchase_units: [
                        {
                            description: 'Session Cart',
                            amount: {
                                currency_code: "USD",
                                value: subTotal
                            }

                        }
                    ]
                })
            },
            onApprove: async (data, actions) => {
                const order = await actions.order.capture();
                console.log(order);
            },
            onError: err => console.log(err)
        }).render(paypal.current)
    }, []);

    return (
        <div>
            <div ref={paypal}>

            </div>
        </div>
    );
};

export default Paypal;