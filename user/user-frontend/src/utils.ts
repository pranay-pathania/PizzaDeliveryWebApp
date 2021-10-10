///////////////////////////////////////////////////////////////////////////////////////
//                                  UTILS.TS                                         //
//   These are some utility objects and functions kept here for easier edit or for   //
//                             multiple references.                                  // 
///////////////////////////////////////////////////////////////////////////////////////








/****************************************/
/* DATA FOR THE FRONT PAGE OR HOME PAGE */
/****************************************/




// This set of text is displayed on the introduction card on the front page 
export const frontPageInfoCard = {
    heading: "The Best Pizza in Town!",
    content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Id aliquam, facilis ducimus ipsam neque aut porro, expedita eligendi earum aliquid voluptates possimus voluptatibus consequuntur numquam excepturi optio ex hic obcaecati."
}

// This is the text used by the three cards below introduction card on the front page 
export const frontPageCardInformation = [
    {
        title: "Fresh Ingredients",
        content: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tenetur qui iste ipsa velit, repudiandae reiciendis culpa sit libero tempora corporis aspernatur? Voluptas minus delectus rerum sapiente repellendus hic quis dignissimos? Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat ea, aut error est distinctio minima molestiae officiis deserunt consectetur quaerat! Eaque facere minima beatae excepturi ea nobis, iusto laudantium explicabo."
    },
    {
        title: "Traditional Cooking",
        content: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tenetur qui iste ipsa velit, repudiandae reiciendis culpa sit libero tempora corporis aspernatur? Voluptas minus delectus rerum sapiente repellendus hic quis dignissimos? Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat ea, aut error est distinctio minima molestiae officiis deserunt consectetur quaerat! Eaque facere minima beatae excepturi ea nobis, iusto laudantium explicabo."
    },
    {
        title: "Award-winning Taste",
        content: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tenetur qui iste ipsa velit, repudiandae reiciendis culpa sit libero tempora corporis aspernatur? Voluptas minus delectus rerum sapiente repellendus hic quis dignissimos? Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat ea, aut error est distinctio minima molestiae officiis deserunt consectetur quaerat! Eaque facere minima beatae excepturi ea nobis, iusto laudantium explicabo."
    }
]


// This is used by the offer card
export const offerText = {
    title: 'Spooktober Offer!',
    content: 'Buy one pizza for the price of two and get the second one abolutely FREE!',
    condition: 'Offer valid till i feel like it.'
}








/*********************************************/
/* DATA USED FOR MY POORLY IMPLEMENTED LOGIN */
/*********************************************/



// Login related data has beem arranged as follows: the interface used, then the iniital state of the various forms

/* Information corresponding to a new user; this is for signing up a new user only */
export interface NewUserDataInterface {
    name: string,
    email: string,
    password: string,
    confirm_password: string
}
export const initialNewUserFormData: NewUserDataInterface = {
    name: '',
    email: '',
    password: '',
    confirm_password: ''
}



/* Information corresponding to an old user i.e. someone who has already signed up before; this is for logging in only */
export interface OldUserDataInterface {
    email: string,
    password: string
}
export const initialOldUserFormData: OldUserDataInterface = {
    email: '',
    password: ''
}




/*  This is a customer who has logged in. This information is stored in localStorage, so when the user leaves without logging out,
    they will be automatically  logged in the next time they visit the site. Default user is called 'Guest'
*/
export interface CustomerInterface {
    name: string,
    email: string,
    password: string,
}
export const defaultUser: CustomerInterface = {
    name: "Guest",
    email: '',
    password: ''
}



// Login related functions


/* checks if an entered email address is valid. This does not check for the actual existence of the email address.
   Even something like w@w.com will be considered valid by this function. Will probably replace by something stronger.
   Returns true if email is considered valid
*/
export const isValidEmail = (email: string): boolean => {

    // position of @
    let at_pos: number = -1

    // position of '.com'
    let dotcom_pos: number = -1

    // loops through the string and gets the positions of '@' and '.com'
    // zero based indexing
    for (let i = 0; i < email.length; i++) {
        if (email[i] === '@') {
            at_pos = i
        } else if (email[i] === '.') {
            if (email.substr(i + 1, 3) === 'com') {
                dotcom_pos = i
            }
        }
    }

    // returns true if '@' comes before '.com', else returns false
    if (at_pos !== -1 && dotcom_pos !== -1 && at_pos < dotcom_pos) {
        return true
    }
    return false
}


/* checks if the password is above an expected length. 
   Returns true if password.length >= expectedLength 
*/
const expectedLength: number = 8
export const isAcceptablePassword = (password: string): boolean => {
    return (password.length >= expectedLength)
}


/* checks if the password written in password and confirm password fields are equal or not.
   Returns true if passwords match 
*/
export const bothPasswordsMatch = (password: string, confirm_password: string): boolean => {
    return (password.localeCompare(confirm_password) === 0)
}


/* checks whether the current user is default (Guest) or someone who has logged in
   Returns true if the current user is default  
*/
export const isUserDefault = (user: CustomerInterface): boolean => {
    if (user.name === defaultUser.name && user.email === defaultUser.email && user.password === defaultUser.password) {
        return true
    }
    return false
}












/*******************************/
/* DATA FOR REVIEW SUBMISSIONS */
/*******************************/



/* interface for any review that is displayed under the Best Reviews slider. This is only for the array of reviews used by the slider
   This is NOT exported
*/
interface ReviewInterface {
    title: string,
    name: string,
    stars: number,
    review: string
}



