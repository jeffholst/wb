<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <Timer v-bind:hours="0" v-bind:minutes="0" v-bind:seconds="10"/>
  <Timer v-bind:hours="0" v-bind:minutes="0" v-bind:seconds="0"/>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Timer from './components/Timer.vue'

export default defineComponent({
  name: 'App',
  components: {
    Timer
  }
})
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