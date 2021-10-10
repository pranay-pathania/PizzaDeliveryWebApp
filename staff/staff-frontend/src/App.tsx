// importing from libraries
import React, { useState } from 'react'

// importing components
import Navbar from './components/Navbar/Navbar'
import RecentOrders from './components/RecentOrders/RecentOrders'

// stylesheet
import './App.css'





// App Functional Component
const App: React.FC = () => {


  /* PREP WORK */

  // stores a boolean value; true if auto reload is enabled
  // it's value is taken from sessionStorage (persists on reloading but changes to default in different session) 
  let autoReloadEnabled: boolean

  // if the value present in sessionStorage is "false", the variable is assigned false, else it is true
  if (window.sessionStorage.getItem("autoReloadEnabled") === "true") {
    autoReloadEnabled = true
  } else {
    autoReloadEnabled = false
  }




  /* STATE VALUES */

  // state value, initial value is taken from sessionStorage
  // initial value is taken from the variable "autoReloadEnabled"
  const [isAutoReloading, setIsAutoReloading] = useState<boolean>(autoReloadEnabled)


  


  /* FUNCTIONS */

  // function to set isAutoReloading state to whatever boolean value is provided
  const changeAutoReload = (value: boolean): void => {
    setIsAutoReloading(value)
  } 




  /* COMMON PROPS */

  // this app is much simpler
  // both components take the same props so this one object is passed directly  
  // (easier for me to type and maybe manage)
  const commonProps = {
    changeAutoReload,
    isAutoReloading
  }





  /* RENDER */

  return <>
    <Navbar {...commonProps}/>
    <RecentOrders {...commonProps}/>
  </>
}

export default App