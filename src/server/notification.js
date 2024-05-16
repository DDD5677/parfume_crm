import axios from "./axios";
const NotificationService = {
   getNotifications() {
      return axios.get(`/notifications/`);
   },
   getOneNotification(id) {
      return axios.get(`/notification-detail/${id}`);
   },
   deleteNotification(id) {
      return axios.delete(`/notification-detail/${id}`);
   },
};

export default NotificationService;
