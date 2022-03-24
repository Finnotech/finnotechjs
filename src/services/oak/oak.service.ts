import { AxiosError, AxiosInstance } from 'axios';
import FormData from 'form-data';

import { SCOPES } from '../../constants/scopes';
import FinnotechError from '../../common/error';
import TokenService from '../token/token.service';
import { generateUUID } from '../../common/helper';
import {
	IFinnotechCardBalanceResponse,
	IFinnotechCardStatementResponse,
	IFinnotechCifInquiryResponse,
	IFinnotechDepositToIbanResponse,
	IFinnotechIbanInquiryResponse,
	IFinnotechShahabInquiryResponse,
	IFinnotechSubmitGroupIbanInquiryResponse,
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
	 * For submitting new group iban inquiry service request. [document page](https://devbeta.finnotech.ir/oak-groupIbanInquiry.html?utm_medium=npm-package)
	 * @param data required data for service call
	 * @param trackId `Optional` tracking code. should be **unique** in every request
	 * @returns service response body
	 */
	async submitGroupIbanInquiry(
		data: {
			/**
			 * `csv` file of **ibans**. It should be `base64` encoded `string` or `Buffer`
			 */
			file: string | Buffer;
		},
		trackId?: string
	): Promise<IFinnotechSubmitGroupIbanInquiryResponse> {
		const serviceScope = SCOPES.groupIbanInquiryPost.name;
		const clientId = this.tokenService.clientId;
		const path = `/oak/v2/clients/${clientId}/groupIbanInquiry`;
		const finalTrackId = trackId || generateUUID();
		const accessToken = await this.tokenService.getAccessToken(
			serviceScope
		);

		try {
			let finalFile: Buffer;
			if (data.file instanceof Buffer) {
				finalFile = data.file;
			} else {
				finalFile = Buffer.from(data.file, 'base64');
			}

			const dataForm = new FormData();
			dataForm.append('ibansFile', finalFile, 'ibans.csv');

			const finnotechResponse = await this.httpService.post(
				path,
				dataForm,
				{
					params: {
						trackId: finalTrackId,
					},
					headers: {
						...dataForm.getHeaders(),
						Authorization: `Bearer ${accessToken}`,
					},
				}
			);

			const result: IFinnotechSubmitGroupIbanInquiryResponse =
				finnotechResponse.data;
			return result;
		} catch (err) {
			const error = err as AxiosError;
			throw error;
		}
	}

	/**
	 * For retrying group iban inquiry service request. [document page](https://devbeta.finnotech.ir/oak-groupIbanInquiry.html?utm_medium=npm-package)
	 * @param data required data for service call
	 * @param trackId `Optional` tracking code. should be **unique** in every request
	 * @returns service response body
	 */
	async retryGroupIbanInquiry(
		data: {
			/**
			 * The **trackId** which used in **submitting** group iban inquiry request
			 */
			inquiryTrackId: string;
		},
		trackId?: string
	): Promise<IFinnotechSubmitGroupIbanInquiryResponse> {
		const serviceScope = SCOPES.groupIbanInquiryPost.name;
		const clientId = this.tokenService.clientId;
		const path = `/oak/v2/clients/${clientId}/groupIbanInquiry`;
		const finalTrackId = trackId || generateUUID();
		const accessToken = await this.tokenService.getAccessToken(
			serviceScope
		);

		try {
			const dataForm = new FormData();
			dataForm.append('retry', 'true'); //
			dataForm.append('inquiryTrackId', data.inquiryTrackId);

			const finnotechResponse = await this.httpService.post(
				path,
				dataForm,
				{
					params: {
						trackId: finalTrackId,
					},
					headers: {
						...dataForm.getHeaders(),
						Authorization: `Bearer ${accessToken}`,
					},
				}
			);

			const result: IFinnotechSubmitGroupIbanInquiryResponse =
				finnotechResponse.data;
			return result;
		} catch (err) {
			const error = err as AxiosError;
			throw error;
		}
	}

	/**
	 * For getting result of group iban inquiry service request. [document page](https://devbeta.finnotech.ir/oak-groupIbanInquiry.html?utm_medium=npm-package)
	 * @param data required data for service call
	 * @param trackId `Optional` tracking code. should be **unique** in every request
	 * @returns csv content - `string`
	 */
	async getResultOfGroupIbanInquiry(
		data: {
			/**
			 * The **trackId** which used in **submitting** group iban inquiry request
			 */
			inquiryTrackId: string;
		},
		trackId?: string
	): Promise<string> {
		const serviceScope = SCOPES.groupIbanInquiryGet.name;
		const clientId = this.tokenService.clientId;
		const path = `/oak/v2/clients/${clientId}/groupIbanInquiry`;
		const finalTrackId = trackId || generateUUID();
		const accessToken = await this.tokenService.getAccessToken(
			serviceScope
		);

		try {
			const finnotechResponse = await this.httpService.get(path, {
				params: {
					inquiryTrackId: data.inquiryTrackId,
					trackId: finalTrackId,
				},
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			});

			const result: string = finnotechResponse.data;
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

	/**
	 * For deposit to iban service. [document page](https://devbeta.finnotech.ir/oak-deposits-to-IBAN-get.html?utm_medium=npm-package)
	 * @param data required data for service call
	 * @param trackId `Optional` tracking code. should be **unique** in every request
	 * @returns service response body
	 */
	async depositToIban(
		data: {
			deposit: string;
			/**
			 * bank code from documentation
			 * - eghtesade novin: `0`
			 * - saman: `1`
			 * - sarmaye: `2`
			 * - tosee: `3`
			 * - sina: `4`
			 * - tejarat: `6`
			 * - sanat va tejarat: `7`
			 * - keshavarzi: `8`
			 * - tosee saderat: `9`
			 * - karafarin: `10`
			 * - ayande: `11`
			 * - saderat: `12`
			 * - melli: `13`
			 * - resaalat: `14`
			 * - ansar: `15`
			 * - iran zamin: `16`
			 */
			bank: string;
		},
		trackId?: string
	): Promise<IFinnotechDepositToIbanResponse> {
		const serviceScope = SCOPES.depositToIban.name;
		const clientId = this.tokenService.clientId;
		const path = `/oak/v2/clients/${clientId}/iban`;
		const finalTrackId = trackId || generateUUID();
		const accessToken = await this.tokenService.getAccessToken(
			serviceScope
		);

		try {
			const finnotechResponse = await this.httpService.get(path, {
				params: {
					bank: data.bank,
					deposit: data.deposit,
					trackId: finalTrackId,
				},
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			});

			const result: IFinnotechDepositToIbanResponse =
				finnotechResponse.data;
			return result;
		} catch (err) {
			const error = err as AxiosError;
			throw error;
		}
	}

	/**
	 * For cif inquiry service. [document page](https://devbeta.finnotech.ir/oak-cifInquiry.html?utm_medium=npm-package)
	 * @param data required data for service call
	 * @param trackId `Optional` tracking code. should be **unique** in every request
	 * @returns service response body
	 */
	async cifInquiry(
		data: { nid: string },
		trackId?: string
	): Promise<IFinnotechCifInquiryResponse> {
		const serviceScope = SCOPES.cifInquiry.name;
		const clientId = this.tokenService.clientId;
		const path = `/oak/v2/clients/${clientId}/users/${data.nid}/cifInquiry`;
		const finalTrackId = trackId || generateUUID();
		const accessToken = await this.tokenService.getAccessToken(
			serviceScope
		);

		try {
			const finnotechResponse = await this.httpService.get(path, {
				params: {
					trackId: finalTrackId,
				},
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			});

			const result: IFinnotechCifInquiryResponse = finnotechResponse.data;
			return result;
		} catch (err) {
			const error = err as AxiosError;
			throw error;
		}
	}

	/**
	 * For shahab inquiry service. [document page](https://devbeta.finnotech.ir/oak-shahabInquiry.html?utm_medium=npm-package)
	 * @param data required data for service call
	 * @param trackId `Optional` tracking code. should be **unique** in every request
	 * @returns service response body
	 */
	async shahabInquiry(
		data: {
			nid: string;
			/**
			 * It should be in `YYYYMMDD` jalaali format
			 */
			birthDate: string;
			/**
			 * **required** only if the person **birth date was _before_ 1368**
			 */
			identityNumber?: string;
		},
		trackId?: string
	): Promise<IFinnotechShahabInquiryResponse> {
		const serviceScope = SCOPES.shahabInquiry.name;
		const clientId = this.tokenService.clientId;
		const path = `/oak/v2/clients/${clientId}/users/${data.nid}/shahabInquiry`;
		const finalTrackId = trackId || generateUUID();
		const accessToken = await this.tokenService.getAccessToken(
			serviceScope
		);

		try {
			const finnotechResponse = await this.httpService.get(path, {
				params: {
					birthDate: data.birthDate,
					identityNo: data.identityNumber || '',
					trackId: finalTrackId,
				},
				headers: {
					Authorization: `Bearer ${accessToken}`
				}
			});

			const result: IFinnotechShahabInquiryResponse = finnotechResponse.data;
			return result;
		} catch (err) {
			const error = err as AxiosError;
			throw error;
		}
	}
}

export default OakService;
