import { createApp } from "vue";
import App from "./App.vue";
import "ant-design-vue/dist/antd.less";
import router from "./router";
import store from "./store";
import {Button, Layout, Slider, Menu, Drawer, Radio} from "ant-design-vue"
import Authorized from "./components/Authorized.vue"
import Auth from "./directives/auth"

const app = createApp(App);

app.component('Authorized',Authorized)
app.use(Auth)
app.use(Layout)
app.use(Button)
app.use(Menu)
app.use(Slider)
app.use(Drawer)
app.use(Radio)
app.use(store);
app.use(router);
app.mount("#app");
