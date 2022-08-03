import { useState } from "react";
import "../../styles/Modal/Modal.scss"

const Modal = ({ modalTitle, modalContent, modalButtonMsg, closeHandler }) => {

    const closeModalWithAnimation = () => {
        setIsClosing(true);
        setTimeout(() => {
            closeHandler();
            setIsClosing(false);
        }, 300);
    }

    const [isClosing, setIsClosing] = useState(false);


    return (
        <div className="modalBackdrop">
            <div className={"modalContainer" + (isClosing ? " modalClosing" : "")}>
                <div className="modalTitle">{modalTitle}</div>
                <div className="modalContent">{modalContent}</div>
                <button className="modalButton" onClick={() => closeModalWithAnimation()}>
                    {modalButtonMsg}
                </button>
            </div>
        </div>
    )
}

export default Modal