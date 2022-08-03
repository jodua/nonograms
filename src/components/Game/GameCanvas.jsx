import { useRef, useEffect, forwardRef, useImperativeHandle } from 'react';
import "../../styles/Game/GameCanvas.scss"

const GameCanvas = forwardRef(({ nonogram }, ref) => {

    useImperativeHandle(ref, () => ({
        checkWin: () => checkWin(canvasRef.current, nonogram)
    }));

    const canvasRef = useRef(null);

    const drawBackground = (canvas) => {
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = '#FFF';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    const drawGrid = (canvas, nonogramWidth, nonogramHeight) => {
        const ctx = canvas.getContext('2d');
        ctx.strokeStyle = '#000';

        for (let i = 100; i < canvas.width; i += 400 / nonogramWidth) {
            ctx.moveTo(i, 0);
            ctx.lineTo(i, canvas.height);
        }

        for (let i = 100; i < canvas.height; i += 400 / nonogramHeight) {
            ctx.moveTo(0, i);
            ctx.lineTo(canvas.width, i);
        }

        ctx.stroke();
    }

    const drawClues = (canvas, nonogram, clues) => {
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = '#000';
        ctx.font = '20px Arial';

        clues.horizontal.forEach((clue, index) => {
            clue.forEach((cell, cellIndex) => {
                if (cell) {
                    ctx.fillText(cell, 110 + index * 400 / nonogram.width, 22 * (cellIndex + 1));
                }
            })
        }
        );

        clues.vertical.forEach((clue, index) => {
            ctx.fillText(clue, 20, 120 + index * 400 / nonogram.height);
        }
        );
    }

    const getClues = (nonogram) => {
        let clues = {
            horizontal: [],
            vertical: []
        }

        for (const row of nonogram.fields) {
            let rowClues = [];
            let clueValue = 0;
            for (const cell of row) {
                if (cell === 1) {
                    clueValue++;
                }
                else {
                    if (clueValue > 0) {
                        rowClues.push(clueValue);
                        clueValue = 0;
                    }
                }
            }
            clueValue !== 0 && rowClues.push(clueValue)
            clues.vertical.push(rowClues);
        }

        const transposed = nonogram.fields[0].map((_, colIndex) => nonogram.fields.map(row => row[colIndex]));

        for (const row of transposed) {
            let rowClues = [];
            let clueValue = 0;
            for (const cell of row) {
                if (cell === 1) {
                    clueValue++;
                }
                else {
                    if (clueValue > 0) {
                        rowClues.push(clueValue);
                        clueValue = 0;
                    }
                }
            }
            clueValue !== 0 && rowClues.push(clueValue)
            clues.horizontal.push(rowClues);
        }

        return clues;
    }

    const getSquareIndex = (event) => {
        const posX = event.clientX - canvasRef.current.offsetLeft - 100;
        const posY = event.clientY - canvasRef.current.offsetTop - 100;

        const squareX = Math.floor(posX / (400 / nonogram.width));
        const squareY = Math.floor(posY / (400 / nonogram.height));
        return { x: squareX, y: squareY }
    }

    const getSquareCoordinates = (squareIndex) => {
        const squareX = squareIndex.x * (400 / nonogram.width) + 100;
        const squareY = squareIndex.y * (400 / nonogram.height) + 100;
        return { x: squareX, y: squareY }
    }

    const isColored = (canvas, squareIndex) => {
        const ctx = canvas.getContext('2d')
        const squareCoordinates = getSquareCoordinates(squareIndex);
        const pixel = ctx.getImageData(squareCoordinates.x + 1, squareCoordinates.y + 1, 1, 1).data;
        return pixel[0] === 0 && pixel[1] === 0 && pixel[2] === 0 && pixel[3] === 255;
    }

    const colorSquare = (event, canvas) => {
        const squareIndex = getSquareIndex(event);
        const squareCoordinates = getSquareCoordinates(squareIndex);
        if (squareIndex.x >= 0 && squareIndex.y >= 0) {
            const ctx = canvas.getContext('2d');
            ctx.fillStyle = isColored(canvas, squareIndex) ? '#FFF' : '#000';
            ctx.fillRect(squareCoordinates.x, squareCoordinates.y, 400 / nonogram.width, 400 / nonogram.height);
            ctx.strokeStyle = '#000';
            ctx.strokeRect(squareCoordinates.x, squareCoordinates.y, 400 / nonogram.width, 400 / nonogram.height);
        }
    }

    const checkWin = (canvas, nonogram) => {
        for (let i = 0; i < nonogram.fields.length; i++) {
            for (let j = 0; j < nonogram.fields[i].length; j++) {
                if (nonogram.fields[i][j] === 1 && !isColored(canvas, { x: j, y: i })) {
                    return false;
                }
            }
        }
        return true;
    }

    useEffect(() => {
        drawBackground(canvasRef.current);
        drawGrid(canvasRef.current, nonogram.width, nonogram.height);
        drawClues(canvasRef.current, nonogram, getClues(nonogram));
    }, [nonogram])


    return (
        <div className="gameCanvasContainer">
            <canvas
                ref={canvasRef}
                onClick={(e) => colorSquare(e, canvasRef.current)}
                className="gameCanvas"
                width="500"
                height="500">
            </canvas>
        </div>
    )
})

export default GameCanvas