<script>
import { h } from "vue";
import {check} from '../utils/auth.js'
export default {
  functional:true,
  props: {
    authority: {
      type: Array,
      required: true
    }
  },
  render(){
    return h(
      'div', 
      check(this.authority) ? this.$slots.default(): null
    ) 
  }
};
</script>