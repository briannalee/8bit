import { Circle } from "./circle";
import { Canvas } from "./canvas";

export class Environment {
    /**
     * Contains information about the visual calculator
     */

    /**
     * An array, first dimension is the row (number), second dimension is the column (bit)
     */
    circles:Circle[][];

    /**
     * An array containing the circles that are used for the results display
     */
    results:Circle[];

    /**
     * Radius of the circle, computed based on window width
     */
    radius:number;

    /**
     * Starting position to draw columns
     */
    startX:number;

    /**
     * Starting position to draw rows
     */
    startY:number;

    /**
     * Number of bits (columns) per number
     */
    columns:number;

    /**
     * Number of numbers (rows)
     */
    rows:number;

    /**
     * Spacing is the total space that each circle takes up with padding
     */
    spacing:number;

    /**
     * The canvas to draw on
     */
    canvas:Canvas;

    /**
     * Creates a canvas and draws circles on it to represent (row) binary numbers of (columns) bit length.
     * @param columns - Number of columns (bits)
     * @param rows - Number of rows (numbers)
     */
    constructor();
    constructor(columns?:number,rows?:number) {
        this.columns = columns ?? 8;
        this.rows = rows ?? 2;
        let padding : number = 5;

        // Compute the radius of the circles that can fit in the window
        let desiredRadius:number = (innerWidth/2)/this.columns - padding*2;
        this.radius = desiredRadius < 10 ? 10 : desiredRadius;
        this.spacing = (this.radius*2)+padding;

        // Determine the starting position to draw the circles
        this.startX = (innerWidth/2)+this.radius-padding*2-(this.columns*this.spacing)/2;
        this.startY = (innerHeight/2)-this.radius+padding*2-(this.rows+1)*this.spacing/2;

        // Init circle array
        this.circles = new Array(this.rows);

        // Create canvas to draw on
        this.canvas = new Canvas(this);

        // Create the results display
        this.results = new Array(this.columns);
        for (let c = 0; c < this.columns; c++) {
            this.results[c]= new Circle(this.startX + c * this.spacing,this.startY + this.radius + this.spacing*this.rows+this.spacing/2,this.radius,this.canvas.context);
        }
        
        // Creates the circles for each row (number) with the amount of bits (columns) requested.
        for (let r = 0; r < this.rows; r++) {
            this.circles[r]=new Array(this.columns);
            for (let c = 0; c < this.columns; c++) {
                this.circles[r][c]= new Circle(this.startX + c * this.spacing,this.startY + this.radius + this.spacing*r,this.radius,this.canvas.context);
            }
        }
    }
}