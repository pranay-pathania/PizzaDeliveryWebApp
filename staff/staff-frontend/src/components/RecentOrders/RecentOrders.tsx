// importing from libraries
import axios from 'axios'
import React, { useEffect, useState } from 'react'

// importing components
import Loading from '../Loading/Loading'
import OrderCard from '../OrderCard/OrderCard'

// importing utilities
import { OrderInterface } from '../../utils'

// stylesheet
import './RecentOrders.css'



// props interface
interface Props {
    isAutoReloading: boolean,
    changeAutoReload: (value: boolean) => void
}



// RecentOrders Functional Components
const RecentOrders: React.FC<Props> = (props: Props) => {


    /* STATE VALUES */

    // whether the page is loading. true initially as the data is being fetched
    const [loading, setLoading] = useState<boolean>(true)

    // all the orders that are displayd on the UI
    const [orders, setOrders] = useState<OrderInterface[]>([])




    /* DATABASE ACTIONS */

    // fetching the orders from the backend
    const getRelevantOrders = async () => {
        const response = await axios.get('http://localhost:1000/orders')
        const data = response.data
        setOrders(data)
        setLoading(false)
    }

    // fetch the data whenever the page is loaded or reloaded
    useEffect(() => {
        getRelevantOrders()
        window.sessionStorage.setItem("autoReloadEnabled", "false")
    }, [])

    /* END OF DATABASE ACTIONS */





    /* AUTO RELOAD */

    // function for auto-reloading
    const autoReload = () => {
        if (props.isAutoReloading) {
            setTimeout(() => {
                window.location.reload()
            }, 30000)
        } else {
            // not meant for user
            console.log("autoReloadOff")
        }
    }

    useEffect(() => {
        // not meant for user
        console.log("Auto reload function called")

        autoReload()
    })




    /* RENDER */

    return <main className="order-page">

        {/* heading */}
        <h1>Recent Orders</h1>


        {loading ?
            // if loading, show Loading
            <Loading /> :

            // else show all the orders
            <div className="all-orders">

                {/* map each item in orders to its own OrderCard component */}
                {orders.length === 0 ? <h1 id="no-new-orders">No new orders</h1> : orders.map((item) => {
                    return <OrderCard {...item} key={item._id} orders={orders} />
                })}
                
            </div>
        }
    </main>
}

export default RecentOrders
//