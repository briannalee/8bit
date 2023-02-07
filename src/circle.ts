export class Circle {
    /**
     * Class that holds info about a circle drawn on an HTML canvas, representing a visual bit of data.
     * 
     * @param x - Centerpoint X coordinate of circle
     * @param y - Centerpoint Y coordinate of circle
     * @param radius - Radius of circle to draw
     * @param context - Canvas context to draw on
     * @param set - Optional parameter, default false
     * 
     * @returns - void
     */
    set:Boolean;
    x:number;
    y:number;
    radius:number;
    left: number;
    top: number;
    right: number;
    bottom: number;

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
        this.draw(context);
    }

    /**
     * Draws the circle
     * @param context - The canvas context to draw on
     */
    draw(context: CanvasRenderingContext2D): void {
        context.clearRect(this.left, this.top, this.radius*2, this.radius*2);
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        context.fillStyle = this.set ? "white" : "grey";
        context.fill();
        context.closePath();
    }
}