export enum GRANT_TYPE {
	CLIENT_CREDENTIALS = 'client_credentials',
	AUTHORIZATION_CODE = 'authorization_code',
	SMS = 'SMS',
}

export const SCOPES = {
	ibanInquiry: {
		name: 'oak:iban-inquiry:get',
		authMode: GRANT_TYPE.CLIENT_CREDENTIALS,
	},
	groupIbanInquiryPost: {
		name: 'oak:group-iban-inquiry:post',
		authMode: GRANT_TYPE.CLIENT_CREDENTIALS,
	},
	groupIbanInquiryGet: {
		name: 'oak:group-iban-inquiry:get',
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
	cifInquiry: {
		name: 'oak:cif-inquiry:get',
		authMode: GRANT_TYPE.CLIENT_CREDENTIALS,
	},
	shahabInquiry: {
		name: 'oak:shahab-inquiry:get',
		authMode: GRANT_TYPE.CLIENT_CREDENTIALS,
	}
};
