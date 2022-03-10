export const GRANT_TYPE = {
	CLIENT_CREDENTIALS: 'client_credentials',
	AUTHORIZATION_CODE: 'authorization_code',
	SMS: '',
};

export const SCOPES =  {
	ibanInquiry: {
		name: 'oak:iban-inquiry:get',
		authMode: GRANT_TYPE.CLIENT_CREDENTIALS,
	},
};
