/// <reference types="node" />
import { AxiosInstance } from 'axios';
import TokenService from '../token/token.service';
import { IFinnotechCardBalanceResponse, IFinnotechCardStatementResponse, IFinnotechCifInquiryResponse, IFinnotechDepositToIbanResponse, IFinnotechIbanInquiryResponse, IFinnotechShahabInquiryResponse, IFinnotechSubmitGroupIbanInquiryResponse } from './interfaces';
declare class OakService {
    private readonly tokenService;
    private readonly httpService;
    constructor(tokenService: TokenService, httpService: AxiosInstance);
    /**
     * For iban inquiry service. [document page](https://devbeta.finnotech.ir/oak-ibanInquiry.html?utm_medium=npm-package)
     * @param data required data for service call
     * @param trackId `Optional` tracking code. should be **unique** in every request
     * @returns service response body
     */
    ibanInquiry(data: {
        iban: string;
    }, trackId?: string): Promise<IFinnotechIbanInquiryResponse>;
    /**
     * For submitting new group iban inquiry service request. [document page](https://devbeta.finnotech.ir/oak-groupIbanInquiry.html?utm_medium=npm-package)
     * @param data required data for service call
     * @param trackId `Optional` tracking code. should be **unique** in every request
     * @returns service response body
     */
    submitGroupIbanInquiry(data: {
        /**
         * `csv` file of **ibans**. It should be `base64` encoded `string` or `Buffer`
         */
        file: string | Buffer;
    }, trackId?: string): Promise<IFinnotechSubmitGroupIbanInquiryResponse>;
    /**
     * For retrying group iban inquiry service request. [document page](https://devbeta.finnotech.ir/oak-groupIbanInquiry.html?utm_medium=npm-package)
     * @param data required data for service call
     * @param trackId `Optional` tracking code. should be **unique** in every request
     * @returns service response body
     */
    retryGroupIbanInquiry(data: {
        /**
         * The **trackId** which used in **submitting** group iban inquiry request
         */
        inquiryTrackId: string;
    }, trackId?: string): Promise<IFinnotechSubmitGroupIbanInquiryResponse>;
    /**
     * For getting result of group iban inquiry service request. [document page](https://devbeta.finnotech.ir/oak-groupIbanInquiry.html?utm_medium=npm-package)
     * @param data required data for service call
     * @param trackId `Optional` tracking code. should be **unique** in every request
     * @returns csv content - `string`
     */
    getResultOfGroupIbanInquiry(data: {
        /**
         * The **trackId** which used in **submitting** group iban inquiry request
         */
        inquiryTrackId: string;
    }, trackId?: string): Promise<string>;
    /**
     * For card balance service. [document page](https://devbeta.finnotech.ir/oak-card-balance.html?utm_medium=npm-package)
     * @param data required data for service call
     * @param trackId `Optional` tracking code. should be **unique** in every request
     * @returns service response body
     */
    cardBalance(data: {
        card: string;
    }, trackId?: string): Promise<IFinnotechCardBalanceResponse>;
    /**
     * For card statement service. [document page](https://devbeta.finnotech.ir/oak-card-statement.html?utm_medium=npm-package)
     * @param data required data for service call
     * @param trackId `Optional` tracking code. should be **unique** in every request
     * @returns service response body
     */
    cardStatement(data: {
        card: string;
        /**
         * Should be in `YYMMDD` jalaali format
         */
        fromDate?: string;
        /**
         * Should be in `YYMMDD` jalaali format
         */
        toDate?: string;
    }, trackId?: string): Promise<IFinnotechCardStatementResponse>;
    /**
     * For deposit to iban service. [document page](https://devbeta.finnotech.ir/oak-deposits-to-IBAN-get.html?utm_medium=npm-package)
     * @param data required data for service call
     * @param trackId `Optional` tracking code. should be **unique** in every request
     * @returns service response body
     */
    depositToIban(data: {
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
    }, trackId?: string): Promise<IFinnotechDepositToIbanResponse>;
    /**
     * For cif inquiry service. [document page](https://devbeta.finnotech.ir/oak-cifInquiry.html?utm_medium=npm-package)
     * @param data required data for service call
     * @param trackId `Optional` tracking code. should be **unique** in every request
     * @returns service response body
     */
    cifInquiry(data: {
        nid: string;
    }, trackId?: string): Promise<IFinnotechCifInquiryResponse>;
    /**
     * For shahab inquiry service. [document page](https://devbeta.finnotech.ir/oak-shahabInquiry.html?utm_medium=npm-package)
     * @param data required data for service call
     * @param trackId `Optional` tracking code. should be **unique** in every request
     * @returns service response body
     */
    shahabInquiry(data: {
        nid: string;
        /**
         * It should be in `YYYYMMDD` jalaali format
         */
        birthDate: string;
        /**
         * **required** only if the person **birth date was _before_ 1368**
         */
        identityNumber?: string;
    }, trackId?: string): Promise<IFinnotechShahabInquiryResponse>;
}
export default OakService;
