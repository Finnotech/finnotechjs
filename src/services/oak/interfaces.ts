export interface IFinnotechIbanInquiryResponse {
	trackId: string;
	result: {
		IBAN: string;
		bankName: string;
		deposit: string;
		depositDescription: string;
		depositComment: string;
		depositOwners: {
			firstName: string;
			lastName: string;
		}[];
		depositStatus: string;
		errorDescription: string;
	};
	status: string;
}

export interface IFinnotechCardBalanceResponse {
	trackId: string;
	result: {
		balance: string;
	};
	status: string;
}
