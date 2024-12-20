import * as Yup from 'yup';

export const loginValidationSchema = Yup.object({
  username: Yup.string().required('Username is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

export const RegisterValidationSchema = Yup.object({
  username: Yup.string().required('Username is required'),
  phone_number: Yup.string().required('Phone number is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

export const forgotCredentialsValidationSchema = (isPasswordReset: boolean) => {
  return Yup.object({
    email: isPasswordReset
      ? Yup.string()
          .email('Invalid email address')
          .required('Email is required')
      : Yup.string(),
    username: !isPasswordReset
      ? Yup.string()
          .min(8, 'Username must be at least 8 characters')
          .required('Username is required')
      : Yup.string(),
  });
};
