import { AxiosInstance } from 'axios';
import TokenService from '../token/token.service';
import { IFinnotechCardBalanceResponse, IFinnotechIbanInquiryResponse } from './interfaces';
declare class OakService {
    private readonly tokenService;
    private readonly httpService;
    constructor(tokenService: TokenService, httpService: AxiosInstance);
    /**
     * For iban inquiry service. [document page](https://devbeta.finnotech.ir/oak-ibanInquiry.html?utm_medium=npm-package)
     * @param data required data for service call
     * @param trackId `Optional` tracking code. should be **unique** in every request
     * @returns service result
     */
    ibanInquiry(data: {
        iban: string;
    }, trackId?: string): Promise<IFinnotechIbanInquiryResponse>;
    /**
     * For card balance service. [document page](https://devbeta.finnotech.ir/oak-card-balance.html?utm_medium=npm-package)
     * @param data required data for service call
     * @param trackId `Optional` tracking code. should be **unique** in every request
     * @returns service result
     */
    cardBalance(data: {
        card: string;
    }, trackId?: string): Promise<IFinnotechCardBalanceResponse>;
}
export default OakService;
