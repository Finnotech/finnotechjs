import { AxiosInstance } from 'axios';
import TokenService from '../token/token.service';
import { IFinnotechFacilityInquiryResponse } from './interface';
declare class CreditService {
    private readonly tokenService;
    private readonly httpService;
    constructor(tokenService: TokenService, httpService: AxiosInstance);
    /**
     * For backCheque inquiry service. [document page](https://devbeta.finnotech.ir/credit-back-cheques-get.html?utm_medium=npm-package)
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
}
export default CreditService;
