// importing react
import React from 'react'

// imorting images
import CompanyLogo from '../../images/CompanyLogo.png'

// importing icons
import { IoReloadOutline, IoReloadCircleSharp } from "react-icons/io5"

// stylesheet
import './Navbar.css'



// props interface
interface Props {
    isAutoReloading: boolean,
    changeAutoReload: (value: boolean) => void
}





// Navbar Functional Component
const Navbar: React.FC<Props> = (props: Props) => {


    /* CSS PROPERTIES */

    // style for the auto reload button
    // if on, the button is a shade of blue
    // else it is default black
    const autoReloadStyles: React.CSSProperties = {
        color: `${props.isAutoReloading ? "rgb(22, 82, 138)" : "black"}`
    }






    /* FUNCTIONS */


    // toggles auto-reload mode when auto-reload button is clicked
    const autoReloadOnCLick = () => {
        const newValue: boolean = !props.isAutoReloading
        props.changeAutoReload(newValue)
        window.sessionStorage.setItem("autoReloadEnabled", `${newValue}`)
    }

    // manually reload when clicked
    // also, it switches auto-reload OFF
    const manualReloadOnClick = () => {
        window.location.reload()
        window.sessionStorage.setItem("autoReloadEnabled", "false")
    }




    /* RENDER */

    return <nav>

        {/* logo image */}
        <img src={CompanyLogo} alt="logo" id="logo-image" />

        {/* company title */}
        <h1>Topping Masters</h1>


        {/* reload buttons */}
        <div className="reload-buttons">

            {/* auto reload button */}
            <button id="auto-reload" title={props.isAutoReloading ? "Stop auto reloading" : "Auto reload every 30 seconds"} style={autoReloadStyles} onClick={autoReloadOnCLick}><IoReloadCircleSharp /></button>

            {/* manual reload button */}
            <button id="reload" title="Reload data" onClick={manualReloadOnClick}><IoReloadOutline /></button>
        </div>
    </nav>
}

export default Navbar
