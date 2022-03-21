class FinnotechError extends Error {    
	constructor(functionName: string, data: any) {
		console.error(`${functionName}: ${data}`);
		super(data);
	}
}

export default FinnotechError;
