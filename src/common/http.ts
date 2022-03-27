import axios, { AxiosError } from 'axios';

import TokenService from '../services/token/token.service';
import { generateUUID } from './helper';

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

	// refresh token process
	customAxios.interceptors.response.use(
		(response) => response,
		async (err: AxiosError) => {
			if (
				err.response?.data?.error?.code !== 'VALIDATION_ERROR' ||
				err.response?.data?.error?.message !== 'invalid token'
			) {
				return err;
			}
			const headers = err.config.headers;
			// @ts-ignore
			const scopeName = headers['X-Scope-Name'] as string;
			if (!scopeName) {
				return err;
			}
			try {
				await internalTokenService.getClientCredentialsRefreshToken(
					scopeName
				);
				const newToken = await internalTokenService.getAccessToken(
					scopeName
				);
				const newConfig = {
					...err.config,
					headers: {
						...err.config.headers,
						Authorization: `Bearer ${newToken}`,
					},
					params: {
						...err.config.params,
						trackId: 'R-' + generateUUID()
					}
				};				
				return axios(newConfig);
			} catch (error) {
				return Promise.reject(err);
			}
		}
	);

	return customAxios;
};
