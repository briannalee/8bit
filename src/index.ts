import { BinaryNumber } from "./BinaryNumber";
import { debounce } from "./DebounceValue";
import { Environment } from "./Environment";

let env: Environment;
let debounceWindowResize = debounce(DeleteCanvas, 200);
let debounceBitResize = debounce(changeBits, 200);
let columns: number = 8;
let rows: number = 2;

Create();

/**
 * Handles the creation of the Environment. Adds a handler to the window that will recreate the Environment whenever the window is resized.
 */
function Create() {
    CreateEnvironment();

    // Debounced window resize input handler
    window.addEventListener("resize", function(e) {
        debounceWindowResize();
    });
}

/**
 * Creates a new Environment
 */
function CreateEnvironment(): void {
    env = new Environment(columns,rows);
}

/**
 * Deletes the Canvas, and creates a new Environment
 */
function DeleteCanvas(){
    if (document.getElementById("viewport") != null) {
        document.getElementById("viewport")!.remove();

        const storeNumbers: BinaryNumber[] = env.BinaryNumbers;
        const resultNumber: BinaryNumber = env.results;

        CreateEnvironment();

        env.results.setDecimal(resultNumber.getDecimal());
        
        for (let i = 0; i < storeNumbers.length; i++) {
                let binaryValue = storeNumbers[i].getBinary();
                binaryValue = binaryValue.substring(binaryValue.length-columns);
                env.BinaryNumbers[i].setDecimal(parseInt(binaryValue,2));
        }
    }
}

export function ChangeBitSize(bits: number) {
    debounceBitResize(bits);
}

function changeBits(bits: number) {
    bits = Math.min(env.MaxBits,bits);
    bits = Math.max(2,bits);
    let bitInput : HTMLInputElement = document.getElementById("bits") as HTMLInputElement;
    bitInput.value = bits.toString();
    columns = bits;
    DeleteCanvas();
}
