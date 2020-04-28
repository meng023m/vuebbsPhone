<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  methods: {
    bottm (event) {
      console.log(event)
    }
  }
}
</script>

<style lang="less">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0 15px;
}
body {
    max-width: 540PX;
    min-width: 320PX;
    min-height: 100vh;
    margin: 0 auto !important;
    color: #000;
}
</style>
