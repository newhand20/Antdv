<template>
  <a-drawer
    v-model:visible="visible"
    class="custom-class"
    style="color: red"
    title="Basic Drawer"
    placement="right"
    @after-visible-change="afterVisibleChange"
  >
  <div>
    <h2>整体风格定制</h2>
    <a-radio-group 
      :value="route.query.navTheme || 'dark'"
      @change="e=>HandleSettingChange('navTheme', e.target.value)"
    >
      <a-radio value='dark'>黑色</a-radio>
      <a-radio value="light">白色</a-radio>
    </a-radio-group>

    <h2>导航模式</h2>
    <a-radio-group 
      :value="route.query.navLayout || 'left'"
      @change="e=>HandleSettingChange('navLayout', e.target.value)"
    >
      <a-radio value='left'>左边</a-radio>
      <a-radio value="top">顶部</a-radio>
    </a-radio-group>
  </div>
  </a-drawer>
  <setting-outlined @click="visible=!visible" class="setting"/>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { SettingOutlined} from '@ant-design/icons-vue';
import { useRouter, useRoute } from 'vue-router'
export default defineComponent({
  components:{
    SettingOutlined
  },
  setup() {
    const visible = ref(false);
    const route = useRoute()
    const router = useRouter()

    const afterVisibleChange = bool => {
      console.log('visible', bool);
    };
    const HandleSettingChange=(type, value)=> {
      router.push({query:{...route.query, [type]:value}})
    }
    return {
      route,
      router,
      visible,
      afterVisibleChange,
      HandleSettingChange
    };
  },
});
</script>
<style>
.setting{
  position: absolute;
  top: 250px;
  border-radius: 5px;
  right: -10px;
  width: 50px;
  height: 50px;
  font-size: 25px;
  background-color: rgb(11, 211, 229);
  line-height: 57px;
  color: rgb(255, 255, 255);
}
</style>