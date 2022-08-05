import { useState } from "react";

import "../../styles/Modal/Modal.scss"
import "../../styles/common/Button.scss"
import "../../styles/common/Structure.scss"

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
        <div className={"modalBackdrop" + (isClosing ? " modalClosing" : "")}>
            <div className="modalContainer centeredContainer container--spaced">
                <div className="title title--medium">{modalTitle}</div>
                <div className="">{modalContent}</div>
                <button className="button" onClick={() => closeModalWithAnimation()}>
                    {modalButtonMsg}
                </button>
            </div>
        </div>
    )
}

export default Modal