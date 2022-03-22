export enum GRANT_TYPE {
	CLIENT_CREDENTIALS = 'client_credentials',
	AUTHORIZATION_CODE = 'authorization_code',
	SMS = '',
}

export const SCOPES: { [key: string]: { name: string; authMode: GRANT_TYPE } } =
	{
		ibanInquiry: {
			name: 'oak:iban-inquiry:get',
			authMode: GRANT_TYPE.CLIENT_CREDENTIALS,
		},
		cardBalance: {
			name: 'oak:card-balance:get',
			authMode: GRANT_TYPE.CLIENT_CREDENTIALS,
		},
		cardStatement: {
			name: 'oak:card-statement:get',
			authMode: GRANT_TYPE.CLIENT_CREDENTIALS,
		},
		depositToIban: {
			name: 'oak:deposit-to-iban:get',
			authMode: GRANT_TYPE.CLIENT_CREDENTIALS,
		},
	};
