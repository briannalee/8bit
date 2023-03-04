import { kill } from "process";
import { ChangeBitSize } from ".";
import { Environment } from "./Environment";
import { VisualBit } from "./VisualBit";

/**
 * Number class represents a value (one column), containing the decimal & binary value
 * Holds the array of circles used to visually represent the binary value
 */
export class BinaryNumber {
    private bits: number;
    private decimalValue: number;
    private binaryValue: string;
    public VisualBits: VisualBit[];
    private env: Environment;
    private row: number;

    public constructor(env: Environment, row: number);
    public constructor(env: Environment, row: number, decimalValue?: number) {
        this.env = env;
        this.row = row;
        this.decimalValue = decimalValue ?? 0;
        this.binaryValue = this.decimalValue.toString(2);
        const newBits = 2 * Math.round(this.binaryValue.length / 2);
        this.bits = newBits > this.env.columns ? newBits : this.env.columns;
        this.VisualBits = new Array(this.bits);
        this.createVisualBits();
        this.setDecimal(this.decimalValue);
    }

    private setCircleValues() {
        let overflow: boolean = false;
        let binary: string = this.binaryValue;

        if (this.VisualBits.length < binary.length) {
            binary = binary.substring(binary.length-this.VisualBits.length);
            binary = this.setCharAt(binary,0,"1");
            overflow = true;
        }

        for (let i = this.VisualBits.length - 1; i >= 0; i--) {
            this.VisualBits[i].setOverflow(overflow);
            this.VisualBits[i].setBit(binary.charAt(i) == "1" ? true : false);
        }
    }

    private createVisualBits() {
        for (let c = this.bits-1; c >= 0; c--) {
            this.VisualBits[c]= this.addVisualBit(c);
        }
    }

    private addVisualBit(column: number) : VisualBit {
        return new VisualBit(this.env.startX + column * this.env.spacing, this.env.startY + this.env.radius + this.env.spacing * this.row, this.env.radius, this.env);
    }

    public getDecimal(): number {
        return this.decimalValue;
    }

    public getBinary(): string {
        return this.binaryValue;
    }

    public setBit(index: number, bool?: boolean) {
        bool = bool ?? !this.VisualBits[index].set;
        this.binaryValue = this.setCharAt(this.binaryValue,index, bool ? "1":"0");
        this.VisualBits[index].setBit(bool);
        this.decimalValue = parseInt(this.binaryValue, 2);
    }

    private updateBinaryString() {
        this.binaryValue = this.decimalValue.toString(2);
        if (this.binaryValue.length < this.env.columns) this.binaryValue = this.binaryValue.padStart(this.env.columns,"0");
    }

    public setDecimal(decimalValue : number) {
        this.decimalValue = decimalValue;
        this.updateBinaryString();
        this.setCircleValues();
    }

    private setCharAt(str: string,index: number,chr: string) {
        if(index > str.length-1) return str;
        return str.substring(0,index) + chr + str.substring(index+1);
    }
}

