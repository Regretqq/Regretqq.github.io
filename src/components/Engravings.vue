<template>
  <div>
    <div class="filterDiv">
      <div class="filters">
        <p class="filters">Hide useless engravings</p>
        <b-checkbox v-model="engravingFilter" class="filters" v-on:change="filterCombatEngravings()"></b-checkbox>
      </div>
      <div class="filterDiv">
        <p class="filters">Filter class engravings</p>
        <b-form-select :options="classes" v-model="classFilter" v-on:change="filterClassEngravings()"></b-form-select>
      </div>
      <div class="filterDiv">
        <b-button v-on:click="resetAccessories()">Reset</b-button>
      </div>
    </div>
    <br>
    <br>
    <table id="table">
      <thead>
        <tr>
          <th scope="col"></th>
          <th scope="col">Engraving 1</th>
          <th scope="col">+#</th>
          <th scope="col">Engraving 2</th>
          <th scope="col">+#</th>
          <th scope="col">Negative</th>
          <th scope="col">+#</th>
        </tr>
      </thead>

    <tbody>
        <tr v-for="acc in accessories" :key="acc.name">
          <td class="tdAmount"><img :src="getSrc(acc.name)" class="images"></td>
          <td><b-form-select v-model="acc.eng1" :options="(engList(acc))" v-on:change="calculateEngravings()" class="inputEngraving"></b-form-select></td>
          <td class="tdAmount"><input v-model="acc.amount1" type="number"  v-on:input="calculateEngravings()" class="inputAmount"></td>
          <td><b-form-select v-model="acc.eng2" :options="(engList(acc))" v-on:change="calculateEngravings()" class="inputEngraving"></b-form-select></td>
          <td class="tdAmount"><input v-model="acc.amount2" type="number"  v-on:input="calculateEngravings()" class="inputAmount"></td>
          <td><b-form-select v-if="acc.name !== 'Seals'" v-model="acc.neg"  :options="negativeEng" v-on:change="calculateEngravings()" class="inputEngraving"></b-form-select></td>
          <td><input v-if="acc.name !== 'Seals'" v-model="acc.amountNeg" type="number" v-on:input="calculateEngravings()" class="inputAmount"></td>
        </tr>
      </tbody>
    </table>
    <div class="active">
      <h4 style="width: 270px">Positive Engravings</h4>
      <div v-for="engraving in sortedArray" :key="engraving.key" class="engravingDiv">
        <p class="engraving">{{engraving.engraving}}:{{checkLevel(engraving.amount)}}</p>
        <div :class="level(i, engraving.amount)" v-for="i in 3" :key="i"></div>
        <br>
      </div>
    </div>
    <div class="active">
      <h4 style="width: 270px">Negative Engravings</h4>
      <div v-for="engraving in sortedNegative" :key="engraving.key" class="engravingDiv">
        <p class="negEngraving">{{engraving.engraving}}:{{checkLevel(engraving.amount)}}</p>
        <div :class="levelNegative(i, engraving.amount)" v-for="i in 3" :key="i"></div>
        <br>
      </div>
    </div>
  </div>
</template>

<script>

