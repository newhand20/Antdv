<template>
  <div style="width: auto">
    <a-menu
      mode="inline"
      :theme="route.params.navTheme || 'dark'"
      v-model:openKeys="openKeys"
      v-model:selectedKeys="selectedKeys"
    >
      <template v-for="item in menuData">
        <template v-if="!item.children">
          <a-menu-item  
            :key="item.path" 
            @click="routerChange(item.path)"
          >
            <span>{{ item.meta.title }}</span>
          </a-menu-item>
        </template>

        <template v-else>
          <sub-menu @routerChange="routerChange" :menuInfo="item" :key="item.path"/>
        </template>
      </template>
    </a-menu>
  </div>
</template>
<script>
import { defineComponent, reactive, toRefs, watch,ref } from 'vue';
import { useRouter, useRoute } from 'vue-router'
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,
  MailOutlined,
  DesktopOutlined,
  InboxOutlined,
  AppstoreOutlined,
} from '@ant-design/icons-vue';
import SubMenu from "./SubMenu.vue"
import { check} from '../utils/auth'
export default defineComponent({
  setup() {
    const router = useRouter()
    const route = useRoute()
    const selectedKeysMap = {}
    const openKeysMap = {}

    const collapsed = ref(false)

    watch(
      route.path,
      (val, oldVal) => {
        selectedKeys = selectedKeysMap[val]
        openKeys = collapsed ? [] : openKeysMap[val]
      },
    );

    const toggleCollapsed = () => {
      state.collapsed = !state.collapsed;
      // state.openKeys = state.collapsed ? [] : state.preOpenKeys;
    };

    const getMenuData = (routes=[], parentKeys = [], selectedKey) =>{
      const menuData = []
      //存在权限控制的界面并且权限不够，直接不让它渲染出来
      routes.forEach(item => {
        if(item.meta && item.meta.authority && !check(item.meta.authority)){
          return
        }

        if(item.name && !item.hideInMenu){
          openKeysMap[item.path] = parentKeys;
          selectedKeysMap[item.path] = [selectedKey || item.path]

          const newItem = {...item}
          delete newItem.children

          if(item.children && !item.hideChildInMenu){
            newItem.children = getMenuData(item.children, [...parentKeys, item.path])
          } else {
            getMenuData(
              item.children,
              selectedKey ? parentKeys : [...parentKeys, item.path],
              selectedKey || item.path
            )
          }
          menuData.push(newItem)
        } else if (
          item.children && 
          !item.hideChildInMenu &&
          !item.hideInMenu
        ) {
          menuData.push(
            ...getMenuData(item.children, [...parentKeys, item.path])
          )
        }
      });
      return menuData;
    }

    const menuData = getMenuData(router.options.routes)
    const routerChange = (path)=>{
      router.push({path:path, params:route.params})
    }
    return { 
      routerChange,
      toggleCollapsed,
      getMenuData,
      selectedKeys:selectedKeysMap[route.path],
      openKeys:collapsed ? [] : openKeysMap[route.path],
      route, 
      router,
      menuData,
      list:[]
    };
  },

  components: {
    'sub-menu': SubMenu,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    PieChartOutlined,
    MailOutlined,
    DesktopOutlined,
    InboxOutlined,
    AppstoreOutlined,
  },
});
</script>