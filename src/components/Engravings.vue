<template>
  <div>
    <table id="table">
      <thead>
        <tr>
          <th scope="col"></th>
          <th scope="col">Engraving 1</th>
          <th scope="col">Amount 1</th>
          <th scope="col">Engraving 2</th>
          <th scope="col">Amount 2</th>
          <th scope="col">Negative</th>
          <th scope="col">Negative amount</th>
        </tr>
      </thead>

    <tbody>
        <tr v-for="acc in accessories" :key="acc.name">
          <td><img :src="getSrc(acc.name)" class="images"></td>
          <td><b-form-select v-model="acc.eng1" :options="(engList(acc))" v-on:change="calculateEngravings()" class="inputEngraving"></b-form-select></td>
          <td><input v-model="acc.amount1" type="number" min="0" max="10" v-on:input="calculateEngravings()" class="inputAmount"></td>
          <td><b-form-select v-model="acc.eng2" :options="(engList(acc))" v-on:change="calculateEngravings()" class="inputEngraving"></b-form-select></td>
          <td><input v-model="acc.amount2" type="number" min="0" max="10" v-on:input="calculateEngravings()" class="inputAmount"></td>
          <td><b-form-select v-if="acc.name !== 'Seals'" v-model="acc.neg" min="0" max="10" :options="negativeEng" v-on:change="calculateEngravings()" class="inputEngraving"></b-form-select></td>
          <td><input v-if="acc.name !== 'Seals'" v-model="acc.amountNeg" type="number" v-on:input="calculateEngravings()" class="inputAmount"></td>
        </tr>
      </tbody>
    </table>
    <div id="active">
      <h4>Positive Engravings</h4>
      <div v-for="engraving in sortedArray" :key="engraving.key">
        <p v-if="engraving.amount > 14 && engraving.engraving!==''" style="background-color: lightgreen">{{engraving.engraving}}:{{checkLevel(engraving.amount)}}</p>
        <p v-else-if="emptyCheck(engraving)">{{engraving.engraving}}:{{checkLevel(engraving.amount)}}</p>
      </div>
      <h4>Negative Engravings</h4>
      <div v-for="engraving in sortedNegative" :key="engraving.key">
        <p v-if="engraving.amount > 4 && engraving.engraving!==''" style="background-color: red">{{engraving.engraving}}:{{checkLevel(engraving.amount)}}</p>
        <p v-else-if="emptyCheck(engraving)">{{engraving.engraving}}:{{checkLevel(engraving.amount)}}</p>
      </div>
    </div>
  </div>
</template>

<script>

import {combatEngravings} from './CombatEngravings.js'
import {classEngravings} from "@/components/ClassEngravings";
import {negativeEngravings} from "@/components/NegativeEngravings";
import {engravingSources} from "@/components/EngravingSources";

export default {

  name: "Engravings",

  data() {
    return {

      combatEng: combatEngravings,
      classEng: classEngravings,
      negativeEng: negativeEngravings,
      accessories: engravingSources,
      activeEngravings:{},
      activeNegativeEngravings: {},
      engravingArray: [],
      negativeArray: []
    }

  },
  methods:{
    calculateEngravings(){
      this.activeEngravings = {}
      this.activeNegativeEngravings= {}
      this.engravingArray = []
      this.negativeArray = []
      this.accessories.forEach(i => {
        this.activeEngravings[i.eng1] = this.activeEngravings[i.eng1] !== undefined ? parseInt(this.activeEngravings[i.eng1]) + parseInt(i.amount1) : i.amount1
        this.activeEngravings[i.eng2] = this.activeEngravings[i.eng2] !== undefined ? parseInt(this.activeEngravings[i.eng2]) + parseInt(i.amount2) : i.amount2
        this.activeNegativeEngravings[i.neg] = this.activeNegativeEngravings[i.neg] !== undefined ? parseInt(this.activeNegativeEngravings[i.neg]) + parseInt(i.amountNeg) : i.amountNeg
      })
      for(let eng in this.activeEngravings) {
        this.engravingArray.push({engraving: eng.valueOf(), amount: this.activeEngravings[eng]})
      }
      for(let eng in this.activeNegativeEngravings) {
        this.negativeArray.push({engraving: eng.valueOf(), amount: this.activeNegativeEngravings[eng]})
      }

    },
    emptyCheck(engraving){
      if(engraving.engraving === '' || engraving.amount < 1){
        return false;
      }
      return true;
    },

    engList(acc) {

      switch (acc.Type) {
        case "Accessory":
          return this.combatEng.concat(this.classEng)
        case "Stone":
          return this.combatEng
      }
    },
    checkLevel(value){
      let lvl = value/5 < 3 ? Math.floor(value/5) : 3
      return " lvl." + lvl + " (" + value +")";
    },
    getSrc(name){
      let image = require.context('../assets', false ,/\.png$/)
      return image('./' + name + ".png")
    },
    compare(a,b){

      if(a.amount > b.amount){
        return -1;
      }
      if(a.amount < b.amount){
        return 1;
      }
      return 0
    }

  },
  computed:{
    sortedArray(){
      return this.engravingArray.slice().sort(this.compare)
    },
    sortedNegative(){
      return this.negativeArray.slice().sort(this.compare)
    }
  }
}
</script>

<style scoped>
#table{
  display: inline-block;
}
#active{
  display: inline-block;
  padding-left: 10%;
  vertical-align: top;

}
tr:nth-child(even){
  background-color: #fff;
}
tr:nth-child(odd){
  background-color: #fff;
}
.inputAmount{
  width: 50px;
  height: 25px;
}
.inputEngraving{
  width: 200px;
  height: 25px;
}
.images{
  width: 50px;
  height: 50px;
}

</style>