export declare enum GRANT_TYPE {
    CLIENT_CREDENTIALS = "client_credentials",
    AUTHORIZATION_CODE = "authorization_code",
    SMS = "SMS"
}
export declare const SCOPES: {
    ibanInquiry: {
        name: string;
        authMode: GRANT_TYPE;
    };
    groupIbanInquiryPost: {
        name: string;
        authMode: GRANT_TYPE;
    };
    groupIbanInquiryGet: {
        name: string;
        authMode: GRANT_TYPE;
    };
    cardBalance: {
        name: string;
        authMode: GRANT_TYPE;
    };
    cardStatement: {
        name: string;
        authMode: GRANT_TYPE;
    };
    depositToIban: {
        name: string;
        authMode: GRANT_TYPE;
    };
    cifInquiry: {
        name: string;
        authMode: GRANT_TYPE;
    };
    shahabInquiry: {
        name: string;
        authMode: GRANT_TYPE;
    };
    facilityInquiry: {
        name: string;
        authMode: GRANT_TYPE;
    };
};
