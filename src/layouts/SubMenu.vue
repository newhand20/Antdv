<template>
  <a-sub-menu :key="menuInfo.path">
      <template #icon><MailOutlined /></template>
      <template #title>{{ menuInfo.meta.title }}</template>

      <template v-for="item in menuInfo.children" :key="item.path">
        <template v-if="!item.children">
          <a-menu-item 
            :key="item.path" 
            @click="routerChange(item.path)"
          >
            <template #icon>
              <PieChartOutlined />
            </template>
            {{ item.meta.title }}
          </a-menu-item>
        </template>
        <template v-else>
          <sub-menu :menu-info="item" :key="item.key" />
        </template>
      </template>
    </a-sub-menu>
</template>
<script>
export default {
  props: ["menuInfo"],
  setup(props, context){
    const routerChange = (data)=>{
      context.emit('routerChange',data)
    }

    return {
      routerChange
    }
  }
}
</script>