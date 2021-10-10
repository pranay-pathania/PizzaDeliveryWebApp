//importing from libraries
import React, { useRef, useContext, useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

// importing AppContext
import { AppContext } from '../../App'

// login interface and initial data
import { NewUserDataInterface, OldUserDataInterface, initialNewUserFormData, initialOldUserFormData } from '../../utils'
import { ModalCommand, TypeOfModal } from '../../utils'
import { isValidEmail, isAcceptablePassword, bothPasswordsMatch } from '../../utils'

// stylesheet
import './LoginPage.css'


// LoginPage Functional Components
const LoginPage: React.FC = () => {

    /* APPCONTEXT */

    // getting required values from AppContext
    const { changeCurrentUser, modalAction } = useContext(AppContext)




    /* REFS */

    // these are used so that, when the page renders, the inputs they refer to get focuses
    const EmailInputRef = useRef<any>()               //can do better than 'any'
    const NameInputRef = useRef<any>()                //can do better than 'any'




    /* STATES */

    // is the user a new one, or have they signed up already
    // true if user has already signed up
    // assumed that anyone who lands on this page is a registered user (value: true)
    const [isExistingUser, setIsExistingUser] = useState<boolean>(true)


    // form states

    // form state for registed user
    const [oldUserFormData, setOldUserFormData] = useState<OldUserDataInterface>(initialOldUserFormData)

    // form state for new user (for registration)
    const [newUserFormData, setNewUserFormData] = useState<NewUserDataInterface>(initialNewUserFormData)






    /* FUNCTIONS */


    // tracks form changes for both new and od user
    const trackFormChanges = (e: React.ChangeEvent<HTMLInputElement>): void => {
        if (isExistingUser) {
            setOldUserFormData(prev => {
                return {
                    ...prev,
                    [e.target.name]: e.target.value
                }
            })
        } else {
            setNewUserFormData(prev => {
                return {
                    ...prev,
                    [e.target.name]: e.target.value
                }
            })
        }
    }


    // sign up new user
    const signUpUser = (): void => {
        const { name, email, password, confirm_password } = newUserFormData
        if (!isValidEmail(email)) {

            // shows if email is invalid
            modalAction(ModalCommand.OPEN, { text: `Invalid email`, type: TypeOfModal.WARNING })
            setNewUserFormData(prev => {
                return {
                    ...prev,
                    password: '',
                    confirm_password: '',
                    email: ''
                }
            })

        } else if (!isAcceptablePassword(password)) {

            // shows if password is not acceptable
            modalAction(ModalCommand.OPEN, { text: `Password must be longer than 8 characters`, type: TypeOfModal.WARNING })
            setNewUserFormData(prev => {
                return {
                    ...prev,
                    password: '',
                    confirm_password: '',
                    email: ''
                }
            })

        } else if (!bothPasswordsMatch(password, confirm_password)) {

            // shows if password and confirm password do not match
            modalAction(ModalCommand.OPEN, { text: `Password and confirm password fields do not match`, type: TypeOfModal.WARNING })
            setNewUserFormData(prev => {
                return {
                    ...prev,
                    password: '',
                    confirm_password: '',
                    email: ''
                }
            })

        } else {

            //post to backend
            axios.post('http://localhost:1000/sign-up', {
                name,
                email,
                password
            })

            setOldUserFormData(initialOldUserFormData)
            setNewUserFormData(initialNewUserFormData)

            modalAction(ModalCommand.OPEN, { text: 'Signed up successfully', type: TypeOfModal.ALERT })

            // redirect to login (old user form)
            setIsExistingUser(true)
        }
    }


    // funcction for logging in registered user
    const logInUser = async (): Promise<void> => {
        try {
            const { email, password } = oldUserFormData
            const response = await axios.get('http://localhost:1000/get-user', {
                params: {
                    email,
                    password
                }
            })
            const dataRecieved = await response.data
            changeCurrentUser(dataRecieved)
            modalAction(ModalCommand.OPEN, { text: 'Logged in successfully', type: TypeOfModal.ALERT })
        } catch (error) {

            modalAction(ModalCommand.OPEN, { text: 'Cannot log in', type: TypeOfModal.ALERT })

            // not for user
            console.log(error)
        }
    }




    /* USEEFFECT */

    useEffect(() => {
        if (isExistingUser) {
            EmailInputRef.current.focus()
        } else {
            NameInputRef.current.focus()
        }
    }, [isExistingUser])





    /* RENDER */

    return <div className="login-container">
        <main className="login-page">

            <h1>{isExistingUser ? "Login to place orders" : "New User Sign Up"}</h1>

            <div className="login">
                {/* name */}
                {!isExistingUser && <input type="text" name="name" placeholder="Name" value={newUserFormData.name} onChange={trackFormChanges} ref={NameInputRef} />}

                {/* email */}
                <input type="email" placeholder="Email" name="email" value={isExistingUser ? oldUserFormData.email : newUserFormData.email} onChange={trackFormChanges} ref={EmailInputRef} />

                {/* password */}
                <input type="password" placeholder="Password" name="password" value={isExistingUser ? oldUserFormData.password : newUserFormData.password} onChange={trackFormChanges} />

                {/* confirm password */}
                {!isExistingUser && <input type="password" placeholder="Confirm Password" name="confirm_password" value={newUserFormData.confirm_password} onChange={trackFormChanges} />}

                {/* buttons */}
                {/* login or sign up */}
                {isExistingUser ?
                    <Link to="/"><button onClick={logInUser} title="Login">Login</button></Link> :
                    <button onClick={signUpUser} title="Sign Up">Sign Up</button>}

                {/* redirect to new form data */}
                {isExistingUser && <>
                    <p>Not an existing user?</p>
                    <button onClick={() => setIsExistingUser(false)} title="Sign up now">Sign up. It's free</button>
                </>}

                {/* redirect to old form data */}
                {!isExistingUser && <>
                    <p>Already an existing user?</p>
                    <button onClick={() => setIsExistingUser(true)} title="Go to login">Login</button>
                </>}

            </div>
        </main>
    </div>
}

export default LoginPage
