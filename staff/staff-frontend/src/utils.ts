///////////////////////////////////////////////////////////////////////////////////////
//                                  UTILS.TS                                         //
//   These are some utility objects and functions kept here for easier edit          // 
///////////////////////////////////////////////////////////////////////////////////////




// interface for the objects in the array that will be fetched from the database
// represents the order object
export interface OrderInterface {
    _id: string,
    name: string,
    phone_number: string,
    email: string,
    address: string,
    order: {
        date: string,
        cart: {
            item_name: string,
            quantity: number,
            total_cost: number
        }[],
        total_cost: number,
        payment_method: string
    },
    completed: boolean,
    cancelled: boolean
}



// props used by the OrderCard component
export interface OrderCardProps {
    orders: OrderInterface[],
    _id: string,
    name: string,
    phone_number: string,
    email: string,
    address: string,
    order: {
        date: string,
        cart: {
            item_name: string,
            quantity: number,
            total_cost: number
        }[],
        total_cost: number,
        payment_method: string
    },
    completed: boolean
}
