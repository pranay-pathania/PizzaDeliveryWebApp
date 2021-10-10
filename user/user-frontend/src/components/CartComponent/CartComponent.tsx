// importing from libraries
import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

// importing AppContext
import { AppContext } from '../../App'

// importing utilities
import { CartItemInterface } from '../../utils'

// importing icons
import { BiUpArrow, BiDownArrow } from 'react-icons/bi'
import { RiDeleteBinFill } from 'react-icons/ri'

// stylesheet
import './CartComponent.css'


//props interface
interface Props {
    isOrderFinalised: boolean
}


// CartComponent Functional Component 
const CartComponent: React.FC<Props> = (props: Props) => {

    /* STATE VALUES */

    // state values for the total pieces of items and total price
    const [totals, setTotals] = useState({
        totalMoney: 0,
        totalQuantity: 0
    })





    /* APPCONTEXT */

    // getting required values from AppContext
    const { cart, removeFromCart, editCartItem } = useContext(AppContext)





    /* FUNCTIONS */

    // calculates total pieces and total cost
    const calculateTotals = (cart: CartItemInterface[]): void => {
        let totalMoney: number = 0
        let totalQuantity: number = 0
        cart.forEach(item => {
            totalMoney += item.total_cost
            totalQuantity += item.quantity
        })
        setTotals({
            totalMoney,
            totalQuantity
        })
    }


    // adds to item quantity from cart page 
    // adds to user convenience
    const addFromCartPage = (item: CartItemInterface) => {
        const singleitemPrice = item.total_cost / item.quantity
        if (item.quantity > 0 && item.quantity < 20) {
            item.quantity += 1
            item.total_cost += singleitemPrice
        }
        item.total_cost = JSON.parse(item.total_cost.toFixed(2))
        editCartItem(item)
        window.location.reload()
    }


    // removes the item quantity from cart page 
    // adds to user convenience
    const reduceFromCartPage = (item: CartItemInterface) => {
        const singleitemPrice = item.total_cost / item.quantity
        if (item.quantity > 1 && item.quantity <= 20) {
            item.quantity -= 1
            item.total_cost -= singleitemPrice
        }
        item.total_cost = JSON.parse(item.total_cost.toFixed(2))
        editCartItem(item)
        window.location.reload()
    }

    
    // removes the whole item from cart page 
    // adds to user convenience
    const deleteFromCartPage = (item: CartItemInterface) => {
        removeFromCart(item)
        window.location.reload()
    }





    /* USEEFFECT */

    useEffect(() => {

        // calculates totals every time changes are made to the cart
        calculateTotals(JSON.parse(window.localStorage.getItem('Cart') || JSON.stringify(cart)))

    }, [cart])




    /* RENDER */
    return <>
        <section className="cart-component">
            <main className="cart-container">
                {cart.length === 0 ?

                    // text to display an empty cart
                    <h1 className="cart-is-empty">Cart is empty</h1> :

                    // maps over each cart item to display them in cards
                    cart.map((item, index) => {
                        return <div className="cart-item-body" key={index}>

                            {/* item properties */}
                            <h1>{item.item_name}</h1>
                            <p>Pieces: {item.quantity}</p>
                            <p>Total: $ {item.total_cost}</p>

                            {/* quantites are editable only when order is not finalised */}
                            {!props.isOrderFinalised && <>
                                <div className="cart-item-buttons">
                                    <button onClick={() => addFromCartPage(item)}><BiUpArrow /></button>
                                    <button onClick={() => reduceFromCartPage(item)}><BiDownArrow /></button>
                                </div>
                                <button className="delete-from-cart-page" onClick={() => deleteFromCartPage(item)}>
                                    <RiDeleteBinFill />
                                </button>
                            </>}

                        </div>
                    })}
            </main>


            {/* displays the total values */}
            <article className="totals">

                <p style={{ marginRight: '150px', marginLeft: '10px' }}>Total Pieces: {totals.totalQuantity}</p>
                <p>Total Amount: $ {totals.totalMoney.toFixed(2)}</p>

            </article>
        </section>

        {/* links back to order page to add new items to cart */}
        <Link to="/order"><button className="change-order">Change your order</button></Link>
    </>
}

export default CartComponent
