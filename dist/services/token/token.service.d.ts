import { AxiosInstance } from 'axios';
import { GRANT_TYPE } from '../../constants/scopes';
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
     * **Internal Method** for getting service refresh token
     * @param scopeName scope name
     * @returns result of initiated `getRefreshToken` function
     */
    getRefreshToken(scopeName: string): Promise<string>;
    /**
     * **Internal Method** for set service token
     * @param tokenData setTokens props
     */
    setTokens(tokenData: {
        accessToken: string;
        refreshToken: string;
        lifeTime: number;
        scopes: string[];
        tokenType: GRANT_TYPE;
    }): Promise<void>;
    /**
     * For refresh client-credentials token for requested scope by their scope name.
     * _This function automatically call in case of `invalid token`_.
     * **This function will finally call `setTokens` function**. [document page](https://devbeta.finnotech.ir/boomrang-get-clientCredential-token.html?utm_medium=npm-package)
     * @param scopeName List of scope names. Final token information will be for these scopes
     */
    getClientCredentialsRefreshToken(scopeName: string): Promise<void>;
    /**
     * For getting client-credentials token for requested scopes by their scope names.
     * **This function will finally call `setTokens` function**. [document page](https://devbeta.finnotech.ir/boomrang-get-clientCredential-token.html?utm_medium=npm-package)
     * @param scopes List of scope names. Final token information will be for these scopes
     */
    getClientCredentialToken(scopes: string[]): Promise<void>;
}
export default TokenService;
