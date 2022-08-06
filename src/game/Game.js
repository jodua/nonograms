import { FieldType } from "./Field";
import GameState from "./GameState";

const DrawType = {
    FILL: 0,
    MARK: 1,
}

class Game {
    constructor(canvas, nonogram, settings) {
        this.canvas = canvas;
        this.ctx = this.canvas.getContext("2d");
        this.gameState = new GameState(nonogram);

        this.setSettings(settings);

        this.drawType = null;
        this.drawn = [];
        this.toAnimate = [];
        this.fillType = null;

        this.fps = 60;
        this.interval = 1000 / this.fps;
        this.lastTime = 0;
        this.running = true;

        this.drawBackground();
        this.drawClues();
        this.drawGrid();
        this.loop();
    }

    setSettings(settings) {
        this.width = this.canvas.width;
        this.height = this.canvas.height;

        this.cluesSize = settings ? parseFloat(settings.cluesSize) : 80;
        this.cluesFactor = (this.width - this.cluesSize) / this.gameState.nonogram.length;
        this.fontSize = settings ? parseInt(settings.fontSize) : 20;
        this.ctx.font = this.fontSize + "px Arial";
        let textMeasurement = this.ctx.measureText("00");
        this.actualFontWidth = textMeasurement.actualBoundingBoxRight - textMeasurement.actualBoundingBoxLeft;
        this.actualFontHeight = textMeasurement.actualBoundingBoxAscent - textMeasurement.actualBoundingBoxDescent;


        this.canvas.addEventListener("mousedown", this.handleMouseDown.bind(this));
        this.canvas.addEventListener("mouseup", this.handleMouseUp.bind(this));
        this.canvas.addEventListener("mousemove", this.handleMouseMove.bind(this));
        this.canvas.addEventListener("mouseleave", this.handleMouseLeave.bind(this));

    }

    updateSettings(settings) {
        this.setSettings(settings);
        this.reset();
    }

    updateNonogram(nonogram) {
        this.gameState.nonogram = nonogram;
        this.updateSettings();
    }

    reset() {
        this.gameState = new GameState(this.gameState.nonogram);
        this.drawBackground();
        this.drawClues();
        this.drawGrid();
    }

    loop() {
        const now = Date.now();
        const delta = now - this.lastTime;
        if (delta > this.interval) {
            this.lastTime = now - (delta % this.interval);
            this.draw();
        }

        if (this.running) {
            requestAnimationFrame(this.loop.bind(this));
        }
    }

    drawBackground() {
        // Fill background with white
        this.ctx.fillStyle = "white";
        this.ctx.fillRect(0, 0, this.width, this.height);
    }

    draw() {
        this.updateFields();
    }

    drawGrid() {
        // Draw grid
        this.ctx.strokeStyle = "black";
        this.ctx.lineWidth = 2;
        const gridSize = (this.width - this.cluesSize) / this.gameState.nonogram.length;
        for (let i = 0; i < this.gameState.nonogram.length; i++) {
            this.ctx.beginPath();
            this.ctx.moveTo(0, i * gridSize + this.cluesSize);
            this.ctx.lineTo(this.height, i * gridSize + this.cluesSize);
            this.ctx.stroke();
            this.ctx.beginPath();
            this.ctx.moveTo(i * gridSize + this.cluesSize, 0);
            this.ctx.lineTo(i * gridSize + this.cluesSize, this.width);
            this.ctx.stroke();
        }
    }

    drawClues() {
        // Get the clues from the game state
        const clues = this.gameState.clues;
        // For each row of horizontal clues
        for (let i = 0; i < clues.horizontal.length; i++) {
            // Draw the clues row
            const row = clues.horizontal[i];
            this.drawCluesRow(row, i, "horizontal");
        }
        // For each row of vertical clues
        for (let i = 0; i < clues.vertical.length; i++) {
            // Draw the clues row
            const row = clues.vertical[i];
            this.drawCluesRow(row, i, "vertical");
        }
    }

    drawCluesBoxes() {
        // Draw horizontal and vertical boxes for clues
        this.ctx.fillStyle = "white";
        this.ctx.fillRect(0, 0, this.width, this.cluesSize);
        this.ctx.fillRect(0, 0, this.cluesSize, this.height);
    }

