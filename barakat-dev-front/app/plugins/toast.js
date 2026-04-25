import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.use(Toast, {
        toastClassName: "custom-toast",
        position: "top-right",
        timeout: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        toastClassName: "glass-toast",
        bodyClassName: "glass-toast-body",
    });
});