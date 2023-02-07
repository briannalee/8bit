import { Environment } from "./environment";

/**
 * Converts binary representation to decimal, performs the desired math function, then displays the results in binary
 * @param env - Environment used to compute values
 * 
 * TODO: Allow choosing of operand (add,subtract,multiply,divide)
 */
export function Compute(env: Environment): void {

    // Convert the binary circles into a decimal number for each row
    let decimal:number[] = new Array(env.rows)
    let results:number = 0;
    for (let r = 0; r < env.rows; r++) {
        decimal[r] = 0;
        for (let c = env.columns-1; c >= 0; c--) {
            if (env.circles[r][c].set) {
                decimal[r] += Math.pow(2, env.columns-1-c);
            }
        }
        results += decimal[r];
    }

    // Update the result circles
    let binaryResult = convertToBinary(results);
    let index: number = 0;
    for (let c = env.columns-1; c >= 0; c--) {
        env.results[c].setBit(binaryResult[index] > 0 ? true : false);
        index++;
    }
}

/**
 * 
 * @param num - Decimal number to be converted into binary
 * @param bits - Length of result
 * @returns - An array containing the binary representation of the decimal number
 */
function convertToBinary(num : number, bits?: number) : number[] {
    const arrBitwise = [0]; // save the resulting bitwise
    bits= bits ?? 32;
    for (let i=0; i<bits; i++) {
        let mask = 1;

        const bit = num & (mask << i); // And bitwise with left shift

        if(bit === 0) {
            arrBitwise[i] = 0;
        } else {
            arrBitwise[i] = 1;
        }
    }

    return arrBitwise;
}