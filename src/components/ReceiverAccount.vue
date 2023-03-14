<template>
  <a-input-group compact>
    <a-select v-model:value="type" style="width: 100px;" @change="handleTypeChange">
      <a-select-option value="alipay">支付宝</a-select-option>
      <a-select-option value="bank">银行账户</a-select-option>
    </a-select>
    <a-input v-model:value="number" placeholder="输入收款额度" @change="handleNumberChange" style="width: 50%" />
  </a-input-group>
</template>

<script >
import { defineComponent, ref } from 'vue';
export default {
  props:{
    value:{
      type:Object
    }
  },
  setup(props, context) {
    const type= ref(props.value.type)
    const number= ref(props.value.number)

    const handleTypeChange=(val)=>{
      context.emit('change', {...props.value, type:val})
    }
    const handleNumberChange=(e)=>{
      context.emit('change', {...props.value, number:e.target.value})
    }
    return {
      type,
      number,
      handleTypeChange,
      handleNumberChange
    };
  },
};
</script>
