import { useRef, useEffect, forwardRef, useImperativeHandle, useState } from 'react';
import Game from '../../game/Game';
import "../../styles/Game/GameCanvas.scss"

const GameCanvas = forwardRef(({ nonogram, settings }, ref) => {

    const canvasRef = useRef(null);

    const [game, setGame] = useState(null);

    useImperativeHandle(ref, () => ({
        gameReset: () => game.reset(),
        gameCheck: () => game.checkSolution(),
        gameErrors: () => game.drawErrors(),
        updateSettings: () => game.updateSettings(settings)
    }));


    useEffect(() => {
        const canvas = canvasRef.current;
        if (game === null) {
            setGame(new Game(canvas, nonogram, settings));
        }
    }, [nonogram, game, settings])

    useEffect(() => {
        if (game) {
            game.updateNonogram(nonogram);
        }
    }, [nonogram, game])

    return (
        <div className="gameCanvasContainer">
            <canvas
                ref={canvasRef}
                onContextMenu={e => e.preventDefault()}
                className="gameCanvas"
                width={settings.canvasSize}
                height={settings.canvasSize}>
            </canvas>
        </div>
    )
})

export default GameCanvas