<template>
  <div class="app__inner">
    <Header />
    <div class="app__container">
      <RouterView />
      <teleport to="body">
        <Loader :loading="$store.getters['movies/loading']" />
      </teleport>
    </div>
  </div>
</template>

<script>
import Header from '~/components/Header'
import Loader from '~/components/Loader'

export default {
  components: {
    Header,
    Loader
  }
}
</script>

<style lang="scss" scoped>

.app__inner {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  font-family: $font-family;
  font-size: 14px;
  line-height: 1.4;
  
  .app__container {
    flex-grow: 1;
    padding: 110px 60px 40px;
  }
}
</style>
