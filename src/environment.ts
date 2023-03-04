import { VisualBit } from "./VisualBit";
import { CanvasStage } from "./CanvasStage";
import { BinaryNumber } from "./BinaryNumber";

export class Environment {
    /**
     * Contains information about the visual calculator
     */

    /**
     * An array, first dimension is the row (number), second dimension is the column (bit)
     */
    circles:VisualBit[][];

    /**
     * Number class array, each Number holds a row (number)
     */
    BinaryNumbers:BinaryNumber[];

    /**
     * A BinaryNumber to display the results
     */
    results:BinaryNumber;

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
    canvas:CanvasStage;

    /**
     * The width of the canvas
     */
    width:number;

    /**
     * The height of the canvas
     */
    height:number;

    /**
     * The padding surrounding the draw area
     */
    pagePadding:number = 10;

    /**
     * Minimum radius of circle in pixels
     */
    minWidth:number = 10;

    /**
     * Maximum bits the page can fit
     */
    MaxBits:number;

    /**
     * Creates a canvas and draws circles on it to represent (row) binary numbers of (columns) bit length.
     * @param columns - Number of columns (bits)
     * @param rows - Number of rows (numbers)
     */
    constructor(columns:number,rows:number) {
        this.columns = columns;
        this.rows = rows;
        let padding: number = 5;

        //Determine the drawing area size
        this.width = Math.min(window.innerWidth, document.documentElement.clientWidth) - (this.pagePadding*2);
        this.height = Math.min(window.innerHeight, document.documentElement.clientHeight) - (this.pagePadding*2);

        //Maximum columns we could have with the minWidth
        this.MaxBits =  Math.floor((this.width) / ((this.minWidth*2)+padding));
        this.columns = Math.max(Math.min(this.MaxBits, this.columns),2);
        let bitInput : HTMLInputElement = document.getElementById("bits") as HTMLInputElement;
        bitInput.value = this.columns.toString();

        // Compute the maximum radius that allows all the circles to fit on the page
        this.radius = Math.max(
            this.minWidth,
            Math.floor(
                Math.min(
                    (((this.width) - padding*this.columns)/2) / this.columns,
                    (((this.height) - (padding*(this.rows+2)))/2) / (this.rows+2)
                )
            )
        );
        
        //The space between each circle
        this.spacing = this.radius * 2 + padding;

        // Determine the starting position to draw the circles
        let totalWidth = this.columns * this.spacing - padding*2;
        let startX = (this.width - totalWidth) / 2 + this.radius;
        let totalHeight = ((this.rows+2) * this.spacing) - padding*2;
        let startY = (this.height - totalHeight) / 2;

        this.startX = startX;
        this.startY = startY;

        // Init circle array
        this.circles = new Array(this.rows);
        this.BinaryNumbers = new Array(this.rows);

        // Create canvas to draw on
        this.canvas = new CanvasStage(this);
        this.results = new BinaryNumber(this,this.rows+1);
        
        // Creates the circles for each row (number) with the amount of bits (columns) requested.
        for (let r = 0; r < this.rows; r++) {
            this.BinaryNumbers[r] = new BinaryNumber(this,r);
        }
    }
}