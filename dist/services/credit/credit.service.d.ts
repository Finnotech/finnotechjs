import { AxiosInstance } from 'axios';
import TokenService from '../token/token.service';
import { IFinnotechFacilityInquiryResponse, IFinnotechBackChequeResponse } from './interface';
declare class CreditService {
    private readonly tokenService;
    private readonly httpService;
    constructor(tokenService: TokenService, httpService: AxiosInstance);
    /**
     * For facility inquiry service. [document page](https://devbeta.finnotech.ir/credit-facility-inquiry-get.html?utm_medium=npm-package)
     * @param data required data for service call
     * @param trackId `Optional` tracking code. should be **unique** in every request
     * @returns service response body
     */
    facilityInquiry(data: {
        /**
         * The user nid
         */
        nid: string;
    }, trackId?: string): Promise<IFinnotechFacilityInquiryResponse>;
    /**
     * For backCheque inquiry service. [document page](https://devbeta.finnotech.ir/credit-back-cheques-get.html?utm_medium=npm-package)
     * @param data required data for service call
     * @param trackId `Optional` tracking code. should be **unique** in every request
     * @returns service response body
     */
    backChequeInquiry(data: {
        /**
         * The user nid
         */
        nid: string;
    }, trackId?: string): Promise<IFinnotechBackChequeResponse>;
}
export default CreditService;
