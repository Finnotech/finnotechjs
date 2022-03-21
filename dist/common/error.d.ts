declare class FinnotechError extends Error {
    constructor(functionName: string, data: any);
}
export default FinnotechError;
