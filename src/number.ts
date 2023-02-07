import { Circle } from "./circle";

export class Number {
    private bits: number = 8;
    private decimalValue: number = 0;
    private binaryValue: string = "00000000";
    private circles: Circle[] = new Array(this.bits);

    public constructor();
    public constructor(bits?: number, decimalValue?: number, binaryValue?: string) {
        this.decimalValue = decimalValue ?? 0;
        this.setDecimal(this.decimalValue)
    }

    public getDecimal(): number {
        return this.decimalValue;
    }

    public getBinary(): string {
        return this.binaryValue;
    }

    public setBit(index: number, bool: boolean) {
        this.binaryValue = this.setCharAt(this.binaryValue,index, bool ? "1":"0");
    }
    public setDecimal(decimalValue : number) {
        this.decimalValue = decimalValue;
        this.binaryValue = decimalValue.toString(2);
        this.bits = 2 * Math.round(this.binaryValue.length / 2); 
    }

    private setCharAt(str: string,index: number,chr: string) {
        if(index > str.length-1) return str;
        return str.substring(0,index) + chr + str.substring(index+1);
    }
}

