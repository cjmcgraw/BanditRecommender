
/**
 * The purpose of this utility function is to easily allow us to print to the console
 * log of the browser. This is mainly for debugging and readability while working on this
 * application. 
 * 
 * @param fileName string representing the filename to use when logging
 */
export function buildConsoleLogFn(fileName: string): (msg: string) => void {
  return (msg: string) => {
    const now = new Date().toISOString();
    console.log(`${now} [${fileName}] - ${msg}`);
  }
}