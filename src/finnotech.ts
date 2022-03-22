import createHttpService from './common/http';
import { GRANT_TYPE } from './constants/scopes';
import OakService from './services/oak/oak.service';
import TokenService from './services/token/token.service';

class Finnotech {
	private readonly _clientId: string;
	private readonly _clientSecret: string;
	private readonly _nid: string;
	private readonly _useSandBox: boolean;

	private readonly _getAccessToken: Function;
	private readonly _getRefreshToken: Function;
	private readonly _setTokens: Function;

	/* services */
	readonly TokenService: TokenService;
	readonly OakService: OakService;

	/**
	 * @param config basic information for api call. To get this info, go to [Finnotech Console](https://console.finnotech.ir) and then paste them here
	 */
	constructor(
		config: {
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
			getRefreshToken: (
				fullScopeName: string
			) => Promise<string> | string;
			/**
			 * A `function` that will call to **store** services `access-token` and `refresh-token`. It should get `tokenData` which contain `accessToken`, `refreshToken`, `lifeTime`, `scopes` and `tokenType`.
			 */
			setTokens: (tokenData: {
				accessToken: string;
				refreshToken: string;
				lifeTime: number;
				scopes: string[];
				tokenType: GRANT_TYPE;
			}) => Promise<void> | void;
			/**
			 * `Optional` to use sandbox (mock version) pass `true`. Otherwise you can ignore this field
			 */
			useSandBox?: boolean
		},
	) {
		this._clientId = config.clientId;
		this._clientSecret = config.clientSecret;
		this._nid = config.nid;
		this._getAccessToken = config.getAccessToken;
		this._getRefreshToken = config.getRefreshToken;
		this._setTokens = config.setTokens;
		this._useSandBox = config.useSandBox ? true : false;

		//
		const httpService = createHttpService({ useSandBox: this._useSandBox });

		this.TokenService = new TokenService(
			{
				clientId: this._clientId,
				clientSecret: this._clientSecret,
				nid: this._nid,
				getAccessTokenFunction: this._getAccessToken,
				getRefreshTokenFunction: this._getRefreshToken,
				setTokensFunction: this._setTokens,
			},
			httpService
		);
		this.OakService = new OakService(this.TokenService, httpService);
	}
}

export default Finnotech;
