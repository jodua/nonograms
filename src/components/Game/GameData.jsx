import { useState } from "react";
import { useTranslation } from "react-i18next";

import Select from "./Select";
import Modal from "../Modal/Modal";

import "../../styles/Modal/Modal.scss"
import "../../styles/common/Button.scss"
import "../../styles/common/Structure.scss"
import "../../styles/Game/GameData.scss"

const GameData = ({ type, closeHandler, currentLevel, setLevel }) => {

    const { t } = useTranslation();

    const closeModalWithAnimation = () => {
        setIsClosing(true);
        setTimeout(() => {
            closeHandler();
            setIsClosing(false);
        }, 300);
    }

    const validateImportData = (data, type) => {
        let result = {
            error: "",
            isValid: true,
            data: []
        }

        let dataArray;
        let dataArrayLength;

        switch (type) {
            case "data.type.raw":
                // Remove last line if it is empty
                data = data.replace(/\n$/, "");
                // Split data by new line
                dataArray = data.split("\n");
                dataArrayLength = dataArray.length;
                // Check if data is too short
                if (dataArrayLength < 2) {
                    result.error = "data.import.error.tooShort";
                    result.isValid = false;
                }
                dataArray = dataArray.map(row => {
                    // Check if data is not square
                    let rowSplit = row.split(" ");
                    if (rowSplit.length !== dataArrayLength) {
                        result.error = "data.import.error.notSquare"
                        result.isValid = false;
                    }

                    // Map data to array of numbers
                    rowSplit = rowSplit.map(item => {
                        let number = parseInt(item);
                        if (isNaN(number)) {
                            result.error = "data.import.error.notNumber";
                            result.isValid = false;
                        }
                        return number;
                        // Check if values are 0 or 1
                    })

                    rowSplit.forEach(value => {
                        if (value !== 0 && value !== 1) {
                            result.error = "data.import.error.notInRange"
                            result.isValid = false;
                        }
                    })
                    return rowSplit;
                })
                result.data = dataArray;
                break;
            case "data.type.json":
                let dataJson;
                // Check if data is valid JSON
                try {
                    dataJson = JSON.parse(data);
                } catch (e) {
                    result.error = "data.import.error.jsonInvalid";
                    result.isValid = false;
                    break;
                }
                // Check if data is an array
                if (!Array.isArray(dataJson)) {
                    result.error = "data.import.error.jsonNotArray";
                    result.isValid = false;
                }

                // Check if data is too short
                const dataJsonLength = dataJson.length;
                if (dataJsonLength < 2) {
                    result.error = "data.import.error.tooShort";
                    result.isValid = false;
                }

                // Check if data is not square
                dataJson.forEach(row => {
                    if (row.length !== dataJsonLength) {
                        result.error = "data.import.error.notSquare";
                        result.isValid = false;
                    }
                });

                // Check if data is valid
                dataJson.map(row => {
                    // Map data to array of numbers
                    row.map(item => {
                        let number = parseInt(item);
                        if (isNaN(number)) {
                            result.error = "data.import.error.notNumber";
                            result.isValid = false;
                        }
                        return number;
                        // Check if values are 0 or 1
                    }).forEach(value => {
                        if (value !== 0 && value !== 1) {
                            result.error = "data.import.error.invalidValue";
                            result.isValid = false;
                        }
                    })
                    return row;
                });
                result.data = dataJson;
                break;
            case "data.type.csv":
                // Remove last line if it is empty
                data = data.replace(/\n$/, "");
                // Split data by new line
                dataArray = data.split("\n");
                dataArrayLength = dataArray.length;
                // Check if data is too short
                if (dataArrayLength < 2) {
                    result.error = "data.import.error.tooShort";
                    result.isValid = false;
                }
                dataArray.map(row => {
                    // Check if data is not square
                    const rowSplit = row.split(",");
                    if (rowSplit.length !== dataArrayLength) {
                        result.error = "data.import.error.notSquare";
                        result.isValid = false;
                    }

                    // Map data to array of numbers
                    rowSplit.map(item => {
                        let number = parseInt(item);
                        if (isNaN(number)) {
                            result.error = "data.import.error.notNumber";
                            result.isValid = false;
                        }
                        return number;
                        // Check if values are 0 or 1
                    }).forEach(value => {
                        if (value !== 0 && value !== 1) {
                            result.error = "data.import.error.notInRange";
                            result.isValid = false;
                        }
                    })
                    return rowSplit;
                })
                result.data = dataArray;
                break;
            default:
                result.error = "game.data.import.error.unknown";
                result.isValid = false;
        }
        return result;
    }

    const handleImportClose = () => {
        if (importStatus === "data.import.success") {
            setImportStatus(null);
            closeModalWithAnimation();
        }
        else {
            setImportStatus(null);
        }
    }

    const handleImport = () => {
        const validatedData = validateImportData(importData, dataType);
        if (validatedData.isValid) {
            setImportStatus("data.import.success");
            setLevel(validatedData.data);
        } else {
            setImportStatus(validatedData.error);
        }
    }

    const dataTypes = ["data.type.raw", "data.type.json", "data.type.csv"]

    const [dataType, setDataType] = useState("data.type.raw");
    const [importData, setImportData] = useState("");
    const [importStatus, setImportStatus] = useState(null);

    const convertData = (nonogram, type) => {
        switch (type) {
            case "data.type.raw":
                let raw = "";
                for (let i = 0; i < nonogram.length; i++) {
                    raw += nonogram[i].join(" ") + "\n";
                }
                return raw;
            case "data.type.json":
                return JSON.stringify(nonogram).replace(/],/g, "],\n");
            case "data.type.csv":
                let csv = "";
                for (let i = 0; i < nonogram.length; i++) {
                    csv += nonogram[i].join(",") + "\n";
                }
                return csv;
            default:
                return "";
        }

    }

    const [isClosing, setIsClosing] = useState(false);


    return (
        <div className={"modalBackdrop" + (isClosing ? " modalClosing" : "")}>
            <div className="modalContainer centeredContainer container--spaced container--half">
                <div className="title title--medium">{t(`buttons.${type}`)}</div>
                <div className="centeredContainer">
                    <textarea
                        className="dataField"
                        value={
                            type === "import"
                                ? importData
                                : convertData(currentLevel, dataType)
                        }
                        readOnly={
                            type === "import"
                                ? false
                                : true
                        }
                        onChange={(e) => {
                            type === "import" && setImportData(e.target.value);
                        }
                        }
                    >
                    </textarea>
                    <Select state={dataType}
                        setState={setDataType}
                        options={dataTypes} />
                </div>
                {
                    type === "import" &&
                    <button className="button"
                        onClick={() => handleImport()}>
                        {t("buttons.import")}
                    </button>
                }
                <button className="button"
                    onClick={() => closeModalWithAnimation()}>
                    {t("buttons.close")}
                </button>
                {
                    type === "import" &&
                    importStatus !== null &&
                    <Modal modalTitle={
                        t(importStatus === "data.import.success"
                            ? "data.import.title.success"
                            : "data.import.title.error")
                    }
                        modalContent={t(importStatus)}
                        modalButtonMsg={t("buttons.close")}
                        closeHandler={() => handleImportClose()} />
                }
            </div>
        </div>
    )
}

export default GameData