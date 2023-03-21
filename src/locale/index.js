import {createI18n} from 'vue-i18n'
import enUS from "./enUS"
import zhCN from "./zhCN.js"
import store from '../store/index'

const i18n = createI18n({
  locale:store.state.locale.language,
  messages: {
    zhCN,
    enUS
  }
})

export default {i18n:i18n}