    drawCluesRow(cluesRow, index, direction) {
        // Check if the clues row is empty
        // If it is, don't draw it
        if (cluesRow.length === 0) {
            return;
        }
        this.ctx.fillStyle = "black";
        // If the direction is horizontal
        if (direction === "horizontal") {
            // Hard formulas, can't explain
            const clueFactor = (this.cluesSize - cluesRow.length * this.actualFontHeight) / (cluesRow.length + 1);
            const cluesOffset = this.cluesSize + ((this.canvas.width - this.cluesSize) / this.gameState.nonogram.length - this.actualFontWidth) / 2;
            for (let i = 0; i < cluesRow.length; i++) {
                const x = cluesOffset + index * this.cluesFactor;
                const y = (i + 1) * clueFactor + (i + 1) * this.actualFontHeight;
                const fillText = String(cluesRow[i]).padStart(2, " ");
                this.ctx.fillText(fillText, x, y);
            }
        }
        // If the direction is vertical
        else {
            // Hard formulas, can't explain
            const clueFactor = (this.cluesSize - cluesRow.length * this.actualFontWidth) / (cluesRow.length + 1);
            const cluesOffset = this.cluesSize + ((this.canvas.height - this.cluesSize) / this.gameState.nonogram.length - this.actualFontHeight) / 2 + this.actualFontHeight;
            for (let i = 0; i < cluesRow.length; i++) {
                const x = (i + 1) * clueFactor + i * this.actualFontWidth;
                const y = cluesOffset + index * this.cluesFactor;
                const fillText = String(cluesRow[i]).padStart(2, " ");
                this.ctx.fillText(fillText, x, y);
            }
        }
    }

    updateFields() {
        // For each field that is set to be animated
        for (const field of this.toAnimate) {
            // Draw the field
            this.drawField(field);
            // Remove the field from the list of fields to animate
            this.toAnimate.splice(this.toAnimate.indexOf(field), 1);
        }
    }

    drawField(field) {
        // Draw the field
        // Get x and y coordinates of the field
        const x = this.cluesSize + field.x * (this.width - this.cluesSize) / this.gameState.nonogram.length;
        const y = this.cluesSize + field.y * (this.height - this.cluesSize) / this.gameState.nonogram[0].length;
        // Get the size of the field
        const width = (this.width - this.cluesSize) / this.gameState.nonogram.length;
        const height = (this.width - this.cluesSize) / this.gameState.nonogram[0].length;
        // Switch on the type of field
        switch (field.type) {
            case FieldType.MARKED:
                this.markRectAnimated(x + 4, y + 4, width - 4, height - 4);
                break;
            case FieldType.ERROR:
                this.errorRectAnimated(x + 4, y + 4, width - 4, height - 4);
                break;
            default:
                const fillColor = this.getFieldColor(field);
                this.fillRectAnimated(x + 1, y + 1, width - 1, height - 1, fillColor);
        }
    }

    markRectAnimated(x, y, width, height) {
        // Animate marked field
        // Draw rectangles of size 2x2 from both top and bottom
        // to create a cross
        this.ctx.fillStyle = "black";
        for (let i = 0; i < width - 4; i++) {
            setTimeout(() => {
                this.ctx.fillRect(x + i, y + i, 2, 2);
                this.ctx.fillRect(x + i, y + height - i - 6, 2, 2);
            }, i * 3);
        }
    }

    errorRectAnimated(x, y, width, height) {
        // Animate error field
        // Draw rectangles of size 2x2 from both top and bottom
        // to create a cross
        this.ctx.fillStyle = "red";
        for (let i = 0; i < width - 4; i++) {
            setTimeout(() => {
                this.ctx.fillRect(x + i, y + i, 2, 2);
                this.ctx.fillRect(x + i, y + height - i - 6, 2, 2);
            }, i * 3);
        }
    }

    fillRectAnimated(x, y, width, height, color) {
        // Animate rectangle fill
        // Draw rectangles from center to edges
        this.ctx.fillStyle = color;
        for (let i = width / 2; i > 0; i--) {
            setTimeout(() => {
                this.ctx.fillRect(x + i, y + i, width - i * 2, height - i * 2);
            }, (width / 2 - i) * 3);
        }
    }

    getField(x, y) {
        // Method to get field by coordinates
        // Returns field or null if not found

        // Formula: Math.floor((coordinate-cluesSize)/(size-cluesSize)/nonogramSize)
        const fieldX = Math.floor((x - this.cluesSize) / (this.width - this.cluesSize) * this.gameState.nonogram.length);
        const fieldY = Math.floor((y - this.cluesSize) / (this.height - this.cluesSize) * this.gameState.nonogram[0].length);

        // Check if coordinates are in bounds
        if (fieldX < 0 || fieldX >= this.gameState.nonogram.length || fieldY < 0 || fieldY >= this.gameState.nonogram[0].length) {
            return null;
        }
        // Return field
        return this.gameState.fields[fieldX][fieldY];

    }

