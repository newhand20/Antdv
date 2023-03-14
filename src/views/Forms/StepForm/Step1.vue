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
      <a-input v-model:value="formState.payAccount" autocomplete="off" />
    </a-form-item>
    <ReceiveAccount  label="收款账户" name="receiveAccount" :value="formState.receiveAccount">
      <a-input v-model:value="formState.receiveAccount" autocomplete="off" />
    </ReceiveAccount>
    <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
      <a-button type="primary"  @click="handleSubmit" html-type="submit">Submit</a-button>
      <a-button style="margin-left: 10px">Reset</a-button>
    </a-form-item>
  </a-form>
</template>
<script>
import { defineComponent, reactive, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router'
import store from '../../../store'
import ReceiveAccount from "../../../components/ReceiverAccount.vue"
export default defineComponent({
  components:{
    ReceiveAccount
  },
  setup() {
    const formRef = ref();
    const router = useRouter()
    const formState = reactive({
      payAccount: store.state.form.step.payAccount,
      receiveAccount: store.state.form.step.receiveAccount
    });
    
    let validatepayAccount = async (_rule, value) => {
      if (value === '') {
        console.log(store)
        return Promise.reject('请输入账户名');
      } else {
        return Promise.resolve();
      }
    };

    const rules = {
      payAccount: [{
        required: true,
        validator: validatepayAccount,
        trigger: 'change',
      }],
      receiveAccount: [{
        required: true,
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
      console.log("进来了")
      formRef.value.validateFields().then((value)=>{
        console.log("无错",value)
        store.commit({
          type:"form/saveStepFormData",
          payload: value,
        })
        router.push("/form/step-form/confirm")
      }).catch((e) => {
        console.log(e)
      });
    };
    return {
      formState,
      formRef,
      rules,
      layout,
      handleSubmit,
    };
  },
});
</script>