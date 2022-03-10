class FinnotechError extends Error {
    readonly data: any;
    
	constructor(functionName: string, data: any) {
		super();
		this.message = `${functionName}: ${data}`;
        this.data = data
	}
}

export default FinnotechError;
