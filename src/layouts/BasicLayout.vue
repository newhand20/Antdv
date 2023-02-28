<template>
  <a-layout  
    :class="[`nav-theme-${navTheme}`]"
    style="min-height: 100vh"
  >
    <a-layout-sider 
      v-if="navLayout === 'left'"
      :theme="navTheme"
      :trigger="null" 
      v-model:collapsed="collapsed" 
      collapsible
    >
      <div class="logo" >Ant design Vue</div>
      <SiderMenu></SiderMenu>
    </a-layout-sider>

    <a-layout>
      <a-layout-header style="background: #fff; padding: 0; display: flex;" >
        <menu-unfold-outlined  class="trigger" v-if="collapsed" @click="collapsed = !collapsed"/>
        <menu-fold-outlined  class="trigger" v-else   @click="collapsed = !collapsed"/>
        <Header></Header>
      </a-layout-header>
      
      <a-layout-content style="margin: 0 16px">
        <a-breadcrumb style="margin: 16px 0">
          <a-breadcrumb-item>User</a-breadcrumb-item>
          <a-breadcrumb-item>Bill</a-breadcrumb-item>
        </a-breadcrumb>
        <div :style="{ padding: '24px', background: '#fff', minHeight: '360px' }">
          Bill is a cat.
        </div>
      </a-layout-content>
      
      <a-layout-footer style="text-align: center">
        <Footer></Footer>
      </a-layout-footer>

      <SettingDrawer/>
    </a-layout>
  </a-layout>
</template>

<script>
import { PieChartOutlined, DesktopOutlined, UserOutlined, TeamOutlined, FileOutlined,MenuFoldOutlined,MenuUnfoldOutlined } from '@ant-design/icons-vue';
import { defineComponent, ref, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router'
import SiderMenu from "./SiderMenu.vue"
import Header from "./Header.vue"
import Footer from "./Footer.vue"
import SettingDrawer from "../components/SettingDrawer.vue"

export default defineComponent({
  components: {
    PieChartOutlined,
    DesktopOutlined,
    UserOutlined,
    TeamOutlined,
    FileOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    SettingDrawer,
    SiderMenu,
    Footer,
    Header
  },
  setup(){
    const route = useRoute()
    const navTheme = computed(()=>{
      return route.params.navTheme || "dark"
    })
    const navLayout = computed(()=>{
      return route.params.navLayout || "left"
    })
    return {
      navTheme,
      navLayout,
      collapsed: ref(false),
      selectedKeys: ref(['1']),
    }
  },
    
});
</script>
<style>
#components-layout-demo-side .logo {
  height: 32px;
  margin: 16px;
  background: rgba(255, 255, 255, 0.3);
}

.site-layout .site-layout-background {
  background: #fff;
}
[data-theme='dark'] .site-layout .site-layout-background {
  background: #141414;
}
.trigger {
  font-size: large;
  padding: 0px 20px;
  line-height: 64px;
}
.trigger:hover{
  background: #eeeeee;
}
.logo{
  height: 64px;
  line-height: 64px;
  overflow: hidden;
}
.nav-theme-dark .logo{
  color: hsl(0, 0%, 100%);
}
</style>