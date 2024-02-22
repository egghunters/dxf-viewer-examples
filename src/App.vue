<template>
  <nav>
    <router-link to="/">Examples</router-link> | <router-link to="/about">About</router-link>
  </nav>
  <router-view/>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100%;
  height: 100%;

  nav {
    position: absolute;
    width: 100%;
    height: 30px;
    top: 0;
    left: 0;
    padding: 10px;
    background-color: #ffffffff;
    border-bottom: 1px solid lightgray;
    z-index: 2;
    a {
      font-weight: bold;
      color: #2c3e50;
      &.router-link-exact-active {
        color: #42b983;
      }
    }
  }
}

</style>
