import { ref } from "vue";
import { defineStore } from "pinia";
import NotificationService from "@/server/notification";
export const useNotificationStore = defineStore("notification", () => {
   const notifications = ref(null);
   const isLoading = ref(false);
   const errors = ref(null);
   const deletedNotifyId = ref(null);

   function changeDeletedNotify(id) {
      deletedNotifyId.value = id;
   }

   function getNotifications() {
      return new Promise((resolve, reject) => {
         isLoading.value = true;
         errors.value = null;
         NotificationService.getNotifications()
            .then((response) => {
               notifications.value = response.data.notification;
               isLoading.value = false;
               resolve();
            })
            .catch((error) => {
               isLoading.value = false;
               errors.value = error;
               console.log(error);
            });
      });
   }
   function getOneNotification(payload) {
      return new Promise((resolve, reject) => {
         isLoading.value = true;
         errors.value = null;
         NotificationService.getOneNotification(payload)
            .then((response) => {
               isLoading.value = false;
               resolve();
            })
            .catch((error) => {
               isLoading.value = false;
               errors.value = error;
               console.log(error);
            });
      });
   }
   function deleteNotification(payload) {
      return new Promise((resolve, reject) => {
         isLoading.value = true;
         errors.value = null;
         NotificationService.deleteNotification(payload)
            .then((response) => {
               isLoading.value = false;
               resolve();
            })
            .catch((error) => {
               isLoading.value = false;
               errors.value = error;
               console.log(error);
            });
      });
   }

   return {
      isLoading,
      errors,
      notifications,
      deletedNotifyId,
      changeDeletedNotify,
      getNotifications,
      getOneNotification,
      deleteNotification,
   };
});
