import { createApp } from "vue";
import App from "./App.vue";
import "ant-design-vue/dist/antd.less";
import router from "./router";
import store from "./store";
import {Button, Layout, Slider, Menu, Drawer, Radio, Input, Form, 
  InputNumber, Select,ConfigProvider, Dropdown, DatePicker
} from "ant-design-vue"
import Authorized from "./components/Authorized.vue"
import Auth from "./directives/auth"
import i18n from "./locale/index.js"

const app = createApp(App);

app.component('Authorized',Authorized)
app.component('Form',Form)

app.use(i18n)
app.use(Select)
app.use(Layout)
app.use(Dropdown)
app.use(DatePicker)
app.use(Input)
app.use(InputNumber)
app.use(ConfigProvider)
app.use(Button)
app.use(Form)
app.use(Menu)
app.use(Slider)
app.use(Drawer)
app.use(Radio)
app.use(store);
app.use(router);
app.use(Auth)
app.mount("#app");
