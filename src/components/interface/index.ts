export interface FormData {
    email: string;
    phone: string;
    password: string;
    confirmPassword: string;
    agreedToTerms: boolean;

}

export interface LoginData {
    email: string;
    password: string;
    remember?: boolean;
}


export interface EmailData {
    email: string;
}

export interface OtpData {
    email: string;
    otp: string;
}

export interface ResetPasswordData {
    email: string;
    newPassword: string;
    confirmPassword: string;
}
export type UpdathPassword = {
    email: string;
    currentPassword: string;
    newPassword: string;
    confirmNewPassword: string;
}