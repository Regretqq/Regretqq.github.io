
<template>
  <div>
    <b-button variant="danger">asd</b-button>
    <b-dropdown v-model="SealName1" text="engraving" class="m-md-2">
      <b-dropdown-item>{{}}</b-dropdown-item>

    </b-dropdown>
    <input v-model="sealCount1" type="number">
  </div>
</template>

<script>
import { BButton } from 'bootstrap-vue'
import Vue from "vue";
Vue.component('b-button', BButton)
export default {

  name: "Engravings",


  data() {
    return {
      combatEng: ["Grudge", "Cursed Doll", "Hit master"],
      classEng: ["Peacekeeper", "Time to hunt"],
      sealCount1: 0,
      SealName1: ''
    }
  },
  computed:{

  }
}
</script>

<style scoped>

</style>