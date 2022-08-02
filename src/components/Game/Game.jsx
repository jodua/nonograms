import "../../styles/Game/Game.scss"
import GameCanvas from "./GameCanvas"
import nonogram from "../../nonogram-mock"

const Game = () => {
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
                            00:00
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