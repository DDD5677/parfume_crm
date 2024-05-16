export const getItem = (key) => {
   try {
      const item = localStorage.getItem(key);
      if (item) {
         return JSON.parse(item);
      }
   } catch (error) {
      console.log("Error while getting data from localStorage");
      return null;
   }
};

export const setItem = (key, data) => {
   try {
      localStorage.setItem(key, JSON.stringify(data));
   } catch (error) {
      console.log("Error while saving data in localStorage");
   }
};

export const removeItem = (key) => {
   try {
      localStorage.removeItem(key);
   } catch (error) {
      console.log("Error while removing data from localStorage");
   }
};
