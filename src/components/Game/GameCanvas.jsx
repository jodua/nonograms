import { useRef, useEffect, forwardRef, useImperativeHandle, useState } from 'react';
import Game from '../../game/Game';
import "../../styles/Game/GameCanvas.scss"

const GameCanvas = forwardRef(({ nonogram }, ref) => {

    const canvasRef = useRef(null);

    const [game, setGame] = useState(null);

    useImperativeHandle(ref, () => ({
        gameReset: () => game.reset(),
        gameCheck: () => game.checkSolution(),
        gameErrors: () => game.drawErrors(),
    }));



    useEffect(() => {
        const canvas = canvasRef.current;
        setGame(new Game(canvas, nonogram));
    }, [nonogram])


    return (
        <div className="gameCanvasContainer">
            <canvas
                ref={canvasRef}
                onContextMenu={e => e.preventDefault()}
                className="gameCanvas"
                width="600"
                height="600">
            </canvas>
        </div>
    )
})

export default GameCanvas