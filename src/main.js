import "element-plus/dist/index.css";
import "./assets/main.css";
import { createApp } from "vue";
import { createPinia } from "pinia";
import ElementPlus from "element-plus";
import App from "./App.vue";
import router from "./router";
import DarkButton from "./components/DarkButton.vue";
import uz from "element-plus/es/locale/lang/uz-uz";
import dayjs from "dayjs";
const app = createApp(App);
app.component("dark-button", DarkButton);
app.use(createPinia());
app.use(router);
dayjs.Ls.uz ??= {};
dayjs.Ls.uz.weekStart = 1;
app.use(ElementPlus, {
   locale: uz,
});
app.mount("#app");
