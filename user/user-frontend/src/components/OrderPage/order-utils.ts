///////////////////////////////////////////////////////////////////////////////
//                               ORDER-UTILS.TS                              //
//  This is specific to OrderPage Component or any other components within   //
//          within itself with purpose of easy editing of any basic          //
//                   information that does not need code                     //     
///////////////////////////////////////////////////////////////////////////////



/****************************************/
/* DATA CORRESPONDING TO THE PIZZA MENU */
/****************************************/


// interface for the order cards 
interface OrderCardInterface {
    item_name: string,
    description: string,
    type: string
    price: number,
}


// Basically the menu items, with a small description for each menu item. This is mapped over, returning an order-card for each item. 
// These are seperated as veg, nonveg, and sides, in the component code itself
export const orderDescriptions: OrderCardInterface[] = [
    {
        item_name: 'Chicken Dominator',
        description: 'Treat your taste buds with Double Pepper Barbecue Chicken, Peri-Peri Chicken, Chicken Tikka & Grilled Chicken Rashers',
        type: 'non-vegetarian',
        price: 12
    },
    {
        item_name: 'Chicken Golden Delight',
        description: 'Mmm! Barbeque chicken with a topping of golden corn loaded with extra cheese. Worth its weight in gold!',
        type: 'non-vegetarian',
        price: 13
    },
    {
        item_name: 'Indian Chicken Tikka',
        description: 'The wholesome flavour of tandoori masala with Chicken tikka | onion | red paprika | mint mayo',
        type: 'non-vegetarian',
        price: 15
    },
    {
        item_name: 'Pepper Barbeque',
        description: 'Pepper Barbecue Chicken | Cheese',
        type: 'non-vegetarian',
        price: 12
    },
    {
        item_name: 'Non Veg Supreme',
        description: 'Bite into supreme delight of Black Olives, Onions, Grilled Mushrooms, Pepper BBQ Chicken, Peri-Peri Chicken, Grilled Chicken Rashers',
        type: 'non-vegetarian',
        price: 16
    },
    {
        item_name: 'Chicken Fiesta',
        description: 'Grilled Chicken Rashers | Peri-Peri Chicken | Onion | Capsicum',
        type: 'non-vegetarian',
        price: 12
    },
    {
        item_name: 'Double Cheese Margherita',
        description: 'The ever-popular Margherita - loaded with extra cheese... oodies of it!',
        type: 'vegetarian',
        price: 14
    },
    {
        item_name: 'Indian Tandoori Paneer',
        description: 'It is hot. It is spicy. It is oh-so-Indian. Tandoori paneer with capsicum | red paprika | mint mayo',
        type: 'vegetarian',
        price: 12
    },
    {
        item_name: 'Mexican Green Wave',
        description: 'A pizza loaded with crunchy onions, crisp capsicum, juicy tomatoes and jalapeno with a liberal sprinkling of exotic Mexican herbs.',
        type: 'vegetarian',
        price: 11
    },
    {
        item_name: 'Peppy Paneer',
        description: 'Chunky paneer with crisp capsicum and spicy red pepper - quite a mouthful!',
        type: 'vegetarian',
        price: 10
    },
    {
        item_name: 'Farmhouse',
        description: 'A pizza that goes ballistic on veggies! Check out this mouth watering overload of crunchy, crisp capsicum, succulent mushrooms and fresh tomatoes',
        type: 'vegetarian',
        price: 11
    },
    {
        item_name: 'Coca-Cola',
        description: 'Coca-Cola (20 oz. Bottle)',
        type: 'sides',
        price: 1
    },
    {
        item_name: 'Stuffed Garlic Bread',
        description: 'Freshly Baked Garlic Bread stuffed with mozzarella cheese, sweet corns & tangy and spicy jalapeños',
        type: 'sides',
        price: 4
    },
    {
        item_name: 'Veg Pasta Italiano White',
        description: 'Penne Pasta tossed with extra virgin olive oil, exotic herbs & a generous helping of new flavoured sauce.',
        type: 'sides',
        price: 6
    }
]

