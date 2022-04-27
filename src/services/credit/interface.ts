export interface IFinnotechFacilityInquiryResponse {
	result: {
		nid: string;
		name: string;
		facilityTotalAmount: string;
		facilityDebtTotalAmount: string;
		facilityPastExpiredTotalAmount: string;
		facilityDeferredTotalAmount: string;
		facilitySuspiciousTotalAmount: string;
		dishonored: string;
		facilityList: {
			bankCode: string;
			branchCode: number;
			branchDescription: string;
			pastExpiredAmount: string;
			deferredAmount: string;
			suspiciousAmount: string;
			debtorTotalAmount: string;
			type: string;
			amountOrginal: string;
			benefitAmount: string;
			FacilityBankCode: string;
			FacilityBranchCode: string;
			FacilityBranch: string;
			FacilityRequestNo: string;
			FacilityRequestType: string;
			FacilityCurrencyCode: string;
			FacilityPastExpiredAmount: string;
			FacilityDeferredAmount: string;
			FacilitySuspiciousAmount: string;
			FacilityDebtorTotalAmount: string;
			FacilityType: string;
			FacilityStatus: string;
			FacilityAmountOrginal: string;
			FacilityBenefitAmount: string;
			FacilitySetDate: string;
			FacilityEndDate: string;
			FacilityAmountObligation: string;
			FacilityGroup: string;
			FacilityMoratoriumDate: string;
		}[];
	};
	status: string;
	trackId: string;
}

export interface IFinnotechBackChequeResponse {
	result: {
		chequeList: {
			accountNumber: string;
			amount: string;
			backDate: string;
			bankCode: string;
			branchCode: string;
			branchDescription: string;
			date: string;
			id: string;
			number: string;
		}[];
		nid: string;
		name: string;
	};
	status: string;
	trackId: string;
}
