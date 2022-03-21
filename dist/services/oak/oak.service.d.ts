import { AxiosInstance } from 'axios';
import TokenService from '../token/token.service';
import { FinnotechIbanInquiryResponse } from './interfaces';
declare class OakService {
    private readonly tokenService;
    private readonly httpService;
    constructor(tokenService: TokenService, httpService: AxiosInstance);
    /**
     * For iban inquiry service. [document page](https://devbeta.finnotech.ir/oak-ibanInquiry.html)
     * @param data required data for service call
     * @param trackId `Optional` tracking code. should be **unique** in every request
     * @returns service result
     */
    ibanInquiry(data: {
        iban: string;
    }, trackId?: string): Promise<FinnotechIbanInquiryResponse>;
}
export default OakService;
