export interface Account {
  valid: boolean;
  message: string;
  email: string;
  verificationCode: string;
}

export type AccountLoginDTO = {
  email: string;
  password: string;
};

export type AccountRegisterDTO = AccountLoginDTO;