/* these are the best reviews taht are displayed in the slider component in the review page */
export const bestReviews: ReviewInterface[] = [
    {
        title: `Best pizza I've ever had`,
        name: `Danita of Walls, MS`,
        stars: 5,
        review: `OMG, hands down the best pizza I've had loaded with toppings, hot when we got it, the best ever. Quick contactless delivery. We have ordered from here before but it has never been as good as it was tonight. Whoever they have cooking they need to keep, just wonderful tonight.`
    },
    {
        title: `Decent overall`,
        name: `Jane of Clifton, NJ`,
        stars: 4,
        review: `Ordered online for delivery. I enjoyed the pizza however I thought I ordered without cheese. Anyway, Very timely on a Christmas afternoon and very tasty. Liked it. Keep up the good work.`
    },
    {
        title: `Got my food resent`,
        name: `Brandy of Saint Pauls, NC`,
        stars: 5,
        review: `I called because my food was cold and not done right and was missing a few items. When I called I was answered by a woman named ** and she was very polite and nice and is resending the items fresh. She was respectful and polite.`
    },
    {
        title: `Delicious and with variety`,
        name: `Akanksha of Other, Other`,
        stars: 4,
        review: `Good quality and cheap pizzas. They offer wide range of pizzas to its customers along with different and delicious toppings. One must try Peri-Peri chicken pizza at least once. Online orders are always delivered on time.`
    },
    {
        title: `Good but too saucy`,
        name: `Okay of Grants Pass, OR`,
        stars: 3,
        review: `I love them. Their pizza is very good but I hate it when my pizza is so saucy. Today I ordered and had to throw mine into the trash because of 2 reasons. So saucy and they gave me a ingredient that was so spicy but their pizza is very good. You should give them a try.`
    },
    {
        title: `Accidently ordered`,
        name: `Julie of Breaux Bridge, LA`,
        stars: 5,
        review: `I mistakenly ordered the Chicken Carbonara Pasta a Bread Bowl. I wanted it in a regular container. I am so happy for this mistake because the Bread Bowl made the Chichen Carbonara Pasta extra special. It is finger licking good and I will order this again!`
    },

]



/* interface for the user-written review */
export interface ReviewSubmissionInterface {
    name: string,
    place: string,
    rating: number,
    title_of_review: string,
    review_content: string
}



/* initial state of the review form */
export const initialFormReviewState: ReviewSubmissionInterface = {
    name: '',
    place: '',
    rating: 0,
    title_of_review: '',
    review_content: ''
}



/* checks for any empty fields in the review form. 
   Returns true if any field is empty
*/
export const isAnyReviewFieldEmpty = (reviewInput: ReviewSubmissionInterface): boolean => {
    const { name, place, rating, title_of_review, review_content } = reviewInput
    if (name === '' || place === '' || rating === 0 || title_of_review === '' || review_content === '') {
        return true
    }
    return false
}











/****************************/
/* DATA FOR THE USER'S CART */
/****************************/




/* interface for the cart items */
export interface CartItemInterface {
    item_name: string,
    quantity: number,
    total_cost: number
}



/* interface for the cart form */
export interface CartFormInterface {
    name: string,
    email: string,
    phone_no: string,
    payment_options: string,
    address: string,
}



/* initial state of the cart form */
export const initialCartFormState: CartFormInterface = {
    name: '',
    email: '',
    phone_no: '',
    payment_options: '',
    address: ''
}




/* Checks whether the entered string is a valid phone number or not. 
   I created this as I took phone number input as a string (input:text is easier to handle than input:number) 
   Returns true if every character in the string is a 'number'.
   There is no check on the length of the string, as I'm unaware about the lengths of phone numbers across the world. Here, in India, it is 10.
*/
export const isPhoneNumberValid = (phone: string): boolean => {
    for (let i = 0; i < phone.length; i++) {
        if (phone[i] < '0' || phone[i] > '9') {
            return false
        }
    }
    return true
}













/********************************/
/* DATA FOR THE MODAL COMPONENT */
/********************************/




// The ONLY function that controls the modal component is defined in App.tsx



/* TYPE OF MODAL: Whether the modal is used for a simple ALERT, or a WARNING. It is EMPTY for the purpose of closing the modal */
export enum TypeOfModal {
    ALERT,
    WARNING,
    EMPTY
}




/* MODAL COMMAND: whther to OPEN or CLOSE the modal, as required */
export enum ModalCommand {
    OPEN,
    CLOSE
}




/* the message that is to be passed to the modal controlling function.
   ModalMessage.type is derived from TypeOfModal enum
   ModalMessage.message is the message that is displayed in the modal
*/
export interface ModalMessage {
    type: string,
    message: string
}




/* Initial state of the modal properties before being called */
export const initialModalMessageState: ModalMessage = {
    type: '',
    message: ''
}

















/***********************************/
/* DATA RELATED TO THE APP CONTEXT */
/***********************************/


/* These are the initial context values
   There purpose is to only provide the type for useContext, nothing else.
   This was because typescript loves to bark at every little thing that's missing a type.
*/
export const initialContextValues = {
    currentUser: {
        name: '',
        email: '',
        password: '',
    },
    userHasLoggedIn: false,
    changeCurrentUser: (user: CustomerInterface) => console.log(user),
    cart: [{
        item_name: '',
        quantity: 0,
        total_cost: 0
    }],
    addToCart: (item: CartItemInterface) => console.log(item),
    removeFromCart: (item: CartItemInterface) => console.log(item),
    editCartItem: (item: CartItemInterface) => console.log(item),
    emptyCart: () => console.log(`Emptied cart`),
    modalAction: (command: ModalCommand, message: { text: string, type: TypeOfModal }) => console.log(`Modal Action`)
}