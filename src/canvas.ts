import { Environment } from "./environment";
import { Compute } from "./math";

/**
 * Interface to hold coordinates for a mouse click event
 */
export interface mouseClick {
    x: number;
    y: number;
}

export class Canvas {
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
        if (!(containerDiv = document.getElementById("container")!)) {
            throw new Error("Unable to append canvas to container");
        }
        containerDiv.append(this.canvas)!
        
        // Get context, with error handling
        if (!(this.context = this.canvas.getContext("2d")!)) {
            throw new Error("2d context not supported or canvas already initialized");
        }

        //Add input event handling
        let classAccessor = this;
        this.canvas.addEventListener("mousedown", function(e)
        {
            classAccessor.mouseClickEvent(e, classAccessor);
        });

        document.getElementById("compute")?.addEventListener("click",function(e) {
            Compute(classAccessor.environment);
        });
        
        this.canvas.width = innerWidth;
        this.canvas.height = innerHeight;

        this.drawLine();
    }

    /**
     * 
     * @param event - Mouse click event
     * @returns - Coordinates as mouseClick interface
     */
    getMousePosition(event: MouseEvent) : mouseClick {
        let rect = this.canvas.getBoundingClientRect();
        let x = event.clientX - rect.left;
        let y = event.clientY - rect.top;
        return {x:x, y:y}
    }

    /**
     * Detects which circle was clicked on, and switches that bit
     * 
     * @param e - Triggering event
     * @param canvas - Canvas class that is currently being used
     */
    mouseClickEvent(e:MouseEvent, canvas:Canvas) {
        let mousePos : mouseClick = canvas.getMousePosition(e);
    
        let row:number = mousePos.y
    
        for (let row = 0; row < canvas.environment.rows; row++) {
            const spacing = canvas.environment.spacing;
            const startY = canvas.environment.startY;
            const startX = canvas.environment.startX;
            const radius = canvas.environment.radius;
            if ((mousePos.y > startY+row*spacing && mousePos.y < (canvas.environment.startY+row*spacing)+spacing)) {
                for (let col = 0; col < canvas.environment.columns; col++) {
                    
                    if ((mousePos.x > startX-radius+col*spacing && mousePos.x < canvas.environment.startX+radius+col*spacing)) {
                        canvas.environment.circles[row][col].switchBit();
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



