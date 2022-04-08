<template id="template">
  <div id="app">
    <H1>Engraving calculator</H1>
    <br>
    <Engravings/>
  </div>
</template>

<script>

import Engravings from "@/components/Engravings";

export default {
  name: 'App',
  components: {
    Engravings
  },
  beforeCreate () {
    document.querySelector('body').setAttribute('style', 'background:#fff')
  }
}
</script>

<style>

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;

}

</style>
