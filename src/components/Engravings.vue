<template>
  <div>
    <div class="filterDiv">
      <div class="filters">
        <p class="filters">Hide useless engravings</p>
        <b-checkbox v-model="engravingFilter" class="filters" v-on:change="filterCombatEngravings()"></b-checkbox>
      </div>
      <div class="filterDiv">
        <p class="filters">Filter class engravings</p>
        <b-form-select :options="classes" v-model="classFilter" v-on:change="filterClassEngravings()" class="inputs"></b-form-select>
      </div>
      <div class="filterDiv">
        <b-button v-on:click="resetAccessories()">Reset</b-button>
      </div>
    </div>
    <br><br>
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
          <td class="tdAmount"><img :src="getSrc(acc.name)" :alt="'Accessory: ' +acc.name" class="images"></td>
          <td><b-form-select v-model="acc.eng1" :options="(engList(acc))" v-on:change="calculateEngravings()" class="inputs inputEngraving"></b-form-select></td>
          <td class="tdAmount"><b-form-select v-model="acc.amount1" v-on:input="calculateEngravings()" :options="getValues(acc.Type)" class="inputs inputAmount"></b-form-select></td>
          <td><b-form-select v-model="acc.eng2" :options="(engList(acc))" v-on:change="calculateEngravings()" class="inputs inputEngraving"></b-form-select></td>
          <td class="tdAmount"><b-form-select v-model="acc.amount2" v-on:input="calculateEngravings()" :options="getValues(acc.Type)" class="inputs inputAmount"></b-form-select></td>
          <td><b-form-select v-if="acc.name !== 'Seals'" v-model="acc.neg"  :options="negativeEng" v-on:change="calculateEngravings()" class="inputs inputEngraving"></b-form-select></td>
          <td><b-form-select v-if="acc.name !== 'Seals'" v-model="acc.amountNeg" type="number" v-on:input="calculateEngravings()" :options="getValues(acc.Type)" class="inputs inputAmount"></b-form-select></td>
        </tr>
      </tbody>
    </table>
    <div class="active">
      <h4>Positive Engravings</h4>
      <div v-for="engraving in sortedArray" :key="engraving.key" class="engravingDiv">
        <p class="engraving">{{engraving.engraving}}:{{checkLevel(engraving.amount)}}</p>
        <div class="levelbg">
        <div :class="'level ' + level(i, engraving.amount)" v-for="i in 3" :key="i"></div>
        </div>
      </div>
    </div>
    <div class="active">
      <h4>Negative Engravings</h4>
      <div v-for="engraving in sortedNegative" :key="engraving.key" class="engravingDiv">
        <p class="engraving">{{engraving.engraving}}:{{checkLevel(engraving.amount)}}</p>
        <div class="levelbg">
          <div :class="'level ' + levelNegative(i, engraving.amount)" v-for="i in 3" :key="i"></div>
        </div>
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
import {values} from '@/components/EngravingSources';


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
      negativeArray: [],
      values: values
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
    //gets current engraving levels from inputs
    calculateEngravings(){
      this.emptyArrays()
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
    emptyArrays(){
      this.activeEngravings = {}
      this.activeNegativeEngravings= {}
      this.engravingArray = []
      this.negativeArray = []
    },
    saveAccessories(){
      localStorage.setItem(storageKey,JSON.stringify(this.accessories))
    },
    //Returns an array of possible engravings for the slot
    engList(acc) {
      switch (acc.Type) {
        case "Accessory":
          return this.combatEng.concat(this.classEng)
        case "Stone":
          return this.combatEng
        case "Seal":
          return this.combatEng.concat(this.classEng)
      }
    },
    //Calculates the level of an engraving based on its points
    checkLevel(value){
      let lvl = value/5 < 3 ? Math.floor(value/5) : 3
      return " lvl." + lvl + " (" + value +")";
    },
    getSrc(name){
      let image = require.context('../assets', false ,/\.png$/)
      return image('./' + name + ".png")
    },
    //Compare function for sorting arrays based on engraving values
    compare(a,b){
      if(parseInt(a.amount) > parseInt(b.amount)){
        return -1;
      }
      if(parseInt(a.amount) < parseInt(b.amount)){
        return 1;
      }
      return 0
    },
    //Filters combat engravings based on user input
    filterCombatEngravings(){
      if(this.engravingFilter){
        this.combatEng = this.usefulEngravings
        this.calculateEngravings()
        return
      }
      this.combatEng = combatEngravings
      this.calculateEngravings()
    },
    //filter class engravings based on user input
    filterClassEngravings(){
      this.classEng = classEngravings.filter(engraving =>{
        return engraving.class.includes(this.classFilter)})
      this.calculateEngravings()
    },
    //Resets all input fields
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
    //decides css class based on engraving level for positive engravings
    level(i, amount){
      if(i * 5 <= amount){
        return "abovelevel"
      }
      return "underlevel"
    },
    //decides css class based on engraving level for negative engravings
    levelNegative(i, amount){
      if(i * 5 <= amount){
        return "NAbovelevel"
      }
      return "underlevel"
    },
    //Returns possible input values for engraving points
    getValues(type){
      switch(type){
        case "Accessory":
          return this.values[0].Accessory
        case "Stone":
          return this.values[1].Stone
        case "Seal":
          return this.values[2].Seal
      }

    }

  },
  computed:{
    //Sorts the arrays based on engraving points
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


button{
  background-color: #303a45;
}


#table{
  display: inline-block;
  outline: #303a45 solid 1px;
  outline-offset: 5px;
  margin-right: 1%;

}
.active {
  display: inline-block;
  padding-left: 1%;
  padding-right: 1%;
  vertical-align: top;
}

.levelbg{
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
}

.level{
  width: 83px;
  height: 15px;
  margin: 0;
  padding: 0;
}

.level.abovelevel{
  background-color: #50C1EA;
}
.level.underlevel{
  background-color: darkgrey;
}
.level.NAbovelevel{
  background-color: darkred;
}


.engraving{
  align-content: center;
  margin: 0;
  padding: 0;
}

.engravingDiv{
  width: 275px;
  border-radius: 5px;
  margin-bottom: 0.5em;
  background-color: #303a45;
  padding: 0 5px 5px;
}

.filterDiv{
  display: inline-block;
  margin-left: 20px;
}

.filters{
  display: inline-block;
}

.inputs{
  color: white;
  background-color: #303a45;
  border: inset darkgray 1px;
}

.inputs.inputAmount{
  width: 50px;
  height: 25px;
}
.inputs.inputEngraving {
  width: 220px;
  height: 25px;
}
.tdAmount{
  padding-right: 0.5em;
}

.images{
  width:50px;
  height: 50px;
}

</style>