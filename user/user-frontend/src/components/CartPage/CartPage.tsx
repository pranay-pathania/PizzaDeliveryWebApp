// importing from libraries
import React, { useContext, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

// importing AppContext
import { AppContext } from '../../App'

// importing components
import CartComponent from '../CartComponent/CartComponent'
import NotLoggedIn from '../NotLoggedIn/NotLoggedIn'

// importing utilities
import { CartFormInterface, CartItemInterface, initialCartFormState } from '../../utils'
import { ModalCommand, TypeOfModal } from '../../utils'
import { isValidEmail, isPhoneNumberValid } from '../../utils'

// stylesheet
import './CartPage.css'


// CartPage Functional Component
const CartPage: React.FC = () => {

    /* APPCONTEXT */

    // getting required values from AppContext
    const { userHasLoggedIn, cart, emptyCart, modalAction } = useContext(AppContext)




    /* STATE VALUES */

    // state value to finalise the order
    // cart cannot be changed when order is finalised
    // this is so that cart cannot be accidentally changed in the cart page while filling the form
    const [isOrderFinalised, setIsOrderFinalised] = useState<boolean>(false)

    // state value for the form
    // this takes information required for home delivery
    const [orderForm, setOrderForm] = useState<CartFormInterface>(initialCartFormState)





    /* FUNCTIONS */


    // tracks changes in the form input
    const trackOrderFormChanges = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setOrderForm(prev => {
            return {
                ...prev,
                [name]: value
            }
        })
    }


    // finalises the order if cart is not empty
    const finaliseOrder = () => {
        if (cart.length !== 0) {
            setIsOrderFinalised(!isOrderFinalised)
        } else {
            modalAction(ModalCommand.OPEN, { text: `Your cart is empty. You can't order NOTHINGNESS. That's senseless.`, type: TypeOfModal.WARNING })
        }
    }


    // calculates the total cost of all items
    // the final money that needs to be paid
    const calculateTotalCost = (cart: CartItemInterface[]): number => {
        let totalMoney: number = 0
        cart.forEach(item => {
            totalMoney += item.total_cost
        })
        return parseFloat(totalMoney.toFixed(2))
    }


    // function for placing order
    const placeOrder = () => {
        if (!isValidEmail(orderForm.email) || !isPhoneNumberValid(orderForm.phone_no)) {

            // modal for when email or phone number is invalid
            modalAction(ModalCommand.OPEN, { text: `Check your entries`, type: TypeOfModal.WARNING })

        } else {

            try {

                // calculate total cost
                const total_cost = calculateTotalCost(cart)

                // configure the object to be posted
                const orderToBeSent = {
                    name: orderForm.name,
                    email: orderForm.email,
                    phone_number: orderForm.phone_no,
                    address: orderForm.address,
                    order: {
                        date: new Date().toString(),
                        cart: cart,
                        total_cost: total_cost,
                        payment_method: orderForm.payment_options,
                    },
                    completed: false,
                    cancelled: false
                }

                //post the object
                axios.post('http://localhost:1000/place-order', orderToBeSent)

                //order was successful
                modalAction(ModalCommand.OPEN, { text: `Order was successful. Will be delivered within 30 minutes.`, type: TypeOfModal.ALERT })

                //empty the cart after placing order
                emptyCart()

            } catch (error) {

                //order could not be placed
                modalAction(ModalCommand.OPEN, { text: `Order could not be placed. Please try after some time.`, type: TypeOfModal.ALERT })

                //not for the user
                console.log(error)
            }

        }
    }





    /* RENDER */

    return <>
        {!userHasLoggedIn ?
            // displays if not logged in
            <NotLoggedIn /> :
            <>

                {/* cart heading */}
                <div className="cart-bg"></div>
                <header className="cart-header">
                    <h1>Your Cart</h1>
                </header>

                {/* user's cart */}
                <CartComponent isOrderFinalised={isOrderFinalised} />


                {/* user filled ordering form */}
                <div className="order-form-container">
                    <button className="finalise-order" onClick={finaliseOrder}>{isOrderFinalised ? "Go Back" : "Confirm Order Items"}</button>
                    {!isOrderFinalised ?

                        // form cannot be accessed unless order is finalised
                        <div className="order-form">
                            <h1 className="finalise-heading">Confirm your order!</h1>
                            <p className="finalise-p">Click that button on top.</p>
                        </div> :

                        // ordering form container
                        <div className="order-form">
                            <h1>Just some final details...</h1>

                            {/* ordering forms */}
                            <div className="of-container">

                                {/* name */}
                                <input type="text" placeholder="Name" name="name" value={orderForm.name} onChange={trackOrderFormChanges} />

                                {/* email */}
                                <input type="text" placeholder="Email" name="email" value={orderForm.email} onChange={trackOrderFormChanges} />

                                {/* phone number */}
                                <input type="text" placeholder="Phone no." name="phone_no" value={orderForm.phone_no} onChange={trackOrderFormChanges} />

                                {/* payment types: radio buttons */}
                                <div className="payment-type">
                                    <label>Payment method:</label>
                                    <div>

                                        <div>
                                            <input type="radio" name="payment_options" value="Payment on Delivery" onChange={trackOrderFormChanges} />
                                            <label>Payment on Delivery</label>
                                        </div>

                                        {/* For future changes, when online payment can be implemented by me */}
                                        {/* <div>
                                        <input type="radio" name="payment_options" value="Card Payment" onChange={trackOrderFormChanges}/>
                                        <label>Card Payment</label>
                                    </div> */}
                                    </div>
                                </div>

                                {/* address */}
                                <textarea name="address" placeholder="Address" value={orderForm.address} onChange={trackOrderFormChanges} />
                            </div>

                            {/* submit order */}
                            <Link to="/"><button className="submit-order" onClick={placeOrder}>Place Order</button></Link>

                        </div>}
                </div>
            </>}
    </>
}

export default CartPage
