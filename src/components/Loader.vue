<template>
  <section
    v-show="loading"
    v-cloak
    class="loader">
    <img
      src="../../static/loader.gif"
      alt="로딩중" />  
  </section>
</template>

<script>
export default {
  props: {
    loading: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
.loader {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 2;
  display: flex;
  justify-content: center;
  align-items: center;
}

[v-cloak] {
  display: none;
}
</style>
