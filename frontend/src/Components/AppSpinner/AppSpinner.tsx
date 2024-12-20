import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

interface AppSpinnerProps {
  color?: string;
  size?: number;
}

const AppSpinner = ({ size = 24, color = '#eb2566' }: AppSpinnerProps) => {
  return (
    <Spin
      indicator={
        <LoadingOutlined style={{ fontSize: size, color: color }} spin />
      }
    />
  );
};

export default AppSpinner;
