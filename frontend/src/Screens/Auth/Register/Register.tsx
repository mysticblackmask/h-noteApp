import React, { Suspense, useState } from 'react';
import { useFormik } from 'formik';
import { Card, Col, Row, Spin, Typography } from 'antd';
import { Images } from '../../../Utils/Constants';
import { toastMessage } from '../../../Utils/HelperFunctions';
import { RegisterValidationSchema } from '../../../Utils/Validators';
import theme from '../../../Theme/theme';
import AppButton from '../../../Components/Button/AppButton';
import InputField from '../../../Components/InputField/InputField';
import { signupUser } from '../../../Redux/Auth/authAction';
import { useAppDispatch } from '../../../Hooks/reduxHooks';
import { useNavigate } from 'react-router-dom';

const Register: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
      phone_number: '',
    },
    validationSchema: RegisterValidationSchema,
    onSubmit: async (values) => {
      setIsLoading(true);
      try {
        await dispatch(
          signupUser({
            username: values.username,
            email: values.email,
            password: values.password,
            phone_number: values.phone_number,
          })
        ).unwrap();

        toastMessage({
          type: 'success',
          content: 'Signup successful! Please log in.',
          duration: 3,
        });
        navigate('/login');
      } catch (error: any) {
        toastMessage({
          type: 'error',
          content: error.message || 'Signup failed. Please try again.',
          duration: 5,
        });
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <>
      <Suspense
        fallback={
          <div className='spinnerContainer'>
            <Spin size='large' />
          </div>
        }
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `url(${Images.bckImg})`,
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            filter: 'blur(8px)',
            zIndex: -1,
          }}
        ></div>
        <div
          style={{
            position: 'relative',
            zIndex: 0,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Row gutter={[16, 16]}>
            <Col
              span={14}
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'relative',
                zIndex: 1,
              }}
            >
              <img
                src={Images.logoNew}
                alt='logo'
                style={{
                  width: 350,
                  height: 350,
                  objectFit: 'contain',
                  marginTop: '5rem',
                }}
              />
            </Col>

            <Col
              span={8}
              style={{
                zIndex: 2,
              }}
            >
              <Card
                style={{
                  width: '100%',
                  padding: 10,
                  borderRadius: 8,
                  borderWidth: 3,
                  backgroundColor: 'transparent',
                  border: '1px solid white',
                  borderColor: theme.token.colorPrimary,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: '7rem',
                }}
              >
                <Typography.Title
                  level={1}
                  style={{
                    fontWeight: 'bold',
                    color: theme.token.headingColor,
                    paddingBottom: '1rem',
                    textAlign: 'center',
                  }}
                >
                  Sign Up
                </Typography.Title>
                <form onSubmit={formik.handleSubmit}>
                  <Row gutter={16}>
                    <Col span={24}>
                      <InputField
                        style={{ color: theme.token.headingColor }}
                        placeholder='User Name'
                        value={formik.values.username}
                        onChangeText={formik.handleChange('username')}
                        error={
                          formik.touched.username && formik.errors.username
                            ? {
                                isError: true,
                                message: formik.errors.username as string,
                              }
                            : undefined
                        }
                        size='large'
                      />
                    </Col>

                    <Col span={24}>
                      <InputField
                        placeholder='Email'
                        value={formik.values.email}
                        onChangeText={formik.handleChange('email')}
                        error={
                          formik.touched.email && formik.errors.email
                            ? {
                                isError: true,
                                message: formik.errors.email as string,
                              }
                            : undefined
                        }
                        size='large'
                      />
                    </Col>
                    <Col span={24}>
                      <InputField
                        placeholder='Password'
                        value={formik.values.password}
                        onChangeText={formik.handleChange('password')}
                        error={
                          formik.touched.password && formik.errors.password
                            ? {
                                isError: true,
                                message: formik.errors.password as string,
                              }
                            : undefined
                        }
                        inputType='password'
                        size='large'
                      />
                    </Col>
                    <Col span={24}>
                      <InputField
                        placeholder='Phone Number'
                        value={formik.values.phone_number}
                        onChangeText={formik.handleChange('phone_number')}
                        error={
                          formik.touched.phone_number &&
                          formik.errors.phone_number
                            ? {
                                isError: true,
                                message: formik.errors.phone_number as string,
                              }
                            : undefined
                        }
                        size='large'
                      />
                    </Col>
                    <Col span={24}>
                      <AppButton
                        type='primary'
                        htmlType='submit'
                        block
                        size='large'
                        bgColor={theme.token.buttonBg}
                        onClick={formik.handleSubmit}
                        loading={isLoading}
                      >
                        Sign Up
                      </AppButton>
                    </Col>
                  </Row>
                </form>
              </Card>
            </Col>
          </Row>
        </div>
      </Suspense>
    </>
  );
};

export default Register;
