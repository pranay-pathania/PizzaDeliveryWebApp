// importing react library
import React, { useContext } from 'react'

// importing AppContext
import { AppContext } from '../../App'

// importing enums for modal functioning
import { ModalCommand, TypeOfModal } from '../../utils'

// stylesheet
import './Modal.css'

// props interface
interface Props {
    type: string,
    message: string
}


// Modal Functional Component 
const Modal: React.FC<Props> = (props: Props) => {

    // destructuring props
    const { type, message } = props

    // getting required values from AppContext
    const { modalAction } = useContext(AppContext)


    /* RENDER */

    return <main className="modal-container">
        <section className="modal">
            <h1>{type}</h1>
            <p>{message}</p>
            <button onClick={() => modalAction(ModalCommand.CLOSE, { text: '', type: TypeOfModal.EMPTY })}>OK</button>
        </section>
    </main>
}

export default Modal
