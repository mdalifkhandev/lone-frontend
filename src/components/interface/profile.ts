export type personalInfo = {
    firstName?: string;
    lastName?: string;
    dateOfBirth?: string;
    gender?: "male" | "female" | "other";
};

export type contactInfo = {
    address?: string;
    city?: string;
    state?: string;
    zipCode?: string;
};

export type financialInfo = {
    annualIncome?: number;
    electricityBill?: number;
    existingLoan?: boolean|string;
    existingLoanAmount?: number;
    mobileMoneyBalance?: number;
    terms?: boolean;
    valueOfLandOwnership?: number;
};


export interface profileInfo {
    personalInfo?: personalInfo|null
    contactInfo?: contactInfo|null
    financialInfo?: financialInfo
    userId?: string
    _id?: string
};

export interface User {
    _id: string;
    email: string;
}

export type applyLoneFrom={
    email?:string
    userId?:string;
    profileId?:string;
    loanAmount?:number|string;
    creditScore?:number;
    city?:string;
    term?:boolean;
    status?:string
}

export type Client = {
    _id?: string;
    city: string;
    status: "pending" | "approved" | "rejected";
    creditScore: string;
    loanAmount: string;
    userId?: personalInfo ;
    profileId?: profileInfo;
};