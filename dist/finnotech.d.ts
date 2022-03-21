import OakService from './services/oak/oak.service';
import TokenService from './services/token/token.service';
declare class Finnotech {
    private readonly _clientId;
    private readonly _clientSecret;
    private readonly _nid;
    private readonly _useSandBox;
    private readonly _getAccessToken;
    private readonly _getRefreshToken;
    private readonly _setTokens;
    readonly TokenService: TokenService;
    readonly OakService: OakService;
    /**
     * @param config basic information for api call. To get this info, go to [Finnotech Console](https://console.finnotech.ir) and then paste them here
     */
    constructor(config: {
        /**
         * app name
         */
        clientId: string;
        /**
         * client secret
         */
        clientSecret: string;
        /**
         * national identity
         */
        nid: string;
        /**
         * A `function` which receive `service scope name` as props and expect to **return** `access-token`. It can be `synchronous` or `asynchronous`
         */
        getAccessToken: (fullScopeName: string) => Promise<string> | string;
        /**
         * A `function` which receive `service scope name` as props and expect to **return** `refresh-token`. It can be `synchronous` or `asynchronous`
         */
        getRefreshToken: (fullScopeName: string) => Promise<string> | string;
        /**
         * A `function` that will call to **store** services `access-token` and `refresh-token`. It should get `tokenData` which contain `accessToken`, `refreshToken`, `lifeTime`, `scopes` and `tokenType`.
         */
        setTokens: (tokenData: {
            accessToken: string;
            refreshToken: string;
            lifeTime: number;
            scopes: string[];
            tokenType: string;
        }) => Promise<void> | void;
        /**
         * `Optional` to use sandbox (mock version) pass `true`. Otherwise you can ignore this field
         */
        useSandBox?: boolean;
    });
}
export default Finnotech;
