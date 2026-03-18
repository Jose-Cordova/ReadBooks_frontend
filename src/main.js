import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
import PrimeVue from "primevue/config";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import Calendar from "primevue/calendar";
import Dropdown from "primevue/dropdown";

// 1. IMPORTAR ESTILOS DE Tailwind
import "./assets/main.css";

// 2. ESTILOS DE PRIMEVUE
import "primevue/resources/themes/saga-blue/theme.css";
import "primevue/resources/primevue.css";
import "primeicons/primeicons.css";

const app = createApp(App);
//Creamos instancia de pinia
const pinia = createPinia();
//Se una el plugin de persistencia para mantener la sesion
pinia.use(piniaPluginPersistedstate);
//Hacemos que el vue(app) use pinia
app.use(pinia);
app.use(router);
app.use(PrimeVue);
app.mount("#app");
app.component("Calendar", Calendar);
app.component("Dropdown", Dropdown);
