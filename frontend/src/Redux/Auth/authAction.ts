import { createAsyncThunk } from '@reduxjs/toolkit';
import { ApiErrors, LoginCredentials, SignUpCredentials, User } from './types';
import { toastMessage } from '../../Utils/HelperFunctions';
import { BASE_URL, ENDPOINTS } from '../../Utils/Constants';

export const loginUser = createAsyncThunk<
  User,
  LoginCredentials,
  { rejectValue: ApiErrors }
>('auth/login', async (credentials, { rejectWithValue }) => {
  try {
    const response = await fetch(`${BASE_URL}${ENDPOINTS.LOGIN}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      return rejectWithValue({
        message: errorMessage,
      });
    }

    if (response.status != 200) {
      toastMessage({
        type: 'error',
        content: 'Login failed. Email or password not correct',
        duration: 5,
      });
      return rejectWithValue({
        message: 'Login failed. Email or password not correct',
      });
    }
    console.log('ok');
    const apiResponse = await response.json();
    console.log(apiResponse);
    await localStorage.setItem('token', JSON.stringify(apiResponse.access));
    await localStorage.setItem('user', JSON.stringify(apiResponse));

    toastMessage({
      type: 'success',
      content: 'Login successful!',
      duration: 3,
    });
    return apiResponse.data;
  } catch (error) {
    return rejectWithValue({
      message: 'An error occurred during login',
    });
  }
});

// Sign Up.....

export const signupUser = createAsyncThunk<
  User,
  SignUpCredentials,
  { rejectValue: ApiErrors }
>('auth/signup', async (credentials, { rejectWithValue }) => {
  try {
    const response = await fetch(`${BASE_URL}${ENDPOINTS.SIGNUP}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });
    console.log(response);
    if (!response.ok) {
      const errorMessage = await response.text();
      return rejectWithValue({
        message: errorMessage,
      });
    }

    if (response.status != 201) {
      toastMessage({
        type: 'error',
        content: 'Signup failed. Please check your details.',
        duration: 5,
      });
      return rejectWithValue({
        message: 'Signup failed. Please check your details.',
      });
    }
    const apiResponse = await response.json();

    toastMessage({
      type: 'success',
      content: 'Signup successful! Please log in.',
      duration: 3,
    });

    return apiResponse.data;
  } catch (error) {
    return rejectWithValue({
      message: 'An error occurred during signup',
    });
  }
});
