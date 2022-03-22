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
    /**
     * **Internal Method** for getting service access token
     * @param scopeName scope name
     * @returns result of initiated `getAccessToken` function
     */
    getAccessToken(scopeName: string): Promise<string>;
    /**
     * For getting client-credentials token for requested scopes by their scope names. **This function will finally call `setTokens` function**. [document page](https://devbeta.finnotech.ir/boomrang-get-clientCredential-token.html?sandbox=undefined)
     * @param scopes List of scope names. Final token information will be for these scopes
     */
    getClientCredentialToken(scopes: string[]): Promise<void>;
}
export default TokenService;
