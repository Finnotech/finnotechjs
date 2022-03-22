import { AxiosError, AxiosInstance } from 'axios';

import { SCOPES } from '../../constants/scopes';
import FinnotechError from '../../common/error';
import TokenService from '../token/token.service';
import { generateUUID } from '../../common/helper';
import {
	IFinnotechCardBalanceResponse,
	IFinnotechCardStatementResponse,
	IFinnotechIbanInquiryResponse,
} from './interfaces';

class OakService {
	private readonly tokenService: TokenService;
	private readonly httpService: AxiosInstance;

	constructor(tokenService: TokenService, httpService: AxiosInstance) {
		this.tokenService = tokenService;
		this.httpService = httpService;
	}

	/**
	 * For iban inquiry service. [document page](https://devbeta.finnotech.ir/oak-ibanInquiry.html?utm_medium=npm-package)
	 * @param data required data for service call
	 * @param trackId `Optional` tracking code. should be **unique** in every request
	 * @returns service response body
	 */
	async ibanInquiry(
		data: { iban: string },
		trackId?: string
	): Promise<IFinnotechIbanInquiryResponse> {
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

			const result: IFinnotechIbanInquiryResponse =
				finnotechResponse.data;
			return result;
		} catch (err) {
			const error = err as AxiosError;
			throw error;
		}
	}

	/**
	 * For card balance service. [document page](https://devbeta.finnotech.ir/oak-card-balance.html?utm_medium=npm-package)
	 * @param data required data for service call
	 * @param trackId `Optional` tracking code. should be **unique** in every request
	 * @returns service response body
	 */
	async cardBalance(
		data: { card: string },
		trackId?: string
	): Promise<IFinnotechCardBalanceResponse> {
		const serviceScope = SCOPES.cardBalance.name;
		const clientId = this.tokenService.clientId;
		const path = `/oak/v2/clients/${clientId}/card/balance`;
		const finalTrackId = trackId || generateUUID();
		const accessToken = await this.tokenService.getAccessToken(
			serviceScope
		);

		try {
			const finnotechResponse = await this.httpService.post(
				path,
				{ card: data.card },
				{
					params: { trackId: finalTrackId },
					headers: {
						Authorization: `Bearer ${accessToken}`,
					},
				}
			);

			const result: IFinnotechCardBalanceResponse =
				finnotechResponse.data;
			return result;
		} catch (err) {
			const error = err as AxiosError;
			throw error;
		}
	}

	/**
	 * For card statement service. [document page](https://devbeta.finnotech.ir/oak-card-statement.html?utm_medium=npm-package)
	 * @param data required data for service call
	 * @param trackId `Optional` tracking code. should be **unique** in every request
	 * @returns service response body
	 */
	async cardStatement(
		data: {
			card: string;
			/**
			 * Should be in `YYMMDD` jalaali format
			 */
			fromDate?: string;
			/**
			 * Should be in `YYMMDD` jalaali format
			 */
			toDate?: string;
		},
		trackId?: string
	): Promise<IFinnotechCardStatementResponse> {
		const serviceScope = SCOPES.cardStatement.name;
		const clientId = this.tokenService.clientId;
		const path = `/oak/v2/clients/${clientId}/card/statement`;
		const finalTrackId = trackId || generateUUID();
		const accessToken = await this.tokenService.getAccessToken(
			serviceScope
		);

		try {
			const finnotechResponse = await this.httpService.post(
				path,
				{
					card: data.card,
					fromDate: data.fromDate || '',
					toDate: data.toDate || '',
				},
				{
					params: { trackId: finalTrackId },
					headers: {
						Authorization: `Bearer ${accessToken}`,
					},
				}
			);

			const result: IFinnotechCardStatementResponse =
				finnotechResponse.data;
			return result;
		} catch (err) {
			const error = err as AxiosError;
			throw error;
		}
	}
}

export default OakService;
