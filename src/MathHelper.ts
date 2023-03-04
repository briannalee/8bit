import { ChangeBitSize } from ".";
import { BinaryNumber } from "./BinaryNumber";
import { Environment } from "./Environment";

/**
 * Converts binary representation to decimal, performs the desired math function, then displays the results in binary
 * @param env - Environment used to compute values
 * 
 * TODO: Allow choosing of operand (add,subtract,multiply,divide)
 */
export function Compute(env: Environment): void {

    let results:number = 0;
    for (let r = 0; r < env.rows; r++) {
        results += env.BinaryNumbers[r].getDecimal();
    }
    env.results.setDecimal(results);
}