    getFieldColor(field) {
        switch (field.type) {
            case 0:
                // FieldType.EMPTY
                return "white";
            case 1:
                // FieldType.FILLED
                return "black";
            case 2:
                // FieldType.MARKED
                return "black";
            default:
                // FieldType.ERROR
                return "red";
        }
    }

    markField(field) {
        field.type = FieldType.MARKED;
    }

    fillField(field) {
        field.type = FieldType.FILLED;
    }

    clearField(field) {
        field.type = FieldType.EMPTY;
    }

    checkSolution() {
        // Method to check if the solution is correct
        // For every field
        for (const row of this.gameState.fields) {
            for (const field of row) {
                // It field differs from the solution return false
                // Replace marked fields with empty fields
                if (field.type === FieldType.MARKED) {
                    field.type = FieldType.EMPTY;
                    this.toAnimate.push(field);
                }
                if (field.type !== this.gameState.nonogram[field.y][field.x]) {
                    this.toAnimate = [];
                    return false;
                }
            }
        }
        // If all fields are correct return true
        this.updateFields();
        return true;
    }

    drawErrors() {
        // Show FILLED fields that didn't match the solution
        // For every field
        for (const row of this.gameState.fields) {
            for (const field of row) {
                // If field differs from solution
                if (field.type !== this.gameState.nonogram[field.y][field.x]) {
                    // If it is filled
                    if (field.type === FieldType.FILLED) {
                        // Change it's type to ERROR
                        field.type = FieldType.ERROR;
                        // Add it to the list of fields to animate
                        this.toAnimate.push(field);
                    }
                }
            }
        }
    }

    handleFill(field) {
        // If field has not been filled yet
        if (this.drawn.indexOf(field) === -1) {
            // Check drawType
            // If drawType is fill
            if (this.drawType === DrawType.FILL) {
                // Check if field is empty or filled
                // If field is filled or error, clear field
                if (field.type === FieldType.FILLED || field.type === FieldType.ERROR) {
                    this.clearField(field);
                }
                // Else - field is empty, fill field
                else {
                    this.fillField(field);
                }
            }
            // If drawType is mark
            else if (this.drawType === DrawType.MARK) {
                // Check if field is marked
                // If field is marked, clear mark
                if (field.type === FieldType.MARKED) {
                    this.clearField(field);
                }
                // Else if field is empty, mark field
                else if (field.type === FieldType.EMPTY) {
                    this.markField(field);
                }
                // Else - field is filled, cannot mark filled field
                else {
                    return
                }
            }
            // Add field to drawn fields
            this.drawn.push(field);
            // Add field to toAnimate fields
            this.toAnimate.push(field);
        }
    }

    handleMouseMove(event) {
        // Check drawType based on mouse button clicked
        // If no button clicked, do nothing
        if (this.drawType !== null) {
            // Get field under cursor
            const field = this.getField(event.offsetX, event.offsetY);
            // If field is actual game field
            if (field !== null) {
                // If fillType is null this means that this is the first field clicked
                // Set current fillType to field type in order to fill only fields with same type
                if (this.fillType === null) {
                    this.fillType = field.type;
                }
                // If fillType matches field type clicked, fill field
                if (this.fillType === field.type) {
                    this.handleFill(field);
                }
                // If field type is ERROR, fill field
                else if (field.type === FieldType.ERROR) {
                    this.handleFill(field);
                }
            }

        }
    }

    handleMouseUp(event) {
        // Get field under cursor
        const field = this.getField(event.offsetX, event.offsetY);
        // If field is actual game field
        if (field !== null) {
            // If fillType is null this means that this is the first field clicked
            // Set current fillType to field type in order to fill only fields with same type
            if (this.fillType === null) {
                this.fillType = field.type;
            }
            // If fillType matches field type clicked
            if (this.fillType === field.type) {
                this.handleFill(field);
            }
        }
        // Reset fillType, drawType and drawn fields
        this.drawType = null;
        this.drawn = [];
        this.fillType = null;
    }

    handleMouseDown(event) {
        // Set drawType based on mouse button clicked
        // If left button clicked, set drawType to fill
        if (event.button === 0) {
            this.drawType = DrawType.FILL
        }
        // If right button clicked, set drawType to mark
        else if (event.button === 2) {
            this.drawType = DrawType.MARK
        }
    }

    handleMouseLeave(event) {
        // Reset fillType, drawType and drawn fields
        this.drawType = null;
        this.drawn = [];
        this.fillType = null;
    }
}

export default Game;