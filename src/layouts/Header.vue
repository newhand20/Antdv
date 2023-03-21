<template >
  <div >
    <a-dropdown class="header">
      <a class="ant-dropdown-link" @click.prevent>
        Hover me
        <DownOutlined />
      </a>
      <template #overlay >
        <a-menu @click="localeChange" :selectedKeys="[route.query.locale || 'zhCN']">
          <a-menu-item key="zhCN">
            中文
          </a-menu-item>
          <a-menu-item key="enUS">
            English
          </a-menu-item>
        </a-menu>
      </template>
    </a-dropdown>
  </div>
</template>
  
<script>
import { defineComponent, inject } from 'vue';
import { DownOutlined } from '@ant-design/icons-vue';
import { useRouter,useRoute } from 'vue-router';
import store from "../store/index"
export default defineComponent({
  setup(){
    const router = useRouter()
    const route = useRoute()
    const i18n = inject('$i18n')
    const localeChange = ({key}) =>{
      router.push({ query:{ ...route.query, locale:key}})
      store.commit({
        type:"locale/changeLanguage",
        language:key
      })
    }
    return{
      localeChange,
      route
    }
  },
  components: {
    DownOutlined,
  },
});
</script>

  