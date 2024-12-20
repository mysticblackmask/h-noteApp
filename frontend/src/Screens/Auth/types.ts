export interface LoginFormProps {
  email: string;
  password: string;
  token?: string;
}
export interface RegisterFormProps {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  token?: string;
}

export enum TOAST_MESSAGE_TYPES {
  SUCCESS = 'success',
  ERROR = 'error',
}
