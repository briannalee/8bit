import { debounce } from "./debounce";
import { Environment } from "./environment";

let env: Environment;
let debounceWindowResize = debounce(DeleteCanvas, 200);

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
    env = new Environment();
}

/**
 * Deletes the Canvas, and creates a new Environment
 */
function DeleteCanvas(){
    if (document.getElementById("viewport") != null) {
        document.getElementById("viewport")!.remove();
        CreateEnvironment();
    }
}
