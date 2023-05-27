import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VueToastr2 from "vue-toastr-2";
import paper from "paper";
// import VTooltip from "v-tooltip";
import Loading from "vue-loading-overlay";



import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "vue-toastr-2/dist/vue-toastr-2.min.css";



paper.install(window);
window.toastr = require("toastr");

const app = createApp(App)

app.use(store).use(router).use(Loading)
app.mount("#app");

app.mixin({
    mounted() {
        if (this.$refs.toastr) {
            this.$toastr = this.$refs.toastr;
        }
    }
})

app.component('vue-toastr', VueToastr2);
