import { AxiosError, AxiosInstance } from 'axios';
import { generateUUID } from '../../common/helper';
import { SCOPES } from '../../constants/scopes';
import TokenService from '../token/token.service';
import {
	IFinnotechFacilityInquiryResponse,
	IFinnotechBackChequeResponse,
} from './interface';

class CreditService {
	private readonly tokenService: TokenService;
	private readonly httpService: AxiosInstance;

	constructor(tokenService: TokenService, httpService: AxiosInstance) {
		this.tokenService = tokenService;
		this.httpService = httpService;
	}

	/**
	 * For facility inquiry service. [document page](https://devbeta.finnotech.ir/credit-facility-inquiry-get.html?utm_medium=npm-package)
	 * @param data required data for service call
	 * @param trackId `Optional` tracking code. should be **unique** in every request
	 * @returns service response body
	 */
	async facilityInquiry(
		data: {
			/**
			 * The user nid
			 */
			nid: string;
		},
		trackId?: string
	): Promise<IFinnotechFacilityInquiryResponse> {
		const serviceScope = SCOPES.facilityInquiry.name;
		const clientId = this.tokenService.clientId;
		const path = `/credit/v2/clients/${clientId}/users/${data.nid}/facilityInquiry`;
		const finalTrackId = trackId || generateUUID();
		await this.tokenService.getClientCredentialToken([serviceScope]);
		const ccToken = this.tokenService.getAccessToken(serviceScope);

		try {
			const finnotechResponse = await this.httpService.get(path, {
				params: { trackId: finalTrackId },
				headers: {
					Authorization: `Bearer ${ccToken}`,
					'X-Scope-Name': serviceScope,
				},
			});

			const result: IFinnotechFacilityInquiryResponse =
				finnotechResponse.data;
			return result;
		} catch (err) {
			const error = err as AxiosError;
			throw error;
		}
	}

	/**
	 * For backCheque inquiry service. [document page](https://devbeta.finnotech.ir/credit-back-cheques-get.html?utm_medium=npm-package)
	 * @param data required data for service call
	 * @param trackId `Optional` tracking code. should be **unique** in every request
	 * @returns service response body
	 */
	async backChequeInquiry(
		data: {
			/**
			 * The user nid
			 */
			nid: string;
		},
		trackId?: string
	): Promise<IFinnotechBackChequeResponse> {
		const serviceScope = SCOPES.backChequeInquiry.name;
		const clientId = this.tokenService.clientId;
		const path = `/credit/v2/clients/${clientId}/users/${data.nid}/backCheques`;
		const finalTrackId = trackId || generateUUID();
		await this.tokenService.getClientCredentialToken([serviceScope]);
		const ccToken = this.tokenService.getAccessToken(serviceScope);

		try {
			const finnotechResponse = await this.httpService.get(path, {
				params: { trackId: finalTrackId },
				headers: {
					Authorization: `Bearer ${ccToken}`,
					'X-Scope-Name': serviceScope,
				},
			});

			const result: IFinnotechBackChequeResponse = finnotechResponse.data;
			return result;
		} catch (err) {
			const error = err as AxiosError;
			throw error;
		}
	}
}

export default CreditService;
