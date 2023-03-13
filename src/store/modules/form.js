import router from "../../router/index"
import request from "../../utils/request"

const state = {
  step: {
    payAccount:"123456"
  }
}

const actions = {
  async submitStepForm({ commit }, payload ){
    await request({
      url:"api/form",
      method:"POST",
      data:payload.payload
    })
    commit("saveStepFormData", payload)
    router.push("/form/step-form/result")
  }
}

const mutations = {
  saveStepFormData(state, { payload }){
    state.step = {
      ...state.step,
      ...payload
    }
    console.log("传过来的东西",this.state)
  }
}

export default{
  namespaced: true,
  state,
  actions,
  mutations
}