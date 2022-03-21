declare class FinnotechError extends Error {
    readonly data: any;
    constructor(functionName: string, data: any);
}
export default FinnotechError;
