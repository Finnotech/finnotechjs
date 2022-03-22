export interface IFinnotechIbanInquiryResponse {
    trackId: string;
    result: {
        IBAN: string;
        bankName: string;
        deposit: string;
        depositDescription: string;
        depositComment: string;
        depositOwners: {
            firstName: string;
            lastName: string;
        }[];
        depositStatus: string;
        errorDescription: string;
    };
    status: string;
}
export interface IFinnotechCardBalanceResponse {
    trackId: string;
    result: {
        balance: string;
    };
    status: string;
}
export interface IFinnotechCardStatementResponse {
    trackId: string;
    result: {
        transactions: {
            trace: number;
            pan: string;
            financialdate: string;
            Local_Date: string;
            timein: string;
            Local_Time: string;
            acqinst: number;
            acc_termid: string;
            refnum: string;
            prcode: string;
            pos_cond_code: string;
            amount: string;
            available: string;
        }[];
    };
    status: string;
}
export interface IFinnotechDepositToIbanResponse {
    trackId: string;
    result: {
        IBAN: string;
        deposit: string;
        bankName: string;
        depositDescription: string;
        depositStatus: string;
        depositOwners: {
            firstName: string;
            lastName: string;
        }[];
        depositComment: string;
    };
    status: string;
}
