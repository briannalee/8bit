import { Circle } from "./circle";
import { Canvas } from "./canvas";

export class Environment {
    /**
     * Contains information about the visual calculator
     */
    circles:Circle[][];
    radius:number;
    startX:number;
    startY:number;
    columns:number;
    rows:number;
    padding:number;
    spacing:number;
    canvas:Canvas;

    /**
     * Creates a canvas and draws circles on it to represent (row) binary numbers of (columns) bit length.
     * @param radius - Circle radius
     * @param columns - Number of columns (bits)
     * @param rows - Number of rows (numbers)
     * @param padding - Spacing in between circles
     */
    constructor();
    constructor(columns?:number,rows?:number,padding?:number) {
        this.columns = columns ?? 8;
        this.rows = rows ?? 2;
        this.padding = padding ?? 5;

        //Compute the radius of the circles that can fit in the window
        let desiredRadius:number = (innerWidth/2)/this.columns - this.padding*2;
        this.radius = desiredRadius < 10 ? 10 : desiredRadius;

        this.spacing = (this.radius*2)+this.padding;
        this.startX = (innerWidth/2)+this.radius-this.padding*2-(this.columns*this.spacing)/2;
        this.startY = (innerHeight/2)-this.radius+this.padding*2-this.rows*this.spacing/2;
        this.circles = new Array(this.rows);
        this.canvas = new Canvas(this);
        
        // Creates the circles for each row (number) with the amount of bits (columns) requested.
        for (let r = 0; r < this.rows; r++) {
            this.circles[r]=new Array(this.columns);
            for (let i = 0; i < this.columns; i++) {
                this.circles[r][i]= new Circle(this.startX + (i * this.spacing),this.startY + (this.radius + this.spacing*r),this.radius,this.canvas.context);
            }
        }
    }
}