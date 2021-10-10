// importing from libraries
import axios from 'axios'
import React from 'react'

// importing icons
import { TiTick, TiCancel } from 'react-icons/ti'

// importing utilities
import { OrderCardProps } from '../../utils'

// stylesheet
import './OrderCard.css'





// OrderCard Functional Component
const OrderCard: React.FC<OrderCardProps> = (props: OrderCardProps) => {

    /* FUNCTIONS */


    // when clicked, the order is marked completed and removed from the UI
    const markComplete = (id: string) => {

        // PUT method
        axios.put(`http://localhost:1000/complete-order/${id}`)

        // reloading the data
        window.location.reload()

        //switching off auto reload
        window.sessionStorage.setItem("autoReloadEnabled", "false")
    }

    // when clicked, the order is marked cancelled and removed from the UI
    const markCancelled = (id: string) => {
        // PUT method
        axios.put(`http://localhost:1000/cancel-order/${id}`)

        // reloading the data
        window.location.reload()

        //switching off auto reload
        window.sessionStorage.setItem("autoReloadEnabled", "false")
    }





    /* RENDER */

    return <article className="order-container">
        <section className="order">
            {/* the required personal data user had entered */}
            <div className="personal-info">
                <p><strong>Name: </strong> {props.name}</p>
                <p><strong>Phone no: </strong> {props.phone_number}</p>
                <p><strong>Email: </strong> {props.email}</p>
                <p><strong>Address: </strong> {props.address}</p>
                <p><strong>Date: </strong> {props.order.date}</p>
                <p><strong>Payment Method: </strong> {props.order.payment_method}</p>
                <p><strong>Cost: </strong> $ {props.order.total_cost}</p>
            </div>

            {/* user's cart */}
            <div className="cart">
                {props.order.cart.map((item, index) => {
                    return <p className="cart-item" key={index}><strong>{item.item_name}: </strong> {item.quantity} pcs.</p>
                })}
            </div>
        </section>

        {/* completed and cancelled buttons */}
        <div className="button-container">
            <button className="mark-complete" onClick={() => markComplete(props._id)}><TiTick /> Mark complete</button>
            <button className="mark-cancel" onClick={() => markCancelled(props._id)}><TiCancel /> Cancel Order</button>
        </div>
    </article>
}

export default OrderCard
