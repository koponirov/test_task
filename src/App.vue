<template>
  <div id="app">
    <navbar/>
    <div class="container">
      <router-view/>
    </div>
  </div>
</template>

<script>
// eslint-disable-next-line import/extensions
import Navbar from './components/Navbar';

export default {
  components: {
    Navbar,
  },
};
</script>
<style lang="scss">
@import "~materialize-css/dist/css/materialize.min.css";

</style>
