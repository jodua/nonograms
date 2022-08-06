import { useState } from "react"
import "../../styles/common/Select.scss"

const Select = ({ state, setState, options }) => {

    const [openOptions, setOpenOptions] = useState(false)
    const [isVisible, setIsVisible] = useState(false)

    const handleChange = (option) => {
        setState(option)
        setIsVisible(false)
        setTimeout(() => {
            setOpenOptions(false)
        }, 300)
    }

    const handleOpen = () => {
        if (openOptions) {
            setIsVisible(false)
            setTimeout(() => {
                setOpenOptions(!openOptions)
            }, 300)
        } else {
            setOpenOptions(true)
            setTimeout(() => {
                setIsVisible(true)
            }, 0)
        }

    }

    return (
        <div className={"select " + (openOptions ? "selectActive" : "")}>
            <div className="selectChosen"
                onClick={() => handleOpen()}>
                {state}
            </div>
            {
                openOptions && (
                    <div className={
                        "selectOptions " + (
                            isVisible
                                ? "visible"
                                : ""
                        )
                    }>
                        {
                            options.map((option) => (
                                <div key={option}
                                    className={"selectOption " + (option === state ? "selectOptionActive" : "")}
                                    onClick={() => handleChange(option)}>
                                    {option}
                                </div>
                            ))
                        }
                    </div>
                )
            }
        </div>
    )
}

export default Select