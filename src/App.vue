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
  }

}
</script>

<style>
html{
  background: #15202B;
}
h1{
  color: #ffffff;
}


#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -webkit-text-decoration-color: gold;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin-top: 30px;
  background: #15202B;
  color: white;

}

</style>
