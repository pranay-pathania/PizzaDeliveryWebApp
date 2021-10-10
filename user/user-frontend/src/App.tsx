// react and other libraries' imports
import React, { useState } from 'react'


// component imports
import Navbar from './components/Navbar/Navbar'
import Modal from './components/Modal/Modal'


//utilities imports
import { CustomerInterface, defaultUser, isUserDefault } from './utils'
import { CartItemInterface, initialContextValues } from './utils'
import { TypeOfModal, ModalCommand, ModalMessage, initialModalMessageState } from './utils'


//stylesheet
import './App.css'


// AppContext: wraps the entire app; allows for easy data transfer without, as John Smilga calls it, "prop-drilling"
export const AppContext = React.createContext(initialContextValues)


// App Functional Component
const App: React.FC = () => {


  /* STATE VALUES */

  // state for current user. can be the default user or the logged in user
  // looks into localStorage for the currentUser, or picks up the pre-defined defaultUser value
  const [currentUser, setCurrentUser] = useState<CustomerInterface>(JSON.parse(window.localStorage.getItem("currentUser") || JSON.stringify(defaultUser)))


  // state to see if the user has logged in or not
  const [userHasLoggedIn, setUserHasLoggedIn] = useState<boolean>(!isUserDefault(currentUser))


  // cart of the user. all items selected in the orderpage are stored in the cart
  // this state value is used for all operationsperformed on the cart
  // its copy is stored in localStorage for reference in another session
  const [cart, setCart] = useState<CartItemInterface[]>(JSON.parse(window.localStorage.getItem("Cart") || '[]'))


  // state of the modal i.e. open (true) or close (false)
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)


  // state for the message the modal displays
  const [modalMessage, setModalMessage] = useState<ModalMessage>(initialModalMessageState)





  /* ADDITIONAL FUNCTIONS */



  // changes the value of currentUser to the one provided to the function
  // basically used to log in and out
  const changeCurrentUser = (user: CustomerInterface): void => {
    setCurrentUser(user)
    if (isUserDefault(user)) {
      window.localStorage.removeItem("currentUser")
      window.localStorage.removeItem("Cart")
    } else {
      window.localStorage.setItem("currentUser", JSON.stringify(user))
      window.localStorage.setItem('Cart', JSON.stringify(cart))
    }
    setUserHasLoggedIn(!isUserDefault(user))
  }



  // adds the item passed to the function to the cart
  const addToCart = (item: CartItemInterface) => {
    let userCart = cart
    userCart.push(item)
    setCart(userCart)
    window.localStorage.setItem('Cart', JSON.stringify(userCart))
  }



  // removes the  item passed to the function from the cart
  const removeFromCart = (item: CartItemInterface) => {
    let userCart = cart
    for (let i = 0; i < cart.length; i++) {
      if (userCart[i].item_name === item.item_name) {
        userCart.splice(i, 1)
        break
      }
    }
    setCart(userCart)
    window.localStorage.setItem('Cart', JSON.stringify(userCart))
  }



  // edits a specific item in the cart. 
  // item.item_name is taken as a comparison as no two menu items share the same name (simpler)
  const editCartItem = (item: CartItemInterface) => {
    let userCart = cart
    for (let i = 0; i < cart.length; i++) {
      if (userCart[i].item_name === item.item_name) {
        userCart[i].quantity = item.quantity
        userCart[i].total_cost = item.total_cost
        break
      }
    }
    setCart(userCart)
    window.localStorage.setItem('Cart', JSON.stringify(userCart))
  }





  // empties the cart
  const emptyCart = () => {
    setCart([])
    window.localStorage.setItem('Cart', JSON.stringify([]))
  }




  // modalAction: handles everything modal related (type of modal, messge displayed, and, opening and closing of modal)
  const modalAction = (command: ModalCommand, message: { text: string, type: TypeOfModal }) => {
    if (command === ModalCommand.CLOSE) {
      setIsModalOpen(false)
    } else if (command === ModalCommand.OPEN) {
      setIsModalOpen(true)
      const newMessage: ModalMessage = {
        type: '',
        message: message.text
      }
      if (message.type === TypeOfModal.ALERT) {
        newMessage.type = 'Alert'
      } else if (message.type === TypeOfModal.WARNING) {
        newMessage.type = 'Warning'
      }
      setModalMessage(newMessage)
    }
  }





  /* APPCONTEXT.PROVIDER VALUES */


  // values given to the AppContext.Provider
  const AppProviderValues = {
    currentUser,
    userHasLoggedIn,
    changeCurrentUser,
    cart,
    addToCart,
    removeFromCart,
    editCartItem,
    emptyCart,
    modalAction
  }


  /* RENDER */


  return <AppContext.Provider value={AppProviderValues}>
    <Navbar />
    {isModalOpen && <Modal {...modalMessage} />}
  </AppContext.Provider>
}

export default App

/*******************************************************/
/*                     NOTE TO SELF                    */
/*   Initially, App FC was simply return <Navbar />,   */
/*      nothing else. It grew some much as more        */
/*           functionality was needed.                 */
/*******************************************************/
