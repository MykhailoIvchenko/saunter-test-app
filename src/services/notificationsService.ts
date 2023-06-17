import {NotificationInstance} from "antd/es/notification/interface";

const openNotificationWithIcon = (
  type: NotificationType,
  api: NotificationInstance,
  message: string,
  description: string,
) => {
  api[type]({
    message,
    description,
  });
};

export const notificationService = { openNotificationWithIcon };
