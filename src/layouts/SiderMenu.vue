<template>
  <div style="width: auto">
    <a-menu
      mode="inline"
      :theme="route.query.navTheme || 'dark'"
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
      routes.forEach(item => {
        //存在权限控制的界面并且权限不够，直接不让它渲染出来
        if(item.meta && item.meta.authority && !check(item.meta.authority)){
          return
        }

        if(item.name && !item.hideInMenu){
          //可以展开和选中菜单的集合，存进Map
          openKeysMap[item.path] = parentKeys;
          selectedKeysMap[item.path] = [selectedKey || item.path]

          //导航菜单选项，从路由中挑出来加进去
          const newItem = {...item}
          delete newItem.children

          //下面一堆逻辑是因为路由写的花里胡哨，为了把能加上的路由加上去，隐藏一些不能加的路由
          //（包括选能展开的选项和能选中的选项）硬写的逻辑，读不懂就算了，这部分确实迷惑
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
      router.push({path:path, query:route.query})
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