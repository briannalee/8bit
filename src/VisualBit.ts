import { Environment } from "./Environment";

export class VisualBit {
    /**
     * Class that holds info about a circle drawn on an HTML canvas, representing a visual bit of data.
     */

    set:Boolean;
    x:number;
    y:number;
    radius:number;
    left: number;
    top: number;
    right: number;
    bottom: number;
    env: Environment;
    fillColor: string;

    /**
     * 
     * @param x Centerpoint X coordinate to draw circle
     * @param y Centerpoint Y coordinate to draw circle
     * @param radius Radius of circle to draw
     * @param env Canvas context to draw on
     */
    constructor(x : number, y: number, radius:number, env: Environment)
    constructor(x : number, y: number, radius:number, env: Environment, set?:Boolean) {
        this.x = x;
        this.y = y;
        this.set = set ?? false;
        this.radius = radius;
        this.left = this.x-radius-1;
        this.top = this.y-radius-1;
        this.right = this.x+radius+1;
        this.bottom = this.y+radius+1;
        this.env = env;
        this.fillColor = "white";
        this.draw();
    }

    /**
     * Switches the bit value and redraw
     */
    switchBit() {
        this.set = !this.set;
        this.draw();
        
    }

    /**
     * Sets the bit value for the circle to the provided bit and redraw
     * @param bit - Setting to apply to the bit
     */
    setBit(bit: boolean) {
        this.set = bit;
        this.draw();
    }

    setOverflow(overflow: boolean) {
        if(overflow) this.fillColor = "red"; 
        else this.fillColor = "white";
    }

    /**
     * Draws the circle
     * @param context - The canvas context to draw on
     */
    draw(): void {
        const context: CanvasRenderingContext2D = this.env.canvas.context;
        context.clearRect(this.left, this.top, this.radius*2+2, this.radius*2+2);
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        context.fillStyle = this.set ? this.fillColor : "#0f0f0f";
        context.strokeStyle = this.set ? "#95c299" : "#330400" ;
        context.fill();
        context.stroke();
        context.closePath();
    }
}