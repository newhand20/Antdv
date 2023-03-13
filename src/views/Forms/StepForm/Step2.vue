<template>
  <a-form
    ref="formRef"
    name="custom-validation"
    :model="formState"
    :rules="rules"
    v-bind="layout"
    @finish="handleFinish"
    @validate="handleValidate"
    @finishFailed="handleFinishFailed"
  >
    <a-form-item has-feedback label="付款账户" name="payAccount">
      {{ formState.payAccount }}
    </a-form-item>
    <a-form-item has-feedback label="账户密码" help="密码长度不小于6" name="pass">
      <a-input v-model:value="formState.pass" type="password" autocomplete="off" />
    </a-form-item>
    <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
      <a-button type="primary"  @click="handleSubmit" html-type="submit">提交</a-button>
      <a-button style="margin-left: 10px" @click="onPrev">上一步</a-button>
    </a-form-item>
  </a-form>
</template>
<script>
import { defineComponent, reactive, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router'
import store from '../../../store'
export default defineComponent({
  setup() {
    const formRef = ref();
    const router = useRouter()
    const formState = reactive({
      payAccount: store.state.form.step.payAccount,
      pass:''
    });
    const rules = {
      payAccount: [{
        required: true,
        trigger: 'change',
      }],
      pass: [{
        required: true,
        min:6,
        trigger: 'change',
      }],
    };
    const layout = {
      labelCol: {
        span: 4,
      },
      wrapperCol: {
        span: 14,
      },
    };
    const handleSubmit = () => {
      formRef.value.validateFields().then((value)=>{
        store.dispatch({
          type:"form/submitStepForm",
          payload: value,
        })
        router.push("/form/step-form/result")
      }).catch((e) => {
        console.log(e)
      });
    };
    const onPrev = ()=>{
      router.push("/form/step-form/info")
    }
    return {
      formState,
      formRef,
      rules,
      layout,
      handleSubmit,
      onPrev
    };
  },
});
</script>