import { useState } from "react";
import { useTranslation } from "react-i18next";

import "../../styles/Modal/Modal.scss"
import "../../styles/Game/GameSettings.scss"
import "../../styles/common/Button.scss"
import "../../styles/common/Structure.scss"

const GameSettings = ({ settings, setSettings, closeHandler }) => {

    const { t } = useTranslation();

    const closeModalWithAnimation = () => {
        setIsClosing(true);
        setTimeout(() => {
            closeHandler();
            setIsClosing(false);
        }, 300);
    }

    const handleSaveAndClose = () => {
        updateSettings(settings);
        closeModalWithAnimation();
    }

    const updateSettings = () => {
        setSettings({
            canvasSize,
            cluesSize,
            fontSize
        });

        // Save settings to localStorage
        localStorage.setItem("settings", JSON.stringify({
            canvasSize,
            cluesSize,
            fontSize
        }));

    }

    const [canvasSize, setCanvasSize] = useState(settings.canvasSize);
    const [cluesSize, setCluesSize] = useState(settings.cluesSize);
    const [fontSize, setFontSize] = useState(settings.fontSize);

    const [isClosing, setIsClosing] = useState(false);


    return (
        <div className={"modalBackdrop" + (isClosing ? " modalClosing" : "")}>
            <div className="modalContainer centeredContainer container--spaced">
                <div className="title title--medium">{t("settings.title")}</div>
                <div className="setting">
                    <div className="subtitle">{t("settings.canvasSize")}: {canvasSize}</div>
                    <div className="settingValue">
                        <input type="range"
                            value={canvasSize}
                            min="400"
                            max="1000"
                            onChange={
                                (e) => setCanvasSize(e.target.value)
                            }
                        />
                    </div>
                </div>
                <div className="setting">
                    <div className="subtitle">{t("settings.cluesSize")}: {cluesSize}</div>
                    <div className="settingValue">
                        <input type="range"
                            value={cluesSize}
                            min="80"
                            max="200"
                            onChange={
                                (e) => setCluesSize(e.target.value)}
                        />
                    </div>
                </div>
                <div className="setting">
                    <div className="subtitle">{t("settings.fontSize")}: {fontSize}</div>
                    <div className="settingValue">
                        <input type="range"
                            value={fontSize}
                            min="10"
                            max="30"
                            onChange={
                                (e) => setFontSize(e.target.value)}
                        />
                    </div>
                </div>
                <div className="subtitle">{t("settings.saveWarning")}</div>
                <button className="button button--red" onClick={() => handleSaveAndClose()}>
                    {t("settings.saveAndClose")}
                </button>
                <button className="button" onClick={() => closeModalWithAnimation()}>
                    {t("settings.cancel")}
                </button>
            </div>
        </div>
    )
}

export default GameSettings