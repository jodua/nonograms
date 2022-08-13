import { useState } from "react";
import { useTranslation } from "react-i18next";

import GameData from "./GameData";

import "../../styles/Modal/Modal.scss"
import "../../styles/Game/GameSettings.scss"
import "../../styles/common/Button.scss"
import "../../styles/common/Structure.scss"

const GameSettings = ({ settings, setSettings, closeHandler, currentLevel, setLevel }) => {

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

    const handleLevelExport = () => {
        setDataAction("export");
    }

    const handleLevelImport = () => {
        setDataAction("import");
    }

    const handleDataAction = () => {
        setDataAction(null);
    }

    const [canvasSize, setCanvasSize] = useState(settings.canvasSize);
    const [cluesSize, setCluesSize] = useState(settings.cluesSize);
    const [fontSize, setFontSize] = useState(settings.fontSize);

    const [dataAction, setDataAction] = useState(null);

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
                            min="320"
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
                            min="40"
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
                    {t("buttons.saveAndClose")}
                </button>
                <button className="button" onClick={() => handleLevelExport()}>
                    {t("buttons.export")}
                </button>
                <button className="button" onClick={() => handleLevelImport()}>
                    {t("buttons.import")}
                </button>
                <button className="button" onClick={() => closeModalWithAnimation()}>
                    {t("buttons.cancel")}
                </button>
                {
                    dataAction &&
                    <GameData
                        type={dataAction}
                        currentLevel={currentLevel}
                        closeHandler={() => handleDataAction()}
                        setLevel={setLevel} />

                }
            </div>
        </div>
    )
}

export default GameSettings