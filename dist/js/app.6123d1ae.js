(function(e){function n(n){for(var a,i,c=n[0],s=n[1],g=n[2],l=0,v=[];l<c.length;l++)i=c[l],Object.prototype.hasOwnProperty.call(r,i)&&r[i]&&v.push(r[i][0]),r[i]=0;for(a in s)Object.prototype.hasOwnProperty.call(s,a)&&(e[a]=s[a]);u&&u(n);while(v.length)v.shift()();return o.push.apply(o,g||[]),t()}function t(){for(var e,n=0;n<o.length;n++){for(var t=o[n],a=!0,c=1;c<t.length;c++){var s=t[c];0!==r[s]&&(a=!1)}a&&(o.splice(n--,1),e=i(i.s=t[0]))}return e}var a={},r={app:0},o=[];function i(n){if(a[n])return a[n].exports;var t=a[n]={i:n,l:!1,exports:{}};return e[n].call(t.exports,t,t.exports,i),t.l=!0,t.exports}i.m=e,i.c=a,i.d=function(e,n,t){i.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:t})},i.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,n){if(1&n&&(e=i(e)),8&n)return e;if(4&n&&"object"===typeof e&&e&&e.__esModule)return e;var t=Object.create(null);if(i.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var a in e)i.d(t,a,function(n){return e[n]}.bind(null,a));return t},i.n=function(e){var n=e&&e.__esModule?function(){return e["default"]}:function(){return e};return i.d(n,"a",n),n},i.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},i.p="/";var c=window["webpackJsonp"]=window["webpackJsonp"]||[],s=c.push.bind(c);c.push=n,c=c.slice();for(var g=0;g<c.length;g++)n(c[g]);var u=s;o.push([0,"chunk-vendors"]),t()})({0:function(e,n,t){e.exports=t("56d7")},"034f":function(e,n,t){"use strict";t("85ec")},"2c22":function(e,n,t){},"56d7":function(e,n,t){"use strict";t.r(n);t("e260"),t("e6cf"),t("cca6"),t("a79d");var a=t("2b0e"),r=function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("div",{attrs:{id:"app"}},[t("H1",[e._v("Engraving calculator")]),t("br"),t("Engravings")],1)},o=[],i=function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("div",[t("table",{attrs:{id:"table"}},[e._m(0),t("tbody",e._l(e.accessories,(function(n){return t("tr",{key:n.name},[t("td",[t("img",{staticClass:"images",attrs:{src:e.getSrc(n.name)}})]),t("td",[t("b-form-select",{staticClass:"inputEngraving",attrs:{options:e.engList(n)},on:{change:function(n){return e.calculateEngravings()}},model:{value:n.eng1,callback:function(t){e.$set(n,"eng1",t)},expression:"acc.eng1"}})],1),t("td",[t("input",{directives:[{name:"model",rawName:"v-model",value:n.amount1,expression:"acc.amount1"}],staticClass:"inputAmount",attrs:{type:"number",min:"0"},domProps:{value:n.amount1},on:{input:[function(t){t.target.composing||e.$set(n,"amount1",t.target.value)},function(n){return e.calculateEngravings()}]}})]),t("td",[t("b-form-select",{staticClass:"inputEngraving",attrs:{options:e.engList(n)},on:{change:function(n){return e.calculateEngravings()}},model:{value:n.eng2,callback:function(t){e.$set(n,"eng2",t)},expression:"acc.eng2"}})],1),t("td",[t("input",{directives:[{name:"model",rawName:"v-model",value:n.amount2,expression:"acc.amount2"}],staticClass:"inputAmount",attrs:{type:"number"},domProps:{value:n.amount2},on:{input:[function(t){t.target.composing||e.$set(n,"amount2",t.target.value)},function(n){return e.calculateEngravings()}]}})]),t("td",[e.checkSeal(n)?t("b-form-select",{staticClass:"inputEngraving",attrs:{options:e.negativeEng},on:{change:function(n){return e.calculateEngravings()}},model:{value:n.neg,callback:function(t){e.$set(n,"neg",t)},expression:"acc.neg"}}):e._e()],1),t("td",[e.checkSeal(n)?t("input",{directives:[{name:"model",rawName:"v-model",value:n.amountNeg,expression:"acc.amountNeg"}],staticClass:"inputAmount",attrs:{type:"number"},domProps:{value:n.amountNeg},on:{input:[function(t){t.target.composing||e.$set(n,"amountNeg",t.target.value)},function(n){return e.calculateEngravings()}]}}):e._e()])])})),0)]),t("div",{attrs:{id:"active"}},[t("h4",[e._v("Positive Engravings")]),e._l(e.sortedArray,(function(n){return t("div",{key:n.key},[n.amount>14&&""!=n.engraving?t("p",{staticStyle:{"background-color":"lightgreen"}},[e._v(e._s(n.engraving)+":"+e._s(e.checkLevel(n.amount)))]):e.emptyCheck(n)?t("p",[e._v(e._s(n.engraving)+":"+e._s(e.checkLevel(n.amount)))]):e._e()])})),t("h4",[e._v("Negative Engravings")]),e._l(e.sortedNegative,(function(n){return t("div",{key:n.key},[n.amount>4&&""!=n.engraving?t("p",{staticStyle:{"background-color":"red"}},[e._v(e._s(n.engraving)+":"+e._s(e.checkLevel(n.amount)))]):e.emptyCheck(n)?t("p",[e._v(e._s(n.engraving)+":"+e._s(e.checkLevel(n.amount)))]):e._e()])}))],2)])},c=[function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("thead",[t("tr",[t("th",{attrs:{scope:"col"}}),t("th",{attrs:{scope:"col"}},[e._v("Engraving 1")]),t("th",{attrs:{scope:"col"}},[e._v("Amount 1")]),t("th",{attrs:{scope:"col"}},[e._v("Engraving 2")]),t("th",{attrs:{scope:"col"}},[e._v("Amount 2")]),t("th",{attrs:{scope:"col"}},[e._v("Negative")]),t("th",{attrs:{scope:"col"}},[e._v("Negative amount")])])])}],s=(t("d3b7"),t("159b"),t("b0c0"),t("99af"),t("4e82"),t("fb6a"),[{text:"",value:""},{text:"Grudge",value:"Grudge"},{text:"Cursed Doll",value:"Cursed doll"},{text:"Hit master",value:"Hit master"}]),g=[{text:"Peacekeeper",value:"Peacekeeper"},{text:"Time to hunt",value:"Time to hunt"}],u=[{text:"Attack down",value:"Attack down"},{text:"Attack speed down",value:"Attack speed down"},{text:"Defense down",value:"Defense down"},{text:"Movement speed down",value:"Movement speed down"}],l=[{name:"Necklace",eng1:"",amount1:0,eng2:"",amount2:0,neg:"",amountNeg:0,Type:"Accessory"},{name:"Earring1",eng1:"",amount1:0,eng2:"",amount2:0,neg:"",amountNeg:0,Type:"Accessory"},{name:"Earring2",eng1:"",amount1:0,eng2:"",amount2:0,neg:"",amountNeg:0,Type:"Accessory"},{name:"Ring1",eng1:"",amount1:0,eng2:"",amount2:0,neg:"",amountNeg:0,Type:"Accessory"},{name:"Ring2",eng1:"",amount1:0,eng2:"",amount2:0,neg:"",amountNeg:0,Type:"Accessory"},{name:"Ability stone",eng1:"",amount1:0,eng2:"",amount2:0,neg:"",amountNeg:0,Type:"Stone"},{name:"Seals",eng1:"",amount1:0,eng2:"",amount2:0,neg:"",amountNeg:0,Type:"Accessory"}],v={name:"Engravings",data:function(){return{combatEng:s,classEng:g,negativeEng:u,accessories:l,activeEngravings:{},activeNegativeEngravings:{},engravingArray:[],negativeArray:[]}},methods:{calculateEngravings:function(){var e=this;for(var n in this.activeEngravings={},this.activeNegativeEngravings={},this.engravingArray=[],this.negativeArray=[],this.accessories.forEach((function(n){e.activeEngravings[n.eng1]=void 0==e.activeEngravings[n.eng1]?n.amount1:parseInt(e.activeEngravings[n.eng1])+parseInt(n.amount1),e.activeEngravings[n.eng2]=void 0==e.activeEngravings[n.eng2]?n.amount2:parseInt(e.activeEngravings[n.eng2])+parseInt(n.amount2),e.activeNegativeEngravings[n.neg]=void 0==e.activeNegativeEngravings[n.neg]?n.amountNeg:parseInt(e.activeNegativeEngravings[n.neg])+parseInt(n.amountNeg)})),this.activeEngravings)this.engravingArray.push({engraving:n.valueOf(),amount:this.activeEngravings[n]});for(var t in this.activeNegativeEngravings)this.negativeArray.push({engraving:t.valueOf(),amount:this.activeNegativeEngravings[t]})},emptyCheck:function(e){return!(""==e.engraving||e.amount<1)},checkSeal:function(e){return"Seals"!=e.name},engList:function(e){switch(e.Type){case"Accessory":return this.combatEng.concat(this.classEng);case"Stone":return this.combatEng}},checkLevel:function(e){var n=e/5<3?Math.floor(e/5):3;return" lvl."+n+" ("+e+")"},getSrc:function(e){var n=t("9142");return n("./"+e+".png")},compare:function(e,n){return e.amount>n.amount?-1:e.amount<n.amount?1:0}},computed:{sortedArray:function(){return this.engravingArray.slice().sort(this.compare)},sortedNegative:function(){return this.negativeArray.slice().sort(this.compare)}}},m=v,p=(t("a750"),t("2877")),f=Object(p["a"])(m,i,c,!1,null,"9a79c948",null),d=f.exports,A={name:"App",components:{Engravings:d},beforeCreate:function(){document.querySelector("body").setAttribute("style","background:#fff")}},y=A,b=(t("034f"),Object(p["a"])(y,r,o,!1,null,null,null)),h=b.exports,E=t("5f5b"),x=t("77f9");t("f9e3"),t("2dd8");a["default"].config.productionTip=!1,a["default"].use(x["a"]),a["default"].use(E["a"]),new a["default"]({render:function(e){return e(h)},data:{color:"#2c3e50"}}).$mount("#app")},"60d2":function(e,n,t){e.exports=t.p+"img/Earring1.a608dab3.png"},"7c57":function(e,n,t){e.exports=t.p+"img/Earring2.a608dab3.png"},"83e2":function(e,n,t){e.exports=t.p+"img/Ability stone.a3ebd429.png"},"85ec":function(e,n,t){},8730:function(e,n,t){e.exports=t.p+"img/Necklace.261ea8b7.png"},9142:function(e,n,t){var a={"./Ability stone.png":"83e2","./Earring1.png":"60d2","./Earring2.png":"7c57","./Necklace.png":"8730","./Ring1.png":"a0a0","./Ring2.png":"a3c6","./Seals.png":"f07d","./logo.png":"cf05"};function r(e){var n=o(e);return t(n)}function o(e){if(!t.o(a,e)){var n=new Error("Cannot find module '"+e+"'");throw n.code="MODULE_NOT_FOUND",n}return a[e]}r.keys=function(){return Object.keys(a)},r.resolve=o,e.exports=r,r.id="9142"},a0a0:function(e,n,t){e.exports=t.p+"img/Ring1.09d5ebfd.png"},a3c6:function(e,n,t){e.exports=t.p+"img/Ring2.09d5ebfd.png"},a750:function(e,n,t){"use strict";t("2c22")},cf05:function(e,n,t){e.exports=t.p+"img/logo.82b9c7a5.png"},f07d:function(e,n){e.exports="data:image/png;base64,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"}});
//# sourceMappingURL=app.6123d1ae.js.map