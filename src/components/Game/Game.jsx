import "../../styles/Game/Game.scss"
import GameCanvas from "./GameCanvas"
import nonogram from "../../nonogram-mock"
import { useStopwatch } from "react-timer-hook"

const Game = () => {

    const { minutes, seconds } = useStopwatch({ autoStart: true });

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
                        <div className="gameTopbarItem">
                            settings
                        </div>
                    </div>
                </div>
                <div className="gameBoard">
                    <GameCanvas nonogram={nonogram} />
                </div>
                <div className="gameBottombar">
                    <div className="gameBottombarLeft">
                        <div className="gameBottombarItem">
                            something
                        </div>
                    </div>
                    <div className="gameBottombarRight">
                        <div className="gameBottombarItem">
                            something
                        </div>
                        <div className="gameBottombarItem">
                            something
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Game