import {combatEngravings} from './CombatEngravings.js'
import {classEngravings} from "@/components/ClassEngravings";
import {negativeEngravings} from "@/components/NegativeEngravings";
import {engravingSources} from "@/components/EngravingSources";
import {usefulEngravings} from "@/components/UsefulEngravings";
import {classes} from "@/components/Classes";
const storageKey = "accessories"
export default {

  name: "Engravings",
  data() {
    return {
      engravingFilter: false,
      classFilter: '',
      classes: classes,
      combatEng: combatEngravings,
      combatEngravings: combatEngravings,
      usefulEngravings: usefulEngravings,
      classEng: classEngravings,
      negativeEng: negativeEngravings,
      accessories: engravingSources,
      activeEngravings:{},
      activeNegativeEngravings: {},
      engravingArray: [],
      negativeArray: []
    }

  },
  mounted() {

    let tempAcc = JSON.parse(localStorage.getItem(storageKey))
    if(tempAcc != null){
      this.accessories = tempAcc
    }
    this.calculateEngravings()
  },
  methods:{
    calculateEngravings(){
      this.activeEngravings = {}
      this.activeNegativeEngravings= {}
      this.engravingArray = []
      this.negativeArray = []
      this.accessories.forEach(i => {
        if(i.eng1 !== '' && i.amount1 > 0){
          this.activeEngravings[i.eng1] = this.activeEngravings[i.eng1] !== undefined ? parseInt(this.activeEngravings[i.eng1]) + parseInt(i.amount1) : i.amount1
        }
        if(i.eng2 !== '' && i.amount2 > 0) {
          this.activeEngravings[i.eng2] = this.activeEngravings[i.eng2] !== undefined ? parseInt(this.activeEngravings[i.eng2]) + parseInt(i.amount2) : i.amount2
        }
        if(i.neg !== '' && i.amountNeg > 0) {
          this.activeNegativeEngravings[i.neg] = this.activeNegativeEngravings[i.neg] !== undefined ? parseInt(this.activeNegativeEngravings[i.neg]) + parseInt(i.amountNeg) : i.amountNeg
        }
      })
      for(let eng in this.activeEngravings) {
        this.engravingArray.push({engraving: eng.valueOf(), amount: this.activeEngravings[eng]})
      }
      for(let eng in this.activeNegativeEngravings) {
        this.negativeArray.push({engraving: eng.valueOf(), amount: this.activeNegativeEngravings[eng]})
      }
      this.saveAccessories()

    },
    saveAccessories(){
      localStorage.setItem(storageKey,JSON.stringify(this.accessories))
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

      if(parseInt(a.amount) > parseInt(b.amount)){
        return -1;
      }
      if(parseInt(a.amount) < parseInt(b.amount)){
        return 1;
      }
      return 0
    },
    filterCombatEngravings(){
      if(this.engravingFilter){
        this.combatEng = this.usefulEngravings
        this.calculateEngravings()
        return
      }
      this.combatEng = combatEngravings
      this.calculateEngravings()
    },
    filterClassEngravings(){
      this.classEng = classEngravings.filter(engraving =>{
        return engraving.class.includes(this.classFilter)})
      this.calculateEngravings()
    },
    resetAccessories(){
      this.accessories.forEach(accessory =>{
        accessory.amount1 = 0
        accessory.amount2 = 0
        accessory.amountNeg = 0
        accessory.eng1 = ''
        accessory.eng2 = ''
        accessory.neg = ''
      })
      this.calculateEngravings()
    },
    level(i, amount){
      if(i * 5 <= amount){
        return "abovelevel"
      }
      return "underlevel"
    },

    levelNegative(i, amount){
      if(i * 5 <= amount){
        return "NAbovelevel"
      }
      return "NUnderlevel"
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

h1{
  color: #ffffff;
}
h4{
  color: #ffffff;
}
p{
  color: #ffffff;
}
#table{
  display: inline-block;
  color: #ffffff;
  outline: grey solid 1px;
  outline-offset: 5px;
  margin-right: 1%;

}
.active {
  display: inline-block;
  padding-left: 1%;
  padding-right: 1%;
  vertical-align: top;
}

.abovelevel{
  width: 88px;
  height: 15px;
  outline-style: solid;
  outline-color: #0B4257;
  background-color: #50C1EA;
  display: inline-block;
  margin: 0;
  padding: 0;
}
.underlevel{
  width: 88px;
  height: 15px;
  outline-style: solid;
  outline-color: #0B4257;
  display: inline-block;
  background-color: darkgrey;
  margin: 0;
  padding: 0;
}
.NAbovelevel{
  width: 88px;
  height: 15px;
  outline-style: solid;
  outline-color: #0B4257;
  background-color: darkred;
  display: inline-block;
  margin: 0;
  padding: 0;
}
.NUnderlevel{
  width: 88px;
  height: 15px;
  outline-style: solid;
  outline-color: #0B4257;
  display: inline-block;
  background-color: darkgray;
  margin: 0;
  padding: 0;
}


.engraving{
  align-content: center;
  width: 270px;
  margin: 0;
  padding: 0;
  background: #0B4257;
}
.negEngraving{
  align-content: center;
  width: 270px;
  margin: 0;
  padding: 0;
  background: #0B4257;
}

.engravingDiv{
  margin-bottom: 2px;
}

.filterDiv{
  display: inline-block;
  margin-left: 20px;
}

.filters{
  display: inline-block;
}

.inputAmount{
  width: 50px;
  height: 25px;


}
.inputEngraving {
  width: 220px;
  height: 25px;
}
.tdAmount{
  padding-right: 5px;
}

.images{
  width:50px;
  height: 50px;
}

</style>