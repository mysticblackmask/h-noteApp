import React from 'react';
import { Button as AntButton, Spin } from 'antd';
import { ButtonProps as AntButtonProps } from 'antd/lib/button';
import theme from '../../Theme/theme';

interface ButtonProps extends AntButtonProps {
  textStyle?: React.CSSProperties;
  text?: string;
  preset?: 'primary' | 'secondary';
  disabled?: boolean;
  error?: boolean;
  onClick?: () => void;
  loading?: boolean;
  size?: 'small' | 'middle' | 'large';
  bgColor?: string;
  borderColor?: string;
}

const AppButton: React.FC<ButtonProps> = ({
  textStyle: textStyleOverride,
  preset = 'secondary',
  text,
  children,
  disabled,
  error,
  onClick,
  loading,
  size = 'middle',
  bgColor = theme.token.colorPrimary,
  borderColor = 'none',
  ...rest
}) => {
  const buttonStyle: React.CSSProperties = {
    backgroundColor: bgColor,
    color: '#fff',
    boxShadow: 'none',
    ...textStyleOverride,
  };

  return (
    <AntButton
      type='primary'
      size={size}
      disabled={disabled}
      loading={loading}
      style={buttonStyle}
      onClick={onClick}
      {...rest}
    >
      {loading ? <Spin size='small' /> : children || text || 'Button Text'}
    </AntButton>
  );
};

export default AppButton;
