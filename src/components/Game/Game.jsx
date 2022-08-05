import "../../styles/Game/Game.scss"
import GameCanvas from "./GameCanvas"
import { useStopwatch } from "react-timer-hook"
import { useTranslation } from "react-i18next"
import { useEffect, useRef, useState } from "react"
import { useParams } from "react-router-dom";
import Modal from "../Modal/Modal"
import levels from "../../nonogram-mock";

const Game = () => {

    const { minutes, seconds, pause, reset } = useStopwatch({ autoStart: true });

    const { t } = useTranslation();

    const params = useParams();

    const [openModal, setOpenModal] = useState(false);
    const [modalTitle, setModalTitle] = useState("");
    const [modalContent, setModalContent] = useState("");
    const [modalButtonMsg, setModalButtonMsg] = useState("");

    const [nonogram, setNonogram] = useState(null);

    const game = useRef(null);

    useEffect(() => {
        setNonogram(levels[params.id]);
    }, [params])


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

    return (
        <div className="gameContainer">
            <div className="gameCenter">
                <div className="gameTopbar">
                    <div className="gameTopbarLeft">
                        <div className="gameTopbarItem">
                            Level 0
                        </div>
                    </div>
                    <div className="gameTopbarRight">
                        <div className="gameTopbarItem">
                            {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
                        </div>
                    </div>
                </div>
                <div className="gameBoard">
                    {
                        nonogram
                            ? <GameCanvas nonogram={nonogram} ref={game} />
                            : <div className="gameBoardLoading">
                                <div className="gameBoardLoadingText">
                                    {t("game.loading")}
                                </div>
                            </div>
                    }
                </div>
                <div className="gameBottombar">
                    <div className="gameBottombarLeft">
                        <div className="gameBottombarItem">
                            <button className="gameCheckButton"
                                onClick={() => handleWinCheck()}
                            >
                                {t("game.check")}
                            </button>
                        </div>
                    </div>
                    <div className="gameBottombarRight">
                        <button className="gameShowErrorsButton"
                            onClick={() => handleShowErrors()}
                        >
                            {t("game.errorsShow")}
                        </button>
                        <button className="gameRestartButton"
                            onClick={() => handleGameRestart()}
                        >
                            {t("game.restart")}
                        </button>
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
        </div>
    )
}

export default Game