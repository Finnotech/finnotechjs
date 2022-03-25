import axios from 'axios';

import TokenService from '../services/token/token.service';

const BASE_URL = 'https://apibeta.finnotech.ir';
const SAND_BOX_BASE_URL = 'https://sandboxapi.finnotech.ir';

export default (
	options: { useSandBox: boolean },
	tokenServiceInitialData: {
		clientId: string;
		clientSecret: string;
		nid: string;
		getAccessTokenFunction: Function;
		getRefreshTokenFunction: Function;
		setTokensFunction: Function;
	}
) => {
	const customAxios = axios.create({
		baseURL: options.useSandBox ? SAND_BOX_BASE_URL : BASE_URL,
	});

	const internalTokenService = new TokenService(
		tokenServiceInitialData,
		customAxios
	);

	return customAxios;
};
