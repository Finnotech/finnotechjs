import { AxiosInstance } from 'axios';
declare class TokenService {
    private readonly _clientSecret;
    private readonly _nid;
    readonly clientId: string;
    private readonly _getAccessToken;
    private readonly _getRefreshToken;
    private readonly _setTokens;
    private readonly _httpService;
    constructor(data: {
        clientId: string;
        clientSecret: string;
        nid: string;
        getAccessTokenFunction: Function;
        getRefreshTokenFunction: Function;
        setTokensFunction: Function;
    }, httpService: AxiosInstance);
    getAccessToken(scopeName: string): Promise<string>;
    getClientCredentialToken(scopes: string[]): Promise<any>;
}
export default TokenService;
