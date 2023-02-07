export class Circle {
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
    context: CanvasRenderingContext2D;

    /**
     * 
     * @param x Centerpoint X coordinate to draw circle
     * @param y Centerpoint Y coordinate to draw circle
     * @param radius Radius of circle to draw
     * @param context Canvas context to draw on
     */
    constructor(x : number, y: number, radius:number, context: CanvasRenderingContext2D)
    constructor(x : number, y: number, radius:number, context: CanvasRenderingContext2D, set?:Boolean) {
        this.x = x;
        this.y = y;
        this.set = set ?? false;
        this.radius = radius;
        this.left = x-radius;
        this.top = y-radius;
        this.right = x+radius;
        this.bottom = y+radius;
        this.context = context;
        this.draw(this.context);
    }

    /**
     * Switches the bit value and redraw
     */
    switchBit() {
        this.set = !this.set;
        this.draw(this.context);
    }

    /**
     * Sets the bit value for the circle to the provided bit and redraw
     * @param bit - Setting to apply to the bit
     */
    setBit(bit: boolean) {
        this.set = bit;
        this.draw(this.context);
    }

    /**
     * Draws the circle
     * @param context - The canvas context to draw on
     */
    draw(context: CanvasRenderingContext2D): void {
        context.clearRect(this.left-2, this.top-2, this.radius*2+4, this.radius*2+4);
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        context.fillStyle = this.set ? "white" : "#0f0f0f";
        context.fill();
        context.closePath();
    }
}