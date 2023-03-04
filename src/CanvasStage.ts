import { start } from "repl";
import { ChangeBitSize } from ".";
import { Environment } from "./Environment";
import { Compute } from "./MathHelper";

/**
 * Interface to hold coordinates for a mouse click event
 */
export interface mouseClick {
    x: number;
    y: number;
}

export class CanvasStage {
    /**
     * Contains info about the canvas DOM object
     */
    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D;
    environment: Environment;

    /**
     * Creates a canvas to draw on, handling input
     * 
     * @param environment - The Environment class that created this canvas
     */
    constructor(environment: Environment) {
        this.environment = environment;

        // Set background color to black
        document.body.style.backgroundColor = "black";

        // Create canvas and append to page, with error handling
        if (!(this.canvas = document.createElement("canvas") as HTMLCanvasElement)) {
            throw new Error("Unable to create canvas");
        }
        // Set ID of the canvas, for CSS styling
        this.canvas.id = "viewport";
        
        // Append the canvas to the container div, with error handling
        let containerDiv: HTMLElement;
        if (!(containerDiv = document.getElementById("main")!)) {
            throw new Error("Unable to append canvas to container");
        }
        containerDiv.append(this.canvas)!
        
        // Get context, with error handling
        if (!(this.context = this.canvas.getContext("2d")!)) {
            throw new Error("2d context not supported or canvas already initialized");
        }

        //Add input event handling
        let classAccessor = this;
        this.canvas.addEventListener("mouseup", function(e)
        {
            classAccessor.mouseClickEvent(e);
        });

        document.getElementById("compute")?.addEventListener("click",function(e) {
            Compute(classAccessor.environment);
        });

        let bitsInput : HTMLInputElement = document.getElementById("bits")! as HTMLInputElement;
        if (bitsInput) {
            bitsInput.addEventListener("input",function(e) {
                let value: number;
                if (value = parseInt(bitsInput.value)) {
                    ChangeBitSize(value);
                }
            });
        }

        this.canvas.width = environment.width;
        this.canvas.height = environment.height;

        this.drawLine();
    }

    /**
     * 
     * @param event - Mouse click event
     * @returns - Coordinates as mouseClick interface
     */
    getMousePosition(event: MouseEvent) : mouseClick {
        let rect = this.canvas.getBoundingClientRect(), // abs. size of element
        scaleX = this.canvas.width / rect.width,    // relationship bitmap vs. element for x
        scaleY = this.canvas.height / rect.height;  // relationship bitmap vs. element for y

        return {
            x: (event.clientX - rect.left) * scaleX,   // scale mouse coordinates after they have
            y: (event.clientY - rect.top) * scaleY     // been adjusted to be relative to element
        }
    }

    /**
     * Detects which circle was clicked on, and switches that bit
     * 
     * @param e - Triggering event
     * @param canvas - Canvas class that is currently being used
     */
    mouseClickEvent(e:MouseEvent) {
        let mousePos : mouseClick = this.getMousePosition(e);
        for (let row = 0; row < this.environment.rows; row++) {
            const spacing = this.environment.spacing;
            const startY = this.environment.startY;
            const startX = this.environment.startX;
            const radius = this.environment.radius;
            
            if ((mousePos.y > startY+row*spacing && mousePos.y < (startY+row*spacing)+spacing)) {
                for (let col = 0; col < this.environment.columns; col++) {
                    if ((mousePos.x > startX + (col*spacing-radius)) &&
                        (mousePos.x < startX + (col*spacing+radius))) {
                            this.environment.BinaryNumbers[row].setBit(col);
                        }
                        }
            }
        }
    }

    /**
     * Draws the divider line between the numbers and results display
     */
    drawLine() {
        this.context.beginPath();
        const yPos : number = this.environment.startY+this.environment.spacing/4+this.environment.rows*this.environment.spacing;
        const xPos : number = this.environment.startX - this.environment.radius;
        this.context.moveTo(xPos, yPos);
        this.context.lineTo(xPos + this.environment.columns*this.environment.spacing,  yPos);
        this.context.strokeStyle = "white";
        this.context.stroke();
        this.context.closePath();
    }

    drawButtons() {

    }
}

