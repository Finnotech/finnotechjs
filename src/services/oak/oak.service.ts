import { AxiosError, AxiosInstance } from 'axios';

import { SCOPES } from '../../constants/scopes';
import FinnotechError from '../../common/error';
import TokenService from '../token/token.service';
import { generateUUID } from '../../common/helper';
import { FinnotechIbanInquiryResponse } from './interfaces';

class OakService {
	private readonly tokenService: TokenService;
	private readonly httpService: AxiosInstance;

	constructor(tokenService: TokenService, httpService: AxiosInstance) {
		this.tokenService = tokenService;
		this.httpService = httpService;
	}

	/**
	 * For iban inquiry service. [document page](https://devbeta.finnotech.ir/oak-ibanInquiry.html)
	 * @param data required data for service call
	 * @param trackId `Optional` tracking code. should be **unique** in every request
	 * @returns service result
	 */
	async ibanInquiry(data: { iban: string }, trackId?: string) {
		const serviceScope = SCOPES.ibanInquiry.name;
		const clientId = this.tokenService.clientId;
		const path = `/oak/v2/clients/${clientId}/ibanInquiry`;
		const finalTrackId = trackId || generateUUID();
		const accessToken = await this.tokenService.getAccessToken(
			serviceScope
		);

		try {
			const finnotechResponse = await this.httpService.get(path, {
				params: { iban: data.iban, trackId: finalTrackId },
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			});

			const result: FinnotechIbanInquiryResponse = finnotechResponse.data;
			return result;
		} catch (err) {
			const error = err as AxiosError;
			throw error;
		}
	}
}

export default OakService;
