// importing react library
import React from 'react'

//importing components
import FoodItem from '../FoodItem/FoodItem'

// importing order-utilities
import { orderDescriptions } from './order-utils'

//importing images for the food item cards
//non veg
import ChickenDominator from '../../images/Orders/NonVeg/Chicken_Dominator.jpg'
import ChickenGoldenDelight from '../../images/Orders/NonVeg/Chicken_Golden_Delight.jpg'
import IndianChickenTikka from '../../images/Orders/NonVeg/IndianChickenTikka.jpg'
import PepperBBQ from '../../images/Orders/NonVeg/Pepper_Barbeque.jpg'
import NonVegSupreme from '../../images/Orders/NonVeg/Non-Veg_Supreme.jpg'
import ChickenFiesta from '../../images/Orders/NonVeg/ChickenFiesta.png'

//veg
import DoubleCheeseMargherita from '../../images/Orders/Veg/Double_Cheese_Margherita.jpg'
import IndianTandooriPaneer from '../../images/Orders/Veg/IndianTandooriPaneer.jpg'
import MexicanGreenWave from '../../images/Orders/Veg/Mexican_Green_Wave.jpg'
import PeppyPaneer from '../../images/Orders/Veg/Peppy_Paneer.jpg'
import FarmHouse from '../../images/Orders/Veg/Farmhouse.jpg'

//sides
import Coke from '../../images/Orders/Sides/Coca_Cola.jpg'
import StuffedGarlicBread from '../../images/Orders/Sides/stuffed-garlic-breadstick_1346070564.jpg'
import VegPastaItalianoWhite from '../../images/Orders/Sides/Veg-Pasta-Italiano-White.jpg'

//stylesheet
import './OrderPage.css'




//arrays for image sources
// used for placing images with same index while mapping
const nonVegPizzaSource: string[] = [
    ChickenDominator,
    ChickenGoldenDelight,
    IndianChickenTikka,
    PepperBBQ,
    NonVegSupreme,
    ChickenFiesta
]

const vegPizzaSource: string[] = [
    DoubleCheeseMargherita,
    IndianTandooriPaneer,
    MexicanGreenWave,
    PeppyPaneer,
    FarmHouse
]

const sidesSource: string[] = [
    Coke,
    StuffedGarlicBread,
    VegPastaItalianoWhite
]



// OrderPage Functional Component
const OrderPage: React.FC = () => {

    // seperate veg, non-veg and sides
    const vegItems = orderDescriptions.filter((item) => { return item.type === 'vegetarian' })
    const nonvegItems = orderDescriptions.filter((item) => { return item.type === 'non-vegetarian' })
    const sideItems = orderDescriptions.filter((item) => { return item.type === 'sides' })



    /* RENDER */

    return <>

        {/* page header */}
        <header className="order-header">
            <h1>Grab a bite here!</h1>
        </header>

        {/* pizza menu section */}
        <section className="ordering-page">

            {/* veg pizzas */}
            <div className="typeSection">
                <h1 className="pizza-type-title">Veg Pizzas</h1>
                <div className="food-item-container">
                    {
                        vegItems.map((item, index) => {
                            return <FoodItem {...item} img_src={vegPizzaSource[index]} key={index} max_quantity={20} />
                        })
                    }
                </div>
            </div>

            {/* styled line for seperating sections */}
            <div className="order-page-underline"></div>

            {/* non-veg pizzas */}
            <div className="typeSection">
                <h1 className="pizza-type-title">Non-Veg Pizzas</h1>
                <div className="food-item-container">
                    {
                        nonvegItems.map((item, index) => {
                            return <FoodItem {...item} img_src={nonVegPizzaSource[index]} key={index} max_quantity={20} />
                        })
                    }
                </div>
            </div>

            {/* styled line for seperating sections */}
            <div className="order-page-underline"></div>

            {/* sides section */}
            <div className="typeSection">
                <h1 className="pizza-type-title">Sides</h1>
                <div className="food-item-container">
                    {
                        sideItems.map((item, index) => {
                            return <FoodItem {...item} img_src={sidesSource[index]} key={index} max_quantity={10} />
                        })
                    }
                </div>
            </div>

        </section>
    </>
}

export default OrderPage
