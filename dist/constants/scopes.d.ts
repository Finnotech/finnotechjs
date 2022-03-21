export declare enum GRANT_TYPE {
    CLIENT_CREDENTIALS = "client_credentials",
    AUTHORIZATION_CODE = "authorization_code",
    SMS = ""
}
export declare const SCOPES: {
    [key: string]: {
        name: string;
        authMode: GRANT_TYPE;
    };
};
