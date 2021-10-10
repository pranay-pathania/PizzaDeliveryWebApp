// importing from libraries
import React, { useContext, useState } from 'react'

// importing icons
import { FaShoppingCart } from 'react-icons/fa'
import { RiDeleteBinFill } from 'react-icons/ri'
import { FiPlus, FiMinus } from 'react-icons/fi'

// importing utilities
import { CartItemInterface, ModalCommand, TypeOfModal } from '../../utils'

// importing AppContext
import { AppContext } from '../../App'

// stylesheet
import './FoodItem.css'


// props interface
interface Props {
    img_src: string,
    item_name: string,
    description: string,
    type: string,
    price: number,
    max_quantity: number
}



// FoodItem Functional Component
const FoodItem: React.FC<Props> = (props: Props) => {

    // destructuring props
    const { img_src, item_name, description, price, max_quantity } = props




    /* APPCONTEXT */

    // getting required values from AppContext
    const { userHasLoggedIn, cart, addToCart, removeFromCart, modalAction } = useContext(AppContext)





    /* LOCAL UTILITIES */

    let wasItemSelectedInHistory: boolean = false
    let previouslySelectedQuantity: number = 0
    cart.forEach(item => {
        if (item.item_name === item_name) {
            wasItemSelectedInHistory = true
            previouslySelectedQuantity = item.quantity
        }
    })





    /* STATE VALUES */


    // for whether an item is added to cart
    // considers whether item was added in a previous session without placing order
    const [addedToCart, setAddedToCart] = useState<boolean>(wasItemSelectedInHistory)

    // quatity of item selected
    const [quantity, setQuantity] = useState<number>(previouslySelectedQuantity)






    /* FUNCTONS */

    // increases quantiy of item by 1. Cannot go beyond max_quantity
    const increaseQuantity = (): void => {
        if (quantity < max_quantity) {
            setQuantity(prev => prev + 1)
        }
    }

    // decreses quantity of item by 1. Cannot go below 0
    const decreaseQuantity = (): void => {
        if (quantity > 0) {
            setQuantity(prev => prev - 1)
        }
    }

    // adds item to cart
    const addToShoppingCart = () => {
        if (userHasLoggedIn) {
            if (quantity === 0) {

                // cannot add item with 0 quantity
                modalAction(ModalCommand.OPEN, { text: `You can't eat a pizza that's not there. Select a quantity before adding to cart`, type: TypeOfModal.WARNING })

            } else {

                // creats item object to add to cart
                const newItem: CartItemInterface = {
                    item_name,
                    quantity,
                    total_cost: price * quantity
                }

                addToCart(newItem)
                setAddedToCart(true)

                modalAction(ModalCommand.OPEN, { text: `Added to cart`, type: TypeOfModal.ALERT })
            }
        } else {

            // cannot shop without logging in
            modalAction(ModalCommand.OPEN, { text: `You need to login to shop for items`, type: TypeOfModal.WARNING })

        }
    }


    // removes item from shopping cart
    const removeFromShoppingCart = () => {

        const itemToBeRemoved: CartItemInterface = {
            item_name,
            quantity,
            total_cost: price * quantity
        }

        removeFromCart(itemToBeRemoved)

        setAddedToCart(false)
        setQuantity(0)
    }




    /* RENDER */

    return <main className="food-item-card">
        <img src={img_src} alt={item_name} />
        <h1>{item_name}</h1>
        <p>{description}</p>
        <p className="price">$ {price}</p>
        <div className="user-add-to-cart">
            <p>Quantity: {quantity}</p>
            <div className="change-quantity">
                <button value="-" onClick={decreaseQuantity} title="Decrease quantity"><FiMinus /></button>
                <button value="+" onClick={increaseQuantity} title="Increase quantity"><FiPlus /></button>
            </div>
            {!addedToCart && <button onClick={addToShoppingCart} title="Add to cart"><FaShoppingCart /></button>}
            {addedToCart && <button title="Remove from cart" onClick={removeFromShoppingCart}><RiDeleteBinFill /></button>}
        </div>
    </main>
}

export default FoodItem
