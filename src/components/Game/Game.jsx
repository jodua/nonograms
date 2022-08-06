import { useStopwatch } from "react-timer-hook"
import { useTranslation } from "react-i18next"
import { useEffect, useRef, useState } from "react"
import { useParams } from "react-router-dom";
import levels from "../../nonogram-mock";

import { FaClock } from "react-icons/fa";
import { BsFillGearFill } from "react-icons/bs";
import GameCanvas from "./GameCanvas"
import Modal from "../Modal/Modal"
import GameSettings from "./GameSettings";

import "../../styles/Game/Game.scss"
import "../../styles/common/Structure.scss"
import "../../styles/common/Button.scss"

const Game = () => {

    const { minutes, seconds, pause, reset } = useStopwatch({ autoStart: true });

    const { t } = useTranslation();

    const params = useParams();

    const [openModal, setOpenModal] = useState(false);
    const [modalTitle, setModalTitle] = useState("");
    const [modalContent, setModalContent] = useState("");
    const [modalButtonMsg, setModalButtonMsg] = useState("");

    const [openSettings, setOpenSettings] = useState(false);
    const [settings, setSettings] = useState(
        JSON.parse(localStorage.getItem("settings"))
    );

    const [nonogram, setNonogram] = useState(null);

    const game = useRef(null);

    useEffect(() => {
        setNonogram(levels[params.id]);
    }, [params])

    useEffect(() => {
        if (game.current) {
            if (settings) {
                game.current.updateSettings(settings);
            }
        }
    }, [settings])


    const closeModal = () => {
        setOpenModal(false);
    }

    const handleWinCheck = () => {
        if (game.current.gameCheck()) {
            pause();
            setModalTitle(t("game.win"));
            setModalContent(t("game.winMessage") + " " + t("game.time") + " " + String(minutes).padStart(2, '0') + ":" + String(seconds).padStart(2, '0'));
            setModalButtonMsg(t("game.winButton"));
        }
        else {
            setModalTitle(t("game.lose"));
            setModalContent(t("game.loseMessage"));
            setModalButtonMsg(t("game.loseButton"));
        }
        setOpenModal(true);
    }

    const handleShowErrors = () => {
        game.current.gameErrors();
    }

    const handleGameRestart = () => {
        game.current.gameReset();
        reset();
    }

    const handleSettings = () => {
        setOpenSettings(true);
    }

    const closeSettings = () => {
        setOpenSettings(false);
    }

    return (
        <div className="mainContainer">
            <div className="centeredContainer">
                <div className="gameBar">
                    <div className="gameBarSection">
                        <div className="gameBarSectionItem">
                            {t("game.level")}: {params.id}
                        </div>
                    </div>
                    <div className="gameBarSection clockSection">
                        <div className="gameBarSectionItem">
                            <FaClock />
                        </div>
                        <div className="gameBarSectionItem clock">
                            {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
                        </div>
                    </div>
                </div>
                <div className="gameBoard">
                    {
                        nonogram
                            ? <GameCanvas
                                nonogram={nonogram}
                                settings={settings}
                                ref={game} />
                            : <div className="gameBoardLoading">
                                <div className="gameBoardLoadingText">
                                    {t("game.loading")}
                                </div>
                            </div>
                    }
                </div>
                <div className="gameBar ">
                    <div className="gameBarSection">
                        <div className="gameBarSectionItem">
                            <button className="button"
                                onClick={() => handleSettings()}
                            >
                                <BsFillGearFill />
                            </button>
                        </div>
                        <div className="gameBarSectionItem">
                            <button className="button"
                                onClick={() => handleWinCheck()}
                            >
                                {t("game.check")}
                            </button>
                        </div>
                    </div>
                    <div className="gameBarSection">
                        <div className="gameBarSectionItem">

                            <button className="button"
                                onClick={() => handleShowErrors()}
                            >
                                {t("game.errorsShow")}
                            </button>
                        </div>
                        <div className="gameBarSectionItem">
                            <button className="button button--red"
                                onClick={() => handleGameRestart()}
                            >
                                {t("game.restart")}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {
                openModal && <Modal
                    modalTitle={modalTitle}
                    modalContent={modalContent}
                    modalButtonMsg={modalButtonMsg}
                    closeHandler={closeModal} />
            }
            {
                openSettings && <GameSettings
                    settings={settings}
                    setSettings={setSettings}
                    currentLevel={nonogram}
                    setLevel={setNonogram}
                    closeHandler={closeSettings} />
            }
        </div>
    )
}

export default Game