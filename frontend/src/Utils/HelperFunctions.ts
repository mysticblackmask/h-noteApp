import { message } from 'antd';
import { NoticeType } from 'antd/es/message/interface';

interface ToastMessageParams {
  type?: NoticeType;
  content: string;
  duration?: number;
}

export const toastMessage = ({
  type,
  content,
  duration,
}: ToastMessageParams): void => {
  message.open({
    type,
    content,
    duration,
  });
};

export const formattedDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
};
