<script setup lang="ts">
import TodoList from './components/TodoList.vue';
</script>

<template>
  <div class="containerer">
    <h1>
      Todo list app
    </h1>
    <TodoList />
  </div>
</template>

<style>
.containerer {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
