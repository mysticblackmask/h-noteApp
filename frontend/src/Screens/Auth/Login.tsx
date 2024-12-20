import React, { Suspense } from 'react';
import { theme } from '../../Theme/theme';
import { useFormik } from 'formik';
import InputField from '../../Components/InputField/InputField';
import { loginValidationSchema } from '../../Utils/Validators';
import AppButton from '../../Components/Button/AppButton';
import { Card, Col, Row, Spin, Typography } from 'antd';
import { Images } from '../../Utils/Constants';
import { loginUser } from '../../Redux/Auth/authAction';
import { useAppDispatch } from '../../Hooks/reduxHooks';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: loginValidationSchema,
    onSubmit: (values) => {
      dispatch(
        loginUser({
          username: values.username,
          password: values.password,
        })
      ).then(() => {
        navigate('/');
      });
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
                marginTop: '10rem',
              }}
            />
          </Col>

          <Col
            span={8}
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
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
                marginTop: '8rem',
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
                Sign In
              </Typography.Title>
              <form onSubmit={formik.handleSubmit}>
                <Row gutter={16}>
                  <Col span={24}>
                    <InputField
                      placeholder='User name'
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
                    <AppButton
                      type='primary'
                      htmlType='submit'
                      block
                      size='large'
                      bgColor={theme.token.buttonBg}
                      onClick={formik.handleSubmit}
                    >
                      Sign In
                    </AppButton>
                  </Col>
                </Row>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    marginTop: '2rem',
                  }}
                >
                  <Typography.Text>
                    Don't have an account?{' '}
                    <a href='/register' style={{ color: 'white' }}>
                      Sign Up
                    </a>
                  </Typography.Text>
                </div>
              </form>
            </Card>
          </Col>
        </Row>
      </Suspense>
    </>
  );
};

export default Login